# -*- coding: utf-8 -*-
from __future__ import division, absolute_import, print_function, unicode_literals

import pytest

from nextgisweb.spatial_ref_sys.models import (
    SRS, BOUNDS_EPSG_3857, BOUNDS_EPSG_4326,
)
from nextgisweb.tmsclient.util import crop_box, render_zoom


@pytest.mark.parametrize('src_extent, dst_extent, width, height, expected', (
    ((0, 0, 10, 10), (0, 0, 10, 10), 100, 100, (0, 0, 100, 100)),
    ((0, 0, 10, 10), (0, 0, 5, 5), 10, 10, (0, 5, 5, 10)),
    ((100, 100, 900, 700), (200, 200, 400, 300), 100, 100, (13, 67, 38, 83)),
))
def test_crop_box(txn, src_extent, dst_extent, width, height, expected):
    box = crop_box(map(float, src_extent), map(float, dst_extent), width, height)
    assert box == expected


@pytest.mark.parametrize('srs_id, extent, size, tilesize, expected', (
    (4326, BOUNDS_EPSG_4326, (256, 256), 256, 0),
    (3857, BOUNDS_EPSG_3857, (256, 256), 256, 0),
    (4326, (42.9, 131.7, 43.11, 132.0), (512, 512), 256, 10),
))
def test_render_zoom(txn, srs_id, extent, size, tilesize, expected):
    srs = SRS.filter_by(id=srs_id).one()
    zoom = render_zoom(srs, map(float, extent), size, tilesize)
    assert zoom == expected
