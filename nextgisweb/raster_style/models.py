from io import BytesIO

import numpy
import PIL
from osgeo import gdal, gdalconst, gdal_array
from pkg_resources import resource_filename
from zope.interface import implementer

from ..models import declarative_base
from ..resource import Resource, DataScope
from ..render import (
    IRenderableStyle,
    ILegendableStyle,
    IExtentRenderRequest,
    ITileRenderRequest)

from .util import _

Base = declarative_base(dependencies=('resource', ))


@implementer(IExtentRenderRequest, ITileRenderRequest)
class RenderRequest(object):

    def __init__(self, style, srs, cond):
        self.style = style
        self.srs = srs
        self.cond = cond

    def render_extent(self, extent, size):
        return self.style.render_image(extent, size)

    def render_tile(self, tile, size):
        extent = self.srs.tile_extent(tile)
        return self.style.render_image(extent, (size, size))


@implementer(IRenderableStyle, ILegendableStyle)
class RasterStyle(Base, Resource):
    identity = 'raster_style'
    cls_display_name = _("Raster style")

    __scope__ = DataScope

    # Only RGB, RGBA rasters are supported.
    @classmethod
    def check_parent(cls, parent):
        return (
            parent.cls == "raster_layer"
            and parent.band_count in (3, 4)
            and parent.dtype in (gdal.GetDataTypeName(gdalconst.GDT_Byte),)
        ) or parent.cls == "raster_mosaic"

    @property
    def srs(self):
        return self.parent.srs

    def render_request(self, srs, cond=None):
        return RenderRequest(self, srs, cond)

    def render_image(self, extent, size):
        result = PIL.Image.new("RGBA", size, (0, 0, 0, 0))

        if self.parent.cls == "raster_layer":
            parent_ds = self.parent.gdal_dataset()
        elif self.parent.cls == "raster_mosaic":
            parent_ds = self.parent.gdal_dataset(extent=extent, size=size)

        if parent_ds is None:
            return result

        ds = gdal.Warp(
            "", parent_ds,
            options=gdal.WarpOptions(
                width=size[0], height=size[1], outputBounds=extent, format="MEM",
                warpOptions=['UNIFIED_SRC_NODATA=ON'], dstAlpha=True,
            ),
        )

        band_count = ds.RasterCount
        array = numpy.zeros((size[1], size[0], band_count), numpy.uint8)

        for i in range(band_count):
            array[:, :, i] = gdal_array.BandReadAsArray(ds.GetRasterBand(i + 1),)

        ds = None
        parent_ds = None
        wnd = PIL.Image.fromarray(array)
        result.paste(wnd)

        return result

    def render_legend(self):
        # Don't use real preview of raster layer as icon
        # because it may be slow
        raster_icon = resource_filename('nextgisweb',
                                        'raster_style/iconRaster.png')
        img = PIL.Image.open(raster_icon)
        buf = BytesIO()
        img.save(buf, 'png')
        buf.seek(0)

        return buf
