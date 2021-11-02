import requests

from ..resource import ConnectionScope, resource_factory

from .model import Connection, NEXTGIS_GEOSERVICES


def inspect_connection(request):
    request.resource_permission(ConnectionScope.connect)

    connection = request.context

    layers = []

    if connection.capmode == NEXTGIS_GEOSERVICES:
        result = requests.get(
            request.env.tmsclient.options['nextgis_geoservices.layers'],
            headers=request.env.tmsclient.headers
        )

        for layer in result.json():
            layers.append(dict(
                layer=layer['layer'],
                description=layer['description'],
                tilesize=layer['tile_size'],
                minzoom=layer['min_zoom'],
                maxzoom=layer['max_zoom'],
                bounds=layer['bounds']
            ))

    return layers


def setup_pyramid(comp, config):
    config.add_route(
        'tmsclient.connection.layers', '/api/component/tmsclient/{id}/layers/',
        factory=resource_factory
    ).add_view(inspect_connection, context=Connection, request_method='GET', renderer='json')
