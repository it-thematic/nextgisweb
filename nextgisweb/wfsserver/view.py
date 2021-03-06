# -*- coding: utf-8 -*-
from __future__ import division, unicode_literals, print_function, absolute_import

from ..resource import Widget, Resource
from .model import Service

from .util import _


class ServiceWidget(Widget):
    resource = Service
    operation = ('create', 'update')
    amdmod = 'ngw-wfsserver/ServiceWidget'


def setup_pyramid(comp, config):
    Resource.__psection__.register(
        key='description',
        title=_("External access"),
        is_applicable=lambda obj: obj.cls == 'wfsserver_service',
        template='nextgisweb:wfsserver/template/section_api_wfs.mako')
