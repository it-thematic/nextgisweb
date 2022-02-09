from .util import COMP_ID
from ..component import Component

__all__ = ['GUIComponent', ]


class GUIComponent(Component):
    identity = COMP_ID

    def setup_pyramid(self, config):
        from . import view
        view.setup_pyramid(self, config)
