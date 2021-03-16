# -*- coding: utf-8 -*-
from __future__ import division, unicode_literals, print_function, absolute_import

from warnings import warn

from pyproj import CRS, Transformer as pyTr
from shapely import wkt, wkb
from shapely.geometry import (
    mapping as geometry_mapping,
    shape as geometry_shape,
    box as geometry_box)
from shapely.ops import transform as map_coords


class Geometry(object):
    """ Initialization format is kept "as is".
    Other formats are calculated as needed."""

    __slots__ = ('_wkb', '_wkt', '_shape', '_srid')

    def __init__(self, wkb=None, wkt=None, shape_obj=None, srid=None):
        self._wkb = wkb
        self._wkt = wkt
        self._shape = shape_obj

        if not any((self._wkb, self._wkt, self._shape)):
            raise ValueError("None base format is not defined.")

        self._srid = srid

    @property
    def srid(self):
        return self._srid

    # Base constructors

    @classmethod
    def from_wkb(cls, data, srid=None):
        return cls(wkb=data, srid=srid)

    @classmethod
    def from_wkt(cls, data, srid=None):
        return cls(wkt=data, srid=srid)

    @classmethod
    def from_shape(cls, data, srid=None):
        return cls(shape_obj=data, srid=srid)

    # Additional constructors

    @classmethod
    def from_geojson(cls, data, srid=None):
        shape_obj = geometry_shape(data)
        return cls.from_shape(shape_obj, srid=srid)

    @classmethod
    def from_box(cls, minx, miny, maxx, maxy, srid=None):
        return cls.from_shape(
            geometry_box(minx, miny, maxx, maxy),
            srid=srid)

    # Base output formats

    @property
    def wkb(self):
        if self._wkb is None:
            self._wkb = self.shape.wkb
        return self._wkb

    @property
    def wkt(self):
        if self._wkt is None:
            self._wkt = self.shape.wkt
        return self._wkt

    @property
    def shape(self):
        if self._shape is None:
            if self._wkb is not None:
                self._shape = wkb.loads(self._wkb)
            else:
                self._shape = wkt.loads(self._wkt)
        return self._shape

    # Additional output formats

    def to_geojson(self):
        return geometry_mapping(self.shape)

    # Shapely providers

    @property
    def bounds(self):
        return self.shape.bounds

    def simplify(self, *args, **kwargs):
        warn("Geometry.simplify is deprecated! Use Geometry.shape object instead.",
             DeprecationWarning)
        return self.shape.simplify(*args, **kwargs)


class Transformer(object):

    def __init__(self, wkt_from, wkt_to):
        crs_from = CRS.from_wkt(wkt_from)
        crs_to = CRS.from_wkt(wkt_to)

        # pyproj >= 2.5
        # if crs_from.equals(crs_to):
        if wkt_from == wkt_to:
            self._transformer = None
        else:
            self._transformer = pyTr.from_crs(crs_from, crs_to, always_xy=True)

    def transform(self, geom):
        # NB: geom.srid is not considered
        if self._transformer is None:
            return geom
        else:
            shape_obj = map_coords(self._transformer.transform, geom.shape)
            return Geometry.from_shape(shape_obj)


def geom_calc(geom, crs, prop, srid):
    # pyproj < 2.3
    def geodesic_calc_with_postgis():
        # TODO: Remove these cludges after pyproj upgarade
        from sqlalchemy import func
        from ...models import DBSession

        fun = dict(length=func.ST_Length, area=func.ST_Area)[prop]
        query = fun(func.geography(func.ST_GeomFromText(geom.wkt, srid)))

        return DBSession.query(query).scalar()

    factor = crs.axis_info[0].unit_conversion_factor
    calcs = dict(
        length=lambda: geodesic_calc_with_postgis() if crs.is_geographic else geom.length * factor,
        area=lambda: geodesic_calc_with_postgis() if crs.is_geographic else geom.area * factor**2
    )

    # pyproj >= 2.3
    # calcs = dict(
    #     length=lambda: crs.get_geod().geometry_length(geom)
    #         if crs.is_geographic else geom.length * factor,
    #     area=lambda: crs.get_geod().geometry_area_perimeter(geom)[0]
    #         if crs.is_geographic else geom.area * factor**2
    # )

    if prop not in calcs:
        return None

    return calcs[prop]()