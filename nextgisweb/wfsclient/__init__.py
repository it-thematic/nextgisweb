from datetime import timedelta

from .model import Base, WFSConnection, WFSLayer
from ..component import Component, require
from ..lib.config import Option

__all__ = ['WFSConnection', 'WFSLayer']


class WFSClientComponent(Component):
    identity = 'wfsclient'
    metadata = Base.metadata

    def initialize(self):
        super().initialize()

        self.headers = {
            'User-Agent': self.options['user_agent']
        }

    @require('feature_layer')
    def setup_pyramid(self, config):
        from . import api
        from . import view  # NOQA
        api.setup_pyramid(self, config)

    option_annotations = (
        Option('user_agent', default="NextGIS Web"),
        Option('timeout', timedelta, default=timedelta(seconds=60)),
    )
