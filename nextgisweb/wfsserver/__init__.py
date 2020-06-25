# -*- coding: utf-8 -*-
from ..component import Component
from .model import Base, Service

__all__ = ['Service', ]


class WFSServerComponent(Component):
    identity = 'wfsserver'
    metadata = Base.metadata

    def setup_pyramid(self, config):
        from . import api, view
        api.setup_pyramid(self, config)
        view.setup_pyramid(self, config)
