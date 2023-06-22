from ..env import Component, require
from ..lib.config import Option

from .kind_of_data import VectorLayerData
from .model import Base, VectorLayer, estimate_vector_layer_data


class VectorLayerComponent(Component):
    identity = 'vector_layer'
    metadata = Base.metadata

    @require('feature_layer')
    def setup_pyramid(self, config):
        from . import api, view  # NOQA: F401
        api.setup_pyramid(self, config)

    def estimate_storage(self):
        for resource in VectorLayer.query():
            size = estimate_vector_layer_data(resource)
            yield VectorLayerData, resource.id, size
