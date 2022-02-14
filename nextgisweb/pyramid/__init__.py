import logging
import os.path
from os import environ
from datetime import datetime as dt, timedelta
from pkg_resources import resource_filename

import transaction
from babel import Locale
from babel.core import UnknownLocaleError

from ..lib.config import Option, OptionAnnotations
from ..lib.logging import logger
from ..component import Component, require

from . import uacompat
from .config import Configurator
from .util import (
    viewargs,
    ClientRoutePredicate,
    ErrorRendererPredicate,
    gensecret,
    persistent_secret,
    StaticFileResponse)
from .model import Base, Session, SessionStore
from .session import WebSession
from .command import ServerCommand, AMDPackagesCommand  # NOQA
from .util import _

__all__ = ['viewargs', 'WebSession']

logger = logging.getLogger(__name__)


class PyramidComponent(Component):
    identity = 'pyramid'
    metadata = Base.metadata

    def make_app(self, settings=None):
        settings = dict(self._settings, **settings)
        config = Configurator(settings=settings)

        config.add_route_predicate('client', ClientRoutePredicate)
        config.add_route_predicate('error_renderer', ErrorRendererPredicate)

        def _gensecret():
            logger.info("Generating pyramid cookie secret...")
            return gensecret(32)

        self.env.core.mksdir(self)
        sdir = self.env.core.gtsdir(self)

        self.secret = persistent_secret(os.path.join(sdir, 'secret'), _gensecret)

        # Setup pyramid app for other components
        chain = self._env.chain('setup_pyramid', first='pyramid')
        for comp in chain:
            comp.setup_pyramid(config)

        return config

    @require('resource')
    def setup_pyramid(self, config):
        from . import view, api, uacompat as uac
        view.setup_pyramid(self, config)
        api.setup_pyramid(self, config)
        uac.setup_pyramid(self, config)

        try:
            import uwsgi
            lunkwill_rpc = b'lunkwill' in uwsgi.rpc_list()
        except ImportError:
            uwsgi = None
            lunkwill_rpc = False

        if self.options['lunkwill.enabled'] is None:
            self.options['lunkwill.enabled'] = lunkwill_rpc

        if self.options['lunkwill.enabled']:
            if self.options['lunkwill.host'] is None:
                self.options['lunkwill.host'] = environ.get(
                    'LUNKWILL_HOST', '127.0.0.1')

            if self.options['lunkwill.port'] is None:
                self.options['lunkwill.port'] = int(environ.get(
                    'LUNKWILL_PORT', '8042'))

            logger.debug(
                "Lunkwill extension enabled: %s:%d",
                self.options['lunkwill.host'],
                self.options['lunkwill.port'])
            if uwsgi is None:
                raise RuntimeError("Lunkwill requires uWSGI stack loaded")
            if not lunkwill_rpc:
                raise RuntimeError("Lunkwill RPC missing in uWSGI stack")
            from . import lunkwill
            lunkwill.setup_pyramid(self, config)
        else:
            logger.debug("Lunkwill extension disabled")

    def client_settings(self, request):
        result = dict()

        result['support_url'] = self.env.core.support_url_view(request)
        result['company_logo'] = dict(
            enabled=self.company_logo_enabled(request),
            link=self.company_url_view(request))
        result['langages'] = []
        for locale in self.env.core.locale_available:
            try:
                babel_locale = Locale.parse(locale)
            except UnknownLocaleError:
                display_name = locale
            else:
                display_name = babel_locale.get_display_name().title()
            result['langages'].append(dict(
                display_name=display_name,
                value=locale))

        result['storage_enabled'] = self.env.core.options['storage.enabled']
        result['storage_limit'] = self.env.core.options['storage.limit']

        return result

    def maintenance(self):
        super().maintenance()
        self.cleanup()

    def cleanup(self):
        logger.info("Cleaning up sessions...")

        with transaction.manager:
            actual_date = dt.utcnow() - self.options['session.cookie.max_age']
            deleted_sessions = Session.filter(Session.last_activity < actual_date).delete()

        logger.info("Deleted: %d sessions", deleted_sessions)

    def sys_info(self):
        try:
            import uwsgi
            yield ("uWSGI", uwsgi.version.decode())
        except ImportError:
            pass

        lunkwill = self.options['lunkwill.enabled']
        yield ("Lunkwill", _("Enabled") if lunkwill else _("Disabled"))

    def backup_configure(self, config):
        super().backup_configure(config)
        config.exclude_table_data('public', Session.__tablename__)
        config.exclude_table_data('public', SessionStore.__tablename__)

    option_annotations = OptionAnnotations((
        Option('help_page.enabled', bool, default=True),
        Option('help_page.url', default="https://nextgis.com/redirect/{lang}/help/"),

        Option('favicon', default=resource_filename('nextgisweb', 'static/img/favicon.ico')),
        Option('company_url', default="https://nextgis.com"),
        Option('desktop_gis_example', default='NextGIS QGIS'),
        Option('nextgis_external_docs_links', default=True),

        Option('backup.download', bool, default=False),

        Option('session.cookie.name', str, default='ngw-sid',
               doc="Session cookie name"),
        Option('session.cookie.domain', str,
               doc="Session cookie domain name"),
        Option('session.cookie.max_age', timedelta, default=timedelta(days=7),
               doc="Session cookie max_age"),
        Option('session.activity_delta', timedelta, default=timedelta(minutes=10),
               doc="Session last activity update time delta."),

        Option('static_key', default=None),

        Option('debugtoolbar.enabled', bool),
        Option('debugtoolbar.hosts'),

        Option('legacy_locale_switcher', bool, default=False),

        Option('lunkwill.enabled', bool, default=None),
        Option('lunkwill.host', str, default=None),
        Option('lunkwill.port', int, default=None),

        Option('compression.algorithms', list, default=['br', 'gzip']),
    )) + uacompat.option_annotations
