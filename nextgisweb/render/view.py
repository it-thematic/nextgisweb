from ..resource import (Widget, Resource)
from ..env import env

from .interface import IRenderableStyle
from .util import _


class TileCacheWidget(Widget):
    interface = IRenderableStyle
    operation = ('create', 'update')
    amdmod = 'ngw-render/TileCacheWidget'

    def is_applicable(self):
        return env.render.tile_cache_enabled \
            and super().is_applicable()


def setup_pyramid(comp, config):
    Resource.__psection__.register(
        key='description',
        title=_("External access"),
        template='nextgisweb:render/template/section_api_renderable.mako',
        is_applicable=lambda obj: IRenderableStyle.providedBy(obj))
