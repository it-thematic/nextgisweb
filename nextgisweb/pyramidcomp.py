# -*- coding: utf-8 -*-
import sys
from hashlib import md5
from StringIO import StringIO

from pyramid.config import Configurator
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.httpexceptions import HTTPForbidden

import pyramid_tm
import pyramid_mako

from .component import Component
from . import dynmenu as dm


def viewargs(**kw):

    def wrap(f):

        def wrapped(request, *args, **kwargs):
            return f(request, *args, **kwargs)

        wrapped.__name__ = 'args(%s)' % f.__name__
        wrapped.__viewargs__ = kw

        return wrapped

    return wrap


class RequestMethodPredicate(object):
    def __init__(self, val, config):
        self.val = val

    def text(self):
        return 'method = %s' % (self.val,)

    phash = text

    def __call__(self, context, request):
        return getattr(request, 'method', None) == self.val


class JsonPredicate(object):
    target = ('application/json', )
    test = (
        'text/html',
        'application/xhtml+xml',
        'application/xml'
    )

    def __init__(self, val, config):
        self.val = val

    def text(self):
        return 'json'

    phash = text

    def __call__(self, context, request):
        return self.val and (
            request.accept.best_match(self.target + self.test) in self.target
            or request.GET.get('format', None) == 'json')


class ClientRoutePredicate(object):
    def __init__(self, val, config):
        self.val = val

    def text(self):
        return 'client'

    phash = text

    def __call__(self, context, request):
        return True


class RouteHelper(object):

    def __init__(self, name, config):
        self.config = config
        self.name = name

    def add_view(self, view=None, **kwargs):
        if 'route_name' not in kwargs:
            kwargs['route_name'] = self.name

        self.config.add_view(view=view, **kwargs)
        return self


class ExtendedConfigurator(Configurator):

    def add_route(self, name, pattern=None, **kwargs):
        """ Расширенное добавление маршрута

        Синтаксический сахар, позволяющий записать часто встречающуюся
        конструкцию вида:

            config.add_route('foo', '/foo')
            config.add_view(foo_get, route_name='foo', request_method='GET')
            config.add_view(foo_post, route_name='foo', request_method='POST')


        Более компактным способом:

            config.add_route('foo', '/foo') \
                .add_view(foo_get, request_method='GET') \
                .add_view(foo_post, request_method='POST')

        """

        super(ExtendedConfigurator, self).add_route(name, pattern=pattern, **kwargs)
        return RouteHelper(name, self)

    def add_view(self, view=None, **kwargs):
        vargs = getattr(view, '__viewargs__', None)
        if vargs:
            kwargs = dict(vargs, **kwargs)

        super(ExtendedConfigurator, self).add_view(view=view, **kwargs)


@Component.registry.register
class PyramidComponent(Component):
    identity = 'pyramid'

    def make_app(self, settings=None):
        settings = dict(self._settings, **settings)

        settings['mako.directories'] = 'nextgisweb:templates/'

        config = ExtendedConfigurator(settings=settings)

        config.add_route_predicate('client', ClientRoutePredicate)

        config.add_view_predicate('method', RequestMethodPredicate)
        config.add_view_predicate('json', JsonPredicate)

        # возможность доступа к Env через request.env
        config.set_request_property(lambda (req): self._env, 'env')

        config.include(pyramid_tm)
        config.include(pyramid_mako)

        assert 'secret' in settings, 'Secret not set!'
        authn_policy = AuthTktAuthenticationPolicy(secret=settings['secret'])
        config.set_authentication_policy(authn_policy)

        authz_policy = ACLAuthorizationPolicy()
        config.set_authorization_policy(authz_policy)

        config.add_route('home', '/') \
            .add_view('nextgisweb.views.home')

        # Чтобы не приходилось вручную чистить кеш статики, сделаем
        # так, чтобы у них всегда были разные URL. В качестве ключа
        # используем хеш md5 от всех установленных в окружении пакетов,
        # который можно вытянуть через pip freeze. Так же pip freeze
        # вместе с версиями возвращает текущий коммит, для пакетов из
        # VCS, что тоже полезно.

        # Наверное это можно как-то получше сделать, но делаем так:
        # перенаправляем sys.stdout в StringIO, запускаем pip freeze и
        # затем возвращаем sys.stdout на место.

        stdout = sys.stdout
        static_key = ''

        try:
            import pip
            buf = StringIO()
            sys.stdout = buf
            pip.main(['freeze', ])
            h = md5()
            h.update(buf.getvalue())
            static_key = '/' + h.hexdigest()

        finally:
            sys.stdout = stdout

        config.add_static_view('/static%s/asset' % static_key, 'static', cache_max_age=3600)
        config.add_route('amd_package', '/static%s/amd/*subpath' % static_key) \
            .add_view('nextgisweb.views.amd_package')

        for comp in self._env.chain('setup_pyramid'):
            comp.setup_pyramid(config)

        # TODO: не лезть в приватные переменные _env
        for comp in self._env._components.itervalues():
            comp.__class__.setup_routes(config)

        return config

    def setup_pyramid(self, config):

        def settings(request):
            comp = self.env._components[request.GET['component']]
            return comp.client_settings(request)

        config.add_route('pyramid.settings', '/settings') \
            .add_view(settings, renderer='json')

        def routes(request):
            result = dict()
            introspector = request.registry.introspector
            for itm in introspector.get_category('routes'):
                route = itm['introspectable']['object']
                for p in route.predicates:
                    if isinstance(p, ClientRoutePredicate):
                        result[route.name] = dict(
                            pattern=route.generate(dict(
                                [(k, '__%s__' % k)
                                 for k in p.val])),
                            keys=p.val)

            return result

        config.add_route('pyramid.routes', '/pyramid/routes') \
            .add_view(routes, renderer='json', json=True)

        def control_panel(request):
            if not request.user.is_administrator:
                raise HTTPForbidden()

            return dict(title=u"Панель управления",
                        control_panel=self.control_panel)

        config.add_route('pyramid.control_panel', '/control-panel') \
            .add_view(control_panel, renderer="pyramid/control_panel.mako")

        self.control_panel = dm.DynMenu()

    settings_info = (
        dict(key='secret', desc=u"Ключ, используемый для шифрования cookies"),
    )
