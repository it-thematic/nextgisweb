# -*- coding: utf-8 -*-
from __future__ import division, unicode_literals, print_function, absolute_import
import sys
import os
import json
from subprocess import check_output
from pkg_resources import resource_filename


def extract(fileobj, keywords, comment_tags, options):
    env = dict(os.environ)
    env['NODE_PATH'] = resource_filename('nextgisweb', 'amd_packages/contrib')

    out = check_output(
        ['node', resource_filename('nextgisweb', 'i18n/hbs.js')],
        stdin=fileobj, stderr=sys.stderr, env=env)

    for rec in json.loads(out):
        yield (rec['lineno'], '', rec['messages'], '')
