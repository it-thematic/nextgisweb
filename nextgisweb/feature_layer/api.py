import json
import os
import re
import uuid
import zipfile
import itertools
from urllib.parse import unquote

import tempfile
from collections import OrderedDict
from datetime import datetime, date, time

from osgeo import ogr, gdal
from pyramid.response import Response, FileResponse
from pyramid.httpexceptions import HTTPNoContent, HTTPNotFound
from shapely.geometry import box
from sqlalchemy.orm.exc import NoResultFound

from ..core.exception import ValidationError
from ..lib.geometry import Geometry, GeometryNotValid, Transformer
from ..resource import DataScope, Resource, resource_factory
from ..resource.exception import ResourceNotFound
from ..spatial_ref_sys import SRS
from ..render.util import zxy_from_request

from .interface import (
    IFeatureLayer,
    IFeatureQueryLike,
    IWritableFeatureLayer,
    IFeatureQueryClipByBox,
    IFeatureQuerySimplify,
    FIELD_TYPE)
from .feature import Feature
from .extension import FeatureExtension
from .ogrdriver import EXPORT_FORMAT_OGR, MVT_DRIVER_EXIST
from .exception import FeatureNotFound
from .util import _


PERM_READ = DataScope.read
PERM_WRITE = DataScope.write
PERM_DELETE = DataScope.delete


def _ogr_memory_ds():
    return gdal.GetDriverByName('Memory').Create(
        '', 0, 0, 0, gdal.GDT_Unknown)


def _ogr_ds(driver, options):
    return ogr.GetDriverByName(driver).CreateDataSource(
        "/vsimem/%s" % uuid.uuid4(), options=options
    )


def _ogr_layer_from_features(layer, features, name='', ds=None, fid=None):
    ogr_layer = layer.to_ogr(ds, name=name, fid=fid)
    layer_defn = ogr_layer.GetLayerDefn()

    for f in features:
        ogr_layer.CreateFeature(
            f.to_ogr(layer_defn, fid=fid))

    return ogr_layer


def _extensions(extensions, layer):
    result = []

    ext_filter = None if extensions is None else extensions.split(',')

    for cls in FeatureExtension.registry:
        if ext_filter is None or cls.identity in ext_filter:
            result.append((cls.identity, cls(layer)))

    return result


def view_geojson(request):
    request.GET["format"] = "GeoJSON"
    request.GET["zipped"] = "false"

    return export(request)


def export(request):
    request.resource_permission(PERM_READ)

    srs = int(
        request.GET.get("srs", request.context.srs.id)
    )
    srs = SRS.filter_by(id=srs).one()

    fid = request.GET.get("fid")
    fid = fid if fid != "" else None

    format = request.GET.get("format")
    encoding = request.GET.get("encoding")
    zipped = request.GET.get("zipped", "true")
    zipped = zipped.lower() == "true"

    display_name = request.GET.get("display_name", "false")
    display_name = display_name.lower() == "true"

    if format is None:
        raise ValidationError(
            _("Output format is not provided.")
        )

    if format not in EXPORT_FORMAT_OGR:
        raise ValidationError(
            _("Format '%s' is not supported.") % (format,)
        )

    driver = EXPORT_FORMAT_OGR[format]

    # dataset creation options (configurable by user)
    dsco = list()
    if driver.dsco_configurable is not None:
        for option in driver.dsco_configurable:
            option = option.split(":")[0]
            if option in request.GET:
                dsco.append("%s=%s" % (option, request.GET.get(option)))

    # layer creation options
    lco = list(driver.options or [])

    if encoding is not None:
        lco.append("ENCODING=%s" % encoding)

    query = request.context.feature_query()
    query.geom()

    ogr_ds = _ogr_memory_ds()
    ogr_layer = _ogr_layer_from_features(  # NOQA: 841
        request.context, query(), ds=ogr_ds, fid=fid)

    with tempfile.TemporaryDirectory() as tmp_dir:
        filename = "%d.%s" % (
            request.context.id,
            driver.extension,
        )

        vtopts = (
            [
                "-f", driver.name,
                "-t_srs", srs.wkt,
            ]
            + list(itertools.chain(*[("-lco", o) for o in lco]))
            + list(itertools.chain(*[("-dsco", o) for o in dsco]))
        )

        if display_name:
            # CPLES_SQLI == 7
            flds = [
                '"{}" as "{}"'.format(
                    fld.keyname.replace('"', r'\"'),
                    fld.display_name.replace('"', r'\"'),
                )
                for fld in request.context.fields
            ]
            if fid is not None:
                flds += ['FID as "{}"'.format(fid.replace('"', r'\"'))]
            vtopts += ["-sql", 'select {} from ""'.format(", ".join(
                flds if len(flds) > 0 else '*'))]

        if driver.fid_support and fid is None:
            vtopts.append('-preserve_fid')

        gdal.VectorTranslate(
            os.path.join(tmp_dir, filename), ogr_ds,
            options=gdal.VectorTranslateOptions(options=vtopts)
        )

        if zipped or not driver.single_file:
            content_type = "application/zip"
            content_disposition = "attachment; filename=%s" % ("%s.zip" % (filename,))
            with tempfile.NamedTemporaryFile(suffix=".zip") as tmp_file:
                with zipfile.ZipFile(tmp_file, "w", zipfile.ZIP_DEFLATED) as zipf:
                    for root, dirs, files in os.walk(tmp_dir):
                        for file in files:
                            path = os.path.join(root, file)
                            zipf.write(path, os.path.basename(path))
                response = FileResponse(
                    tmp_file.name, content_type=content_type,
                    request=request)
                response.content_disposition = content_disposition
                return response
        else:
            content_type = driver.mime or "application/octet-stream"
            content_disposition = "attachment; filename=%s" % filename
            response = FileResponse(
                os.path.join(tmp_dir, filename), content_type=content_type,
                request=request)
            response.content_disposition = content_disposition
            return response


def mvt(request):
    if not MVT_DRIVER_EXIST:
        return HTTPNotFound(explanation='MVT GDAL driver not found')

    z, x, y = zxy_from_request(request)

    extent = int(request.GET.get('extent', 4096))
    simplification = float(request.GET.get("simplification", extent / 512))

    resids = map(
        int,
        filter(None, request.GET["resource"].split(",")),
    )

    # web mercator
    merc = SRS.filter_by(id=3857).one()
    minx, miny, maxx, maxy = merc.tile_extent((z, x, y))

    # 5% padding by default
    padding = float(request.GET.get("padding", 0.05))

    bbox = (
        minx - (maxx - minx) * padding,
        miny - (maxy - miny) * padding,
        maxx + (maxx - minx) * padding,
        maxy + (maxy - miny) * padding,
    )
    bbox = Geometry.from_shape(box(*bbox), srid=merc.id)

    options = [
        "FORMAT=DIRECTORY",
        "TILE_EXTENSION=pbf",
        "MINZOOM=%d" % z,
        "MAXZOOM=%d" % z,
        "EXTENT=%d" % extent,
        "COMPRESS=NO",
    ]

    ds = _ogr_ds("MVT", options)

    vsibuf = ds.GetName()

    for resid in resids:
        try:
            obj = Resource.filter_by(id=resid).one()
        except NoResultFound:
            raise ResourceNotFound(resid)

        request.resource_permission(PERM_READ, obj)

        query = obj.feature_query()
        query.intersects(bbox)
        query.geom()

        if IFeatureQueryClipByBox.providedBy(query):
            query.clip_by_box(bbox)

        if IFeatureQuerySimplify.providedBy(query):
            tolerance = ((obj.srs.maxx - obj.srs.minx) / (1 << z)) / extent
            query.simplify(tolerance * simplification)

        _ogr_layer_from_features(
            obj, query(), name="ngw:%d" % obj.id, ds=ds)

    # flush changes
    ds = None

    filepath = os.path.join(
        "%s" % vsibuf, "%d" % z, "%d" % x, "%d.pbf" % y
    )

    try:
        f = gdal.VSIFOpenL(filepath, "rb")

        if f is not None:
            # SEEK_END = 2
            gdal.VSIFSeekL(f, 0, 2)
            size = gdal.VSIFTellL(f)

            # SEEK_SET = 0
            gdal.VSIFSeekL(f, 0, 0)
            content = gdal.VSIFReadL(1, size, f)
            if isinstance(content, bytearray):
                content = bytes(content)
            gdal.VSIFCloseL(f)

            return Response(
                content,
                content_type="application/vnd.mapbox-vector-tile",
            )
        else:
            return HTTPNoContent()

    finally:
        gdal.Unlink(vsibuf)


def deserialize(feat, data, geom_format='wkt', dt_format='obj', transformer=None):
    if 'geom' in data:
        try:
            if geom_format == 'wkt':
                feat.geom = Geometry.from_wkt(data['geom'])
            elif geom_format == 'geojson':
                feat.geom = Geometry.from_geojson(data['geom'])
            else:
                raise ValidationError(_("Geometry format '%s' is not supported.") % geom_format)
        except GeometryNotValid:
            raise ValidationError(_("Geometry is not valid."))

        if transformer is not None:
            feat.geom = transformer.transform(feat.geom)

    if dt_format not in ('obj', 'iso'):
        raise ValidationError(_("Date format '%s' is not supported.") % dt_format)

    if 'fields' in data:
        fdata = data['fields']

        for fld in feat.layer.fields:

            if fld.keyname in fdata:
                val = fdata.get(fld.keyname)

                if val is None:
                    fval = None

                elif fld.datatype == FIELD_TYPE.DATE:
                    if dt_format == 'iso':
                        fval = date.fromisoformat(val)
                    else:
                        fval = date(
                            int(val['year']),
                            int(val['month']),
                            int(val['day']))

                elif fld.datatype == FIELD_TYPE.TIME:
                    if dt_format == 'iso':
                        fval = time.fromisoformat(val)
                    else:
                        fval = time(
                            int(val['hour']),
                            int(val['minute']),
                            int(val['second']))

                elif fld.datatype == FIELD_TYPE.DATETIME:
                    if dt_format == 'iso':
                        fval = datetime.fromisoformat(val)
                    else:
                        fval = datetime(
                            int(val['year']),
                            int(val['month']),
                            int(val['day']),
                            int(val['hour']),
                            int(val['minute']),
                            int(val['second']))

                else:
                    fval = val

                feat.fields[fld.keyname] = fval

    if 'extensions' in data:
        for cls in FeatureExtension.registry:
            if cls.identity in data['extensions']:
                ext = cls(feat.layer)
                ext.deserialize(feat, data['extensions'][cls.identity])


def serialize(feat, keys=None, geom_format='wkt', dt_format='obj', label=False, extensions=[]):
    result = OrderedDict(id=feat.id)

    if label:
        result['label'] = feat.label

    if feat.geom is not None:
        if geom_format == 'wkt':
            geom = feat.geom.wkt
        elif geom_format == 'geojson':
            geom = feat.geom.to_geojson()
        else:
            raise ValidationError(_("Geometry format '%s' is not supported.") % geom_format)

        result['geom'] = geom

    if dt_format not in ('obj', 'iso'):
        raise ValidationError(_("Date format '%s' is not supported.") % dt_format)

    result['fields'] = OrderedDict()
    for fld in feat.layer.fields:
        if keys is not None and fld.keyname not in keys:
            continue

        val = feat.fields.get(fld.keyname)

        if val is None:
            fval = None

        elif fld.datatype in (FIELD_TYPE.DATE, FIELD_TYPE.TIME, FIELD_TYPE.DATETIME):
            if dt_format == 'iso':
                fval = val.isoformat()
            else:
                if fld.datatype == FIELD_TYPE.DATE:
                    fval = OrderedDict((
                        ('year', val.year),
                        ('month', val.month),
                        ('day', val.day)))

                elif fld.datatype == FIELD_TYPE.TIME:
                    fval = OrderedDict((
                        ('hour', val.hour),
                        ('minute', val.minute),
                        ('second', val.second)))

                elif fld.datatype == FIELD_TYPE.DATETIME:
                    fval = OrderedDict((
                        ('year', val.year),
                        ('month', val.month),
                        ('day', val.day),
                        ('hour', val.hour),
                        ('minute', val.minute),
                        ('second', val.second)))

        else:
            fval = val

        result['fields'][fld.keyname] = fval

    result['extensions'] = OrderedDict()
    for identity, ext in extensions:
        result['extensions'][identity] = ext.serialize(feat)

    return result


def query_feature_or_not_found(query, resource_id, feature_id):
    """ Query one feature by id or return FeatureNotFound exception. """

    query.filter_by(id=feature_id)
    query.limit(1)

    for feat in query():
        return feat

    raise FeatureNotFound(resource_id, feature_id)


def iget(resource, request):
    request.resource_permission(PERM_READ)

    geom_skip = request.GET.get("geom", 'yes').lower() == 'no'
    srs = request.GET.get("srs")

    srlz_params = dict(
        geom_format=request.GET.get('geom_format', 'wkt').lower(),
        dt_format=request.GET.get('dt_format', 'obj'),
        extensions=_extensions(request.GET.get('extensions'), resource)
    )

    query = resource.feature_query()
    if not geom_skip:
        if srs is not None:
            query.srs(SRS.filter_by(id=int(srs)).one())
        query.geom()
        if srlz_params['geom_format'] == 'wkt':
            query.geom_format('WKT')

    feature = query_feature_or_not_found(query, resource.id, int(request.matchdict['fid']))

    result = serialize(feature, **srlz_params)

    return result


def item_extent(resource, request):
    request.resource_permission(PERM_READ)

    feature_id = int(request.matchdict['fid'])
    query = resource.feature_query()
    query.srs(SRS.filter_by(id=4326).one())
    query.box()

    feature = query_feature_or_not_found(query, resource.id, feature_id)
    minLon, minLat, maxLon, maxLat = feature.box.bounds
    extent = dict(
        minLon=minLon,
        minLat=minLat,
        maxLon=maxLon,
        maxLat=maxLat
    )
    return dict(extent=extent)


def iput(resource, request):
    request.resource_permission(PERM_WRITE)

    query = resource.feature_query()
    query.geom()

    feature = query_feature_or_not_found(query, resource.id, int(request.matchdict['fid']))

    dsrlz_params = dict(
        geom_format=request.GET.get('geom_format', 'wkt').lower(),
        dt_format=request.GET.get('dt_format', 'obj')
    )

    srs = request.GET.get('srs')

    if srs is not None:
        srs_from = SRS.filter_by(id=int(srs)).one()
        dsrlz_params['transformer'] = Transformer(srs_from.wkt, resource.srs.wkt)

    deserialize(feature, request.json_body, **dsrlz_params)
    if IWritableFeatureLayer.providedBy(resource):
        resource.feature_put(feature)

    return dict(id=feature.id)


def idelete(resource, request):
    request.resource_permission(PERM_DELETE)

    fid = int(request.matchdict['fid'])
    resource.feature_delete(fid)


def cget(resource, request):
    request.resource_permission(PERM_READ)

    geom_skip = request.GET.get("geom", 'yes') == 'no'
    srs = request.GET.get("srs")

    srlz_params = dict(
        geom_format=request.GET.get('geom_format', 'wkt').lower(),
        dt_format=request.GET.get('dt_format', 'obj'),
        label=request.GET.get('label', False),
        extensions=_extensions(request.GET.get('extensions'), resource),
    )

    keys = [fld.keyname for fld in resource.fields]
    query = resource.feature_query()

    # Paging
    limit = request.GET.get('limit')
    offset = request.GET.get('offset', 0)
    if limit is not None:
        query.limit(int(limit), int(offset))

    # Filtering by attributes
    filter_ = []
    for param in request.GET.keys():
        if param.startswith('fld_'):
            fld_expr = re.sub('^fld_', '', param)
        elif param == 'id' or param.startswith('id__'):
            fld_expr = param
        else:
            continue

        try:
            key, operator = fld_expr.rsplit('__', 1)
        except ValueError:
            key, operator = (fld_expr, 'eq')

        if key != 'id' and key not in keys:
            raise ValidationError(message="Unknown field '%s'." % key)

        filter_.append((key, operator, request.GET[param]))

    if filter_:
        query.filter(*filter_)

    # Like
    like = request.GET.get('like')
    if like is not None and IFeatureQueryLike.providedBy(query):
        query.like(like)

    # Ordering
    order_by = request.GET.get('order_by')
    order_by_ = []
    if order_by is not None:
        for order_def in list(order_by.split(',')):
            order, colname = re.match(r'^(\-|\+|%2B)?(.*)$', order_def).groups()
            if colname is not None:
                order = ['asc', 'desc'][order == '-']
                order_by_.append([order, colname])

    if order_by_:
        query.order_by(*order_by_)

    # Filtering by extent
    if 'intersects' in request.GET:
        wkt_intersects = request.GET['intersects']
    # Workaround to pass really big geometry for intersection filter
    elif (
        request.content_type == 'application/json'
        and 'intersects' in (json_body := request.json_body)
    ):
        wkt_intersects = json_body['intersects']
    else:
        wkt_intersects = None

    if wkt_intersects is not None:
        try:
            geom = Geometry.from_wkt(wkt_intersects, srid=resource.srs.id)
        except GeometryNotValid:
            raise ValidationError(_("Parameter 'intersects' geometry is not valid."))
        query.intersects(geom)

    # Selected fields
    fields = request.GET.get('fields')
    if fields is not None:
        field_list = fields.split(',')
        fields = [key for key in keys if key in field_list]

    if fields:
        srlz_params['keys'] = fields
        query.fields(*fields)

    if not geom_skip:
        if srs is not None:
            query.srs(SRS.filter_by(id=int(srs)).one())
        query.geom()
        if srlz_params['geom_format'] == 'wkt':
            query.geom_format('WKT')

    result = [
        serialize(feature, **srlz_params)
        for feature in query()
    ]

    return result


def cpost(resource, request):
    request.resource_permission(PERM_WRITE)

    dsrlz_params = dict(
        geom_format=request.GET.get('geom_format', 'wkt').lower(),
        dt_format=request.GET.get('dt_format', 'obj')
    )

    srs = request.GET.get('srs')

    if srs is not None:
        srs_from = SRS.filter_by(id=int(srs)).one()
        dsrlz_params['transformer'] = Transformer(srs_from.wkt, resource.srs.wkt)

    feature = Feature(layer=resource)
    deserialize(feature, request.json_body, **dsrlz_params)
    fid = resource.feature_create(feature)

    return dict(id=fid)


def cpatch(resource, request):
    request.resource_permission(PERM_WRITE)
    result = list()

    dsrlz_params = dict(
        geom_format=request.GET.get('geom_format', 'wkt').lower(),
        dt_format=request.GET.get('dt_format', 'obj')
    )

    srs = request.GET.get('srs')

    if srs is not None:
        srs_from = SRS.filter_by(id=int(srs)).one()
        dsrlz_params['transformer'] = Transformer(srs_from.wkt, resource.srs.wkt)

    for fdata in request.json_body:
        if 'id' not in fdata:
            # Create new feature
            feature = Feature(layer=resource)
            deserialize(feature, fdata, **dsrlz_params)
            fid = resource.feature_create(feature)
        else:
            # Update existing feature
            fid = fdata['id']
            query = resource.feature_query()
            query.geom()
            query.filter_by(id=fid)
            query.limit(1)

            feature = None
            for f in query():
                feature = f

            deserialize(feature, fdata, **dsrlz_params)
            resource.feature_put(feature)

        result.append(dict(id=fid))

    return result


def cdelete(resource, request):
    request.resource_permission(PERM_DELETE)

    if len(request.body) > 0:
        result = []
        for fdata in request.json_body:
            if 'id' in fdata:
                fid = fdata['id']
                resource.feature_delete(fid)
                result.append(fid)
    else:
        resource.feature_delete_all()
        result = True

    return result


def count(resource, request):
    request.resource_permission(PERM_READ)

    query = resource.feature_query()
    total_count = query().total_count

    return dict(total_count=total_count)


def store_collection(layer, request):
    request.resource_permission(PERM_READ)

    query = layer.feature_query()

    http_range = request.headers.get('range')
    if http_range and http_range.startswith('items='):
        first, last = map(int, http_range[len('items='):].split('-', 1))
        query.limit(last - first + 1, first)

    field_prefix = json.loads(
        unquote(request.headers.get('x-field-prefix', '""')))

    def pref(f):
        return field_prefix + f

    field_list = json.loads(
        unquote(request.headers.get('x-field-list', "[]")))
    if len(field_list) > 0:
        query.fields(*field_list)

    box = request.headers.get('x-feature-box')
    if box:
        query.box()

    like = request.params.get('like', '')
    if like != '':
        query.like(like)

    sort_re = re.compile(r'sort\(([+-])%s(\w+)\)' % (field_prefix, ))
    sort = sort_re.search(unquote(request.query_string))
    if sort:
        sort_order = {'+': 'asc', '-': 'desc'}[sort.group(1)]
        sort_colname = sort.group(2)
        query.order_by((sort_order, sort_colname), )

    features = query()

    result = []
    for fobj in features:
        fdata = dict(
            [(pref(k), v) for k, v in fobj.fields.items()],
            id=fobj.id, label=fobj.label)
        if box:
            fdata['box'] = fobj.box.bounds

        result.append(fdata)

    if http_range:
        total = features.total_count
        last = min(total - 1, last)
        content_range = 'items %d-%d/%d' % (first, last, total)
        request.response.headers['Content-Range'] = content_range

    return result


def setup_pyramid(comp, config):
    config.add_route(
        'feature_layer.geojson', '/api/resource/{id}/geojson',
        factory=resource_factory) \
        .add_view(view_geojson, context=IFeatureLayer, request_method='GET')

    config.add_view(
        export,
        route_name='resource.export',
        context=IFeatureLayer,
        request_method='GET',
    )

    config.add_route(
        'feature_layer.mvt', '/api/component/feature_layer/mvt') \
        .add_view(mvt, request_method='GET')

    config.add_route(
        'feature_layer.feature.item', '/api/resource/{id}/feature/{fid}',
        factory=resource_factory) \
        .add_view(iget, context=IFeatureLayer, request_method='GET', renderer='json') \
        .add_view(iput, context=IFeatureLayer, request_method='PUT', renderer='json') \
        .add_view(idelete, context=IWritableFeatureLayer,
                  request_method='DELETE', renderer='json')

    config.add_route(
        'feature_layer.feature.item_extent', '/api/resource/{id}/feature/{fid}/extent',
        factory=resource_factory) \
        .add_view(item_extent, context=IFeatureLayer, request_method='GET', renderer='json')

    config.add_route(
        'feature_layer.feature.collection', '/api/resource/{id}/feature/',
        factory=resource_factory) \
        .add_view(cget, context=IFeatureLayer, request_method='GET', renderer='json') \
        .add_view(cpost, context=IWritableFeatureLayer, request_method='POST', renderer='json') \
        .add_view(cpatch, context=IWritableFeatureLayer, request_method='PATCH', renderer='json') \
        .add_view(cdelete, context=IWritableFeatureLayer, request_method='DELETE', renderer='json')

    config.add_route(
        'feature_layer.feature.count', '/api/resource/{id}/feature_count',
        factory=resource_factory) \
        .add_view(count, context=IFeatureLayer, request_method='GET', renderer='json')

    config.add_route(
        'feature_layer.store', r'/api/resource/{id:\d+}/store/',
        factory=resource_factory) \
        .add_view(store_collection, context=IFeatureLayer, request_method='GET', renderer='json')

    from .identify import identify
    config.add_route(
        'feature_layer.identify', '/api/feature_layer/identify') \
        .add_view(identify, request_method='POST', renderer='json')
