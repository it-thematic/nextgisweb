# -*- coding: utf-8 -*-
from __future__ import division, absolute_import, print_function, unicode_literals

from ..lib.config import OptionAnnotations, Option


class YandexHelper(object):

    def __init__(self, options):
        self.options = options

    option_annotations = OptionAnnotations((
        Option('enabled', bool, default=False,
               doc="Enable Yandex.Metrika."),

        Option('counter', int, default=0,
               doc="Nubmer of Yandex.Metrica counter. Change it for valid counter.")
    ))
