# -*- coding: utf-8 -*-
from __future__ import division, absolute_import, print_function, unicode_literals

from ..resource import Widget, Resource
from .util import _


class Widget(Widget):
    resource = Resource
    operation = ('create', 'update')
    amdmod = 'ngw-resmeta/Widget'


def setup_pyramid(comp, config):
    Resource.__psection__.register(
        key='resmeta',
        priority=40,
        title=_("Metadata"),
        is_applicable=lambda obj: len(obj.resmeta) > 0,
        template='nextgisweb:resmeta/template/section.mako')
