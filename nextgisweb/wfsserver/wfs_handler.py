# -*- coding: utf-8 -*-
from __future__ import division, absolute_import, print_function, unicode_literals

from lxml import etree
from lxml.builder import ElementMaker

from osgeo import ogr, osr
from six import BytesIO, text_type

from ..core.exception import ValidationError
from ..feature_layer import Feature, FIELD_TYPE, GEOM_TYPE
from ..geometry import box, geom_from_wkb
from ..resource import DataScope
from ..spatial_ref_sys import SRS

from .model import Layer

# Spec: http://docs.opengeospatial.org/is/09-025r2/09-025r2.html
v100 = '1.0.0'
v200 = '2.0.0'
v202 = '2.0.2'
VERSION_SUPPORTED = (v100, v200, v202)

VERSION_DEFAULT = v202


nsmap = dict(
    wfs='http://www.opengis.net/wfs',
    gml='http://www.opengis.net/gml',
    ogc='http://www.opengis.net/ogc',
    xsi='http://www.w3.org/2001/XMLSchema-instance'
)


def ns_attr(ns, attr):
    return '{{{0}}}{1}'.format(nsmap[ns], attr)


def ns_trim(value):
    pos = max(value.find('}'), value.rfind(':'))
    return value[pos + 1:]


def El(tag, attrs=None, parent=None, text=None, namespace=None):
    if namespace is None:
        e = etree.Element(tag, attrs)
    else:
        EM = ElementMaker(namespace=namespace)
        e = EM(tag, attrs) if attrs is not None else EM(tag)
    if text is not None:
        e.text = text
    if parent is not None:
        parent.append(e)
    return e


GML_FORMAT = 'GML3'
WFS_OPERATIONS = (
    ('GetCapabilities', ()),
    ('DescribeFeatureType', ()),
    ('GetFeature', (GML_FORMAT, )),
    ('Transaction', (GML_FORMAT, )),
)


GEOM_TYPE_TO_GML_TYPE = {
    GEOM_TYPE.POINT: 'gml:PointPropertyType',
    GEOM_TYPE.LINESTRING: 'gml:LineStringPropertyType',
    GEOM_TYPE.POLYGON: 'gml:PolygonPropertyType',
    GEOM_TYPE.MULTIPOINT: 'gml:MultiPointPropertyType',
    GEOM_TYPE.MULTILINESTRING: 'gml:MultiLineStringPropertyType',
    GEOM_TYPE.MULTIPOLYGON: 'gml:MultiPolygonPropertyType',
    GEOM_TYPE.POINTZ: 'gml:PointZPropertyType',
    GEOM_TYPE.LINESTRINGZ: 'gml:LineStringZPropertyType',
    GEOM_TYPE.POLYGONZ: 'gml:PolygonZPropertyType',
    GEOM_TYPE.MULTIPOINTZ: 'gml:MultiPointZPropertyType',
    GEOM_TYPE.MULTILINESTRINGZ: 'gml:MultiLineStringZPropertyType',
    GEOM_TYPE.MULTIPOLYGONZ: 'gml:MultiPolygonZPropertyType',
}


def get_geom_column(feature_layer):
    return feature_layer.column_geom if hasattr(feature_layer, 'column_geom') else 'geom'


def geom_from_gml(el):
    value = etree.tostring(el)
    ogr_geom = ogr.CreateGeometryFromGML(value)
    return geom_from_wkb(ogr_geom.ExportToWkb())


class WFSHandler():
    def __init__(self, resource, request):
        self.resource = resource
        self.request = request

        if self.request.method == 'GET':
            params = request.params
        elif self.request.method == 'POST':
            self.root_body = etree.parse(BytesIO(self.request.body)).getroot()
            params = self.root_body.attrib
        else:
            raise ValidationError("Unsupported request method")

        # 6.2.5.2 Parameter names shall not be case sensitive
        params = dict((k.upper(), v) for k, v in params.items())

        self.p_requset = params.get('REQUEST') if self.request.method == 'GET' \
            else ns_trim(self.root_body.tag)

        self.p_version = params.get('VERSION', VERSION_DEFAULT)
        self.p_typenames = params.get('TYPENAMES', params.get('TYPENAME'))
        self.p_resulttype = params.get('RESULTTYPE')
        self.p_bbox = params.get('BBOX')
        self.p_srsname = params.get('SRSNAME')
        self.p_count = params.get('COUNT', params.get('MAXFEATURES'))
        self.p_startindex = params.get('STARTINDEX')

    def response(self):
        if self.p_version not in VERSION_SUPPORTED:
            raise ValidationError("Unsupported version")

        if self.p_requset == 'GetCapabilities':
            return self._get_capabilities()
        elif self.p_requset == 'DescribeFeatureType':
            return self._describe_feature_type()
        elif self.p_requset == 'GetFeature':
            return self._get_feature()
        elif self.p_requset == 'Transaction':
            return self._transaction()
        else:
            raise ValidationError("Unsupported request")

    def _get_capabilities(self):
        root = El('WFS_Capabilities', dict(version=self.p_version))

        __s = El('Service', parent=root)
        El('Name', parent=__s, text='WFS Server')
        El('Title', parent=__s, text='Web Feature Service Server')
        El('Abstract', parent=__s, text='Supports WFS')

        __c = El('Capability', parent=root)
        __r = El('Request', parent=__c)

        wfs_url = self.request.route_url('wfsserver.wfs', id=self.resource.id)
        for wfs_operation, result_formats in WFS_OPERATIONS:
            __wfs_op = El(wfs_operation, parent=__r)
            for request_method in ('Get', 'Post'):
                __dcp = El('DCPType', parent=__wfs_op)
                __http = El('HTTP', parent=__dcp)
                El(request_method, dict(onlineResource=wfs_url), parent=__http)
            for result_format in result_formats:
                __format = El('ResultFormat', parent=__wfs_op)
                El(result_format, parent=__format)

        __list = El('FeatureTypeList', parent=root)
        __ops = El('Operations', parent=__list)
        El('Query', parent=__ops)

        for layer in self.resource.layers:
            feature_layer = layer.resource
            if not feature_layer.has_permission(DataScope.read, self.request.user):
                continue
            __type = El('FeatureType', parent=__list)
            El('Name', parent=__type, text=layer.keyname)
            El('Title', parent=__type, text=layer.display_name)
            El('Abstract', parent=__type)
            El('SRS', parent=__type, text="EPSG:%s" % layer.resource.srs_id)

            __ops = El('Operations', parent=__type)
            if feature_layer.has_permission(DataScope.write, self.request.user):
                El('Insert', parent=__ops)
                El('Update', parent=__ops)
                El('Delete', parent=__ops)

            extent = feature_layer.extent
            El('bbox', dict(maxx=str(extent['maxLon']), maxy=str(extent['maxLat']),
                            minx=str(extent['minLon']), miny=str(extent['minLat'])), parent=__type)

        return etree.tostring(root)

    def _describe_feature_type(self):
        EM = ElementMaker(nsmap=dict(gml=nsmap['gml']))
        root = EM('schema', dict(
            targetNamespace=nsmap['wfs'],
            elementFormDefault='qualified',
            attributeFormDefault='unqualified',
            version='0.1',
            xmlns='http://www.w3.org/2001/XMLSchema'))

        El('import', dict(
            namespace=nsmap['gml'],
            schemaLocation='http://schemas.opengis.net/gml/2.0.0/feature.xsd'
        ), parent=root)

        typename = self.p_typenames.split(',')
        if len(typename) == 1:
            layer = Layer.filter_by(service_id=self.resource.id, keyname=typename[0]).one()
            El('element', dict(name=layer.keyname, substitutionGroup='gml:_Feature',
                               type='%s_Type' % layer.keyname), parent=root)
            __ctype = El('complexType', dict(name="%s_Type" % layer.keyname), parent=root)
            __ccontent = El('complexContent', parent=__ctype)
            __ext = El('extension', dict(base='gml:AbstractFeatureType'), parent=__ccontent)
            __seq = El('sequence', parent=__ext)
            for field in layer.resource.fields:
                if field.datatype == FIELD_TYPE.REAL:
                    datatype = 'double'
                else:
                    datatype = field.datatype.lower()
                El('element', dict(minOccurs='0', name=field.keyname, type=datatype), parent=__seq)

            if layer.resource.geometry_type not in GEOM_TYPE_TO_GML_TYPE:
                raise ValidationError("Geometry type not supported: %s"
                                      % layer.resource.geometry_type)
            El('element', dict(minOccurs='0', name='geom', type=GEOM_TYPE_TO_GML_TYPE[
                layer.resource.geometry_type]), parent=__seq)
        else:
            for keyname in typename:
                import_url = self.request.route_url(
                    'wfsserver.wfs', id=self.resource.id,
                    _query=dict(REQUEST='DescribeFeatureType', TYPENAME=keyname))
                El('import', dict(schemaLocation=import_url), parent=root)

        return etree.tostring(root)

    def _get_feature(self):
        layer = Layer.filter_by(service_id=self.resource.id, keyname=self.p_typenames).one()
        feature_layer = layer.resource
        self.request.resource_permission(DataScope.read, feature_layer)

        EM = ElementMaker(namespace=nsmap['wfs'], nsmap=dict(
            gml=nsmap['gml'], wfs=nsmap['wfs'],
            ogc=nsmap['ogc'], xsi=nsmap['xsi']
        ))
        root = EM('FeatureCollection', {ns_attr('xsi', 'schemaLocation'): 'http://www.opengis.net/wfs http://schemas.opengeospatial.net//wfs/1.0.0/WFS-basic.xsd'})  # NOQA: E501

        query = feature_layer.feature_query()

        def parse_srs(value):
            # 'urn:ogc:def:crs:EPSG::3857' -> 3857
            return int(value.split(':')[-1])

        if self.p_bbox is not None:
            bbox_param = self.p_bbox.split(',')
            box_coords = map(float, bbox_param[:4])
            box_srid = parse_srs(bbox_param[4])
            box_geom = box(*box_coords, srid=box_srid)
            query.intersects(box_geom)

        if self.p_count is not None:
            limit = int(self.p_count)
            offset = 0 if self.p_startindex is None else int(self.p_startindex)
            query.limit(limit, offset)

        if self.p_resulttype == 'hits':
            root.set('numberMatched', str(query().total_count))
            root.set('numberReturned', "0")
            return etree.tostring(root)

        query.geom()

        if self.p_srsname is not None:
            srs_id = parse_srs(self.p_srsname)
            srs_out = feature_layer.srs \
                if srs_id == feature_layer.srs_id \
                else SRS.filter_by(id=srs_id).one()
        else:
            srs_out = feature_layer.srs
        query.srs(srs_out)

        osr_out = osr.SpatialReference()
        osr_out.ImportFromWkt(srs_out.wkt)

        for feature in query():
            feature_id = str(feature.id)
            __member = El('featureMember', {ns_attr('gml', 'id'): feature_id},
                          parent=root, namespace=nsmap['gml'])
            __feature = El(layer.keyname, dict(fid=feature_id), parent=__member)

            geom = ogr.CreateGeometryFromWkb(feature.geom.wkb, osr_out)
            gml = geom.ExportToGML(['FORMAT=%s' % GML_FORMAT, 'NAMESPACE_DECL=YES'])
            __geom = El('geom', parent=__feature)
            __gml = etree.fromstring(gml)
            __geom.append(__gml)

            for field in feature.fields:
                _field = El(field, parent=__feature)
                value = feature.fields[field]
                if value is not None:
                    if not isinstance(value, text_type):
                        value = str(value)
                    _field.text = value
                else:
                    _field.set(ns_attr('xsi', 'nil'), 'true')

        return etree.tostring(root)

    def _transaction(self):
        v_gt200 = self.p_version >= v200

        layers = dict()

        def find_layer(keyname):
            if keyname not in layers:
                layer = Layer.filter_by(service_id=self.resource.id, keyname=keyname).one()
                feature_layer = layer.resource
                self.request.resource_permission(DataScope.write, feature_layer)
                layers[keyname] = feature_layer
            return layers[keyname]

        EM = ElementMaker(namespace=nsmap['wfs'], nsmap=dict(
            wfs=nsmap['wfs'], ogc=nsmap['ogc'], xsi=nsmap['xsi']))
        _response = EM('TransactionResponse', dict(version='1.0.0'))

        _summary = El('TransactionSummary', namespace=nsmap['wfs'], parent=_response)
        summary = dict(totalInserted=0, totalUpdated=0, totalDeleted=0)

        for _operation in self.root_body:
            if _operation.tag == ns_attr('wfs', 'Insert'):
                _layer = _operation[0]
                keyname = ns_trim(_layer.tag)
                feature_layer = find_layer(keyname)

                feature = Feature()

                geom_column = get_geom_column(feature_layer)

                for _property in _layer:
                    key = ns_trim(_property.tag)
                    if key == geom_column:
                        feature.geom = geom_from_gml(_property[0])
                    else:
                        feature.fields[key] = _property.text

                fid = feature_layer.feature_create(feature)

                _insert = El('InsertResult', namespace=nsmap['wfs'], parent=_response)
                El('FeatureId', dict(fid=str(fid)), namespace=nsmap['ogc'], parent=_insert)

                summary['totalInserted'] += 1
            else:
                keyname = ns_trim(_operation.get('typeName'))
                feature_layer = find_layer(keyname)

                _filter = _operation.find(ns_attr('ogc', 'Filter'))
                resid_tag = 'ResourceId' if v_gt200 else 'FeatureId'
                resid_attr = 'rid' if v_gt200 else 'fid'
                _feature_id = _filter.find(ns_attr('ogc', resid_tag))
                fid = int(_feature_id.get(resid_attr))

                if _operation.tag == ns_attr('wfs', 'Update'):
                    query = feature_layer.feature_query()
                    query.filter_by(id=fid)
                    feature = query().one()
                    for _property in _operation.findall(ns_attr('wfs', 'Property')):
                        key = _property.find(ns_attr('wfs', 'Name')).text
                        _value = _property.find(ns_attr('wfs', 'Value'))

                        geom_column = get_geom_column(feature_layer)

                        if key == geom_column:
                            feature.geom = geom_from_gml(_value[0])
                        else:
                            if _value is None:
                                value = None
                            elif _value.text is None:
                                value = ''
                            else:
                                value = _value.text
                            feature.fields[key] = value

                    feature_layer.feature_put(feature)

                    summary['totalUpdated'] += 1
                elif _operation.tag == ns_attr('wfs', 'Delete'):
                    feature_layer.feature_delete(fid)
                    summary['totalDeleted'] += 1
                else:
                    raise NotImplementedError()

        for param, value in summary.items():
            if value > 0:
                El(param, namespace=nsmap['wfs'], text=str(value), parent=_summary)

        _result = El('TransactionResult', namespace=nsmap['wfs'], parent=_response)
        _status = El('Status', namespace=nsmap['wfs'], parent=_result)
        El('SUCCESS', namespace=nsmap['wfs'], parent=_status)

        return etree.tostring(_response)
