# -*- coding: utf-8 -*-
from __future__ import unicode_literals, print_function, absolute_import

from .models import SRS


def collection(request):
    return list(map(lambda o: dict(
        id=o.id, display_name=o.display_name,
        auth_name=o.auth_name, auth_srid=o.auth_srid,
    ), SRS.query()))


def get(request):
    obj = SRS.filter_by(id=request.matchdict['id']).one()
    return dict(
        id=obj.id, display_name=obj.display_name,
        auth_name=obj.auth_name, auth_srid=obj.auth_srid,
        proj4text=obj.proj4text
    )


def setup_pyramid(comp, config):
    config.add_route(
        'spatial_ref_sys.collection', '/api/component/spatial_ref_sys/',
    ).add_view(collection, request_method='GET', renderer='json')

    config.add_route(
        'spatial_ref_sys.get', '/api/component/spatial_ref_sys/{id}',
    ).add_view(get, request_method='GET', renderer='json')
