# -*- coding: utf-8 -*-
from __future__ import division, absolute_import, print_function, unicode_literals
import subprocess
import os
import six
import zipfile

import sqlalchemy as sa
import sqlalchemy.orm as orm

from zope.interface import implementer

from collections import OrderedDict
from osgeo import gdal, gdalconst, osr, ogr

from ..lib.osrhelper import traditional_axis_mapping
from ..models import declarative_base
from ..resource import (
    Resource,
    DataStructureScope, DataScope,
    Serializer,
    SerializedProperty as SP,
    SerializedRelationship as SR,
    ResourceGroup)
from ..resource.exception import ValidationError
from ..env import env
from ..layer import SpatialLayerMixin, IBboxLayer
from ..file_storage import FileObj

from .kind_of_data import RasterLayerData
from .util import _, calc_overviews_levels, COMP_ID

PYRAMID_TARGET_SIZE = 512

Base = declarative_base(dependencies=('resource', ))

SUPPORTED_DRIVERS = ('GTiff', )

COLOR_INTERPRETATION = OrderedDict((
    (gdal.GCI_Undefined, 'Undefined'),
    (gdal.GCI_GrayIndex, 'GrayIndex'),
    (gdal.GCI_PaletteIndex, 'PaletteIndex'),
    (gdal.GCI_RedBand, 'Red'),
    (gdal.GCI_GreenBand, 'Green'),
    (gdal.GCI_BlueBand, 'Blue'),
    (gdal.GCI_AlphaBand, 'Alpha'),
    (gdal.GCI_HueBand, 'Hue'),
    (gdal.GCI_SaturationBand, 'Saturation'),
    (gdal.GCI_LightnessBand, 'Lightness'),
    (gdal.GCI_CyanBand, 'Cyan'),
    (gdal.GCI_MagentaBand, 'Magenta'),
    (gdal.GCI_YellowBand, 'Yellow'),
    (gdal.GCI_BlackBand, 'Black'),
    (gdal.GCI_YCbCr_YBand, 'YCbCr_Y'),
    (gdal.GCI_YCbCr_CbBand, 'YCbCr_Cb'),
    (gdal.GCI_YCbCr_CrBand, 'YCbCr_Cr')))


class DRIVERS:
    GEOTIFF = 'GTiff'
    JPEG = 'JPEG'
    PNG = 'PNG'

    enum = (GEOTIFF, JPEG, PNG)


VE = ValidationError


@implementer(IBboxLayer)
class RasterLayer(Base, Resource, SpatialLayerMixin):
    identity = 'raster_layer'
    cls_display_name = _("Raster layer")

    __scope__ = (DataStructureScope, DataScope)

    fileobj_id = sa.Column(sa.ForeignKey(FileObj.id), nullable=True)

    xsize = sa.Column(sa.Integer, nullable=False)
    ysize = sa.Column(sa.Integer, nullable=False)
    dtype = sa.Column(sa.Unicode, nullable=False)
    band_count = sa.Column(sa.Integer, nullable=False)

    fileobj = orm.relationship(FileObj, cascade='all')

    @classmethod
    def check_parent(cls, parent):
        return isinstance(parent, ResourceGroup)

    def _gdalds(self, gdalfn):
        iszip = zipfile.is_zipfile(gdalfn)
        imfilename = gdalfn
        gdalds = None
        if not iszip:
            gdalds = gdal.OpenEx(gdalfn, gdalconst.GA_ReadOnly, allowed_drivers=DRIVERS.enum)
        else:
            #TODO: Просто так передать имя архива нельзя (в отличие от векторных форматов. Так что будем искать)

            with zipfile.ZipFile(gdalfn) as fzip:
                for zipfn in fzip.namelist():
                    imfilename = ('/vsizip/{%s}/%s' % (gdalfn, zipfn))
                    gdalds = gdal.OpenEx(imfilename, gdalconst.GA_ReadOnly, allowed_drivers=DRIVERS.enum)
                    if gdalds is not None:
                        break

        if gdalds is None:
            gdalds = ogr.Open(gdalfn, gdalconst.GA_ReadOnly)
            if gdalds is None:
                raise VE(_("GDAL library failed to open file."))
            else:
                drivername = gdalds.GetDriver().GetName()
                raise VE(_("Unsupport GDAL driver: %s.") % drivername)
        return gdalds, imfilename

    def load_file(self, filename, env):
        ds, imfilename = self._gdalds(filename)

        dsdriver = ds.GetDriver()
        dsproj = ds.GetProjection()
        dsgtran = ds.GetGeoTransform()

        if dsdriver.ShortName not in DRIVERS.enum:
            raise ValidationError(
                _("Raster has format '%(format)s', however only following formats are supported: %(all_formats)s.")  # NOQA: E501
                % dict(format=dsdriver.ShortName, all_formats=", ".join(SUPPORTED_DRIVERS))
            )

        if not dsproj or not dsgtran:
            raise ValidationError(_("Raster files without projection info are not supported."))

        data_type = None
        alpha_band = None
        has_nodata = None
        for bidx in range(1, ds.RasterCount + 1):
            band = ds.GetRasterBand(bidx)

            if data_type is None:
                data_type = band.DataType
            elif data_type != band.DataType:
                raise ValidationError(_("Complex data types are not supported."))

            if band.GetRasterColorInterpretation() == gdal.GCI_AlphaBand:
                assert alpha_band is None, "Multiple alpha bands found!"
                alpha_band = bidx
            else:
                has_nodata = (has_nodata is None or has_nodata) and (
                    band.GetNoDataValue() is not None)

        src_osr = osr.SpatialReference()
        src_osr.ImportFromWkt(dsproj)
        dst_osr = osr.SpatialReference()
        dst_osr.ImportFromEPSG(int(self.srs.id))

        reproject = not src_osr.IsSame(dst_osr)

        fobj = FileObj(component='raster_layer')

        dst_file = env.raster_layer.workdir_filename(fobj, makedirs=True)
        self.fileobj = fobj

        if reproject:
            cmd = ['gdalwarp', '-of', 'GTiff', '-t_srs', 'EPSG:%d' % self.srs.id]
            if not has_nodata and alpha_band is None:
                cmd.append('-dstalpha')
        else:
            cmd = ['gdal_translate', '-of', 'GTiff']

        cmd.extend(('-co', 'COMPRESS=DEFLATE',
                    '-co', 'TILED=YES',
                    '-co', 'BIGTIFF=YES', imfilename, dst_file))
        subprocess.check_call(cmd)

        ds = gdal.Open(dst_file, gdalconst.GA_ReadOnly)

        self.dtype = six.text_type(gdal.GetDataTypeName(data_type))
        self.xsize = ds.RasterXSize
        self.ysize = ds.RasterYSize
        self.band_count = ds.RasterCount

        self.build_overview()

    def gdal_dataset(self):
        fn = env.raster_layer.workdir_filename(self.fileobj)
        return gdal.Open(fn, gdalconst.GA_ReadOnly)

    def build_overview(self, missing_only=False):
        fn = env.raster_layer.workdir_filename(self.fileobj)
        if missing_only and os.path.isfile(fn + '.ovr'):
            return

        ds = gdal.Open(fn, gdalconst.GA_ReadOnly)
        levels = list(map(str, calc_overviews_levels(ds)))
        ds = None

        cmd = ['gdaladdo', '-q', '-clean', fn]

        env.raster_layer.logger.debug('Removing existing overviews with command: ' + ' '.join(cmd))
        subprocess.check_call(cmd)

        cmd = [
            'gdaladdo', '-q', '-ro', '-r', 'gauss',
            '--config', 'COMPRESS_OVERVIEW', 'DEFLATE',
            '--config', 'INTERLEAVE_OVERVIEW', 'PIXEL',
            '--config', 'BIGTIFF_OVERVIEW', 'YES',
            fn
        ] + levels

        env.raster_layer.logger.debug('Building raster overview with command: ' + ' '.join(cmd))
        subprocess.check_call(cmd)

    def get_info(self):
        s = super(RasterLayer, self)
        return (s.get_info() if hasattr(s, 'get_info') else ()) + (
            (_("Data type"), self.dtype),
        )

    # IBboxLayer implementation:
    @property
    def extent(self):
        """Возвращает охват слоя
        """

        src_osr = osr.SpatialReference()
        dst_osr = osr.SpatialReference()

        src_osr.ImportFromEPSG(int(self.srs.id))
        dst_osr.ImportFromEPSG(4326)

        traditional_axis_mapping(src_osr)
        traditional_axis_mapping(dst_osr)

        coordTrans = osr.CoordinateTransformation(src_osr, dst_osr)

        ds = self.gdal_dataset()
        geoTransform = ds.GetGeoTransform()

        # ul | ur: upper left | upper right
        # ll | lr: lower left | lower right
        x_ul = geoTransform[0]
        y_ul = geoTransform[3]

        x_lr = x_ul + ds.RasterXSize * geoTransform[1] + ds.RasterYSize * geoTransform[2]
        y_lr = y_ul + ds.RasterXSize * geoTransform[4] + ds.RasterYSize * geoTransform[5]

        ll = ogr.Geometry(ogr.wkbPoint)
        ll.AddPoint(x_ul, y_lr)
        ll.Transform(coordTrans)

        ur = ogr.Geometry(ogr.wkbPoint)
        ur.AddPoint(x_lr, y_ul)
        ur.Transform(coordTrans)

        extent = dict(
            minLon=ll.GetX(),
            maxLon=ur.GetX(),
            minLat=ll.GetY(),
            maxLat=ur.GetY()
        )

        return extent


def estimate_raster_layer_data(resource):

    def file_size(fn):
        stat = os.stat(fn)
        return stat.st_size

    fn = env.raster_layer.workdir_filename(resource.fileobj)

    # Size of source file with overviews
    size = file_size(fn) + file_size(fn + '.ovr')
    return size


class _source_attr(SP):

    def setter(self, srlzr, value):

        filedata, filemeta = env.file_upload.get_filename(value['id'])
        srlzr.obj.load_file(filedata, env)

        size = estimate_raster_layer_data(srlzr.obj)
        env.core.reserve_storage(COMP_ID, RasterLayerData, value_data_volume=size,
                                 resource=srlzr.obj)


class _color_interpretation(SP):

    def getter(self, srlzr):
        ds = gdal.OpenEx(env.raster_layer.workdir_filename(srlzr.obj.fileobj))
        return [
            COLOR_INTERPRETATION[ds.GetRasterBand(bidx).GetRasterColorInterpretation()]
            for bidx in range(1, srlzr.obj.band_count + 1)
        ]


P_DSS_READ = DataStructureScope.read
P_DSS_WRITE = DataStructureScope.write
P_DS_READ = DataScope.read
P_DS_WRITE = DataScope.write


class RasterLayerSerializer(Serializer):
    identity = RasterLayer.identity
    resclass = RasterLayer

    srs = SR(read=P_DSS_READ, write=P_DSS_WRITE)

    xsize = SP(read=P_DSS_READ)
    ysize = SP(read=P_DSS_READ)
    band_count = SP(read=P_DSS_READ)

    source = _source_attr(write=P_DS_WRITE)
    color_interpretation = _color_interpretation(read=P_DSS_READ)
