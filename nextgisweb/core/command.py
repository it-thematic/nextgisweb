# -*- coding: utf-8 -*-
from __future__ import division, absolute_import, print_function, unicode_literals
import os
import os.path
import logging
from os.path import join as pthjoin
from datetime import datetime, timedelta
from time import sleep
from tempfile import NamedTemporaryFile, mkdtemp, mkstemp
from shutil import rmtree
from contextlib import contextmanager
from backports.tempfile import TemporaryDirectory
from zipfile import ZipFile, is_zipfile

import transaction

from .. import geojson
from ..command import Command
from ..models import DBSession

from .backup import backup, restore


logger = logging.getLogger(__name__)


@Command.registry.register
class InitializeDBCmd():
    identity = 'initialize_db'

    @classmethod
    def argparser_setup(cls, parser, env):
        parser.add_argument(
            '--drop', action="store_true", default=False,
            help="Удалить существующие объекты из БД")

    @classmethod
    def execute(cls, args, env):
        metadata = env.metadata()

        with transaction.manager:
            connection = DBSession.connection()

            if args.drop:
                metadata.drop_all(connection)

            metadata.create_all(connection)

            for comp in env.chain('initialize_db'):
                comp.initialize_db()

            # It's unclear why, but if transaction only
            # ran DDL operators, then it will not be saved
            # need to force with a cludge

            connection.execute("COMMIT")


@Command.registry.register
class WaitForServiceCommand(Command):
    identity = 'wait_for_service'

    @classmethod
    def argparser_setup(cls, parser, env):
        parser.add_argument('--timeout', type=int, default=120)

    @classmethod
    def execute(cls, args, env):
        components = [
            (comp, comp.is_service_ready())
            for comp in env._components.values()
            if hasattr(comp, 'is_service_ready')]

        messages = dict()
        def log_messages(logfunc):
            for comp, it in components:
                if messages[comp] is not None:
                    logfunc(
                        "Message from [%s]: %s",
                        comp.identity, 
                        messages[comp])


        start = datetime.now()
        timeout = start + timedelta(seconds=args.timeout)
        backoff = 1 / 8
        maxinterval = 10
        while len(components) > 0:
            nxt = []
            for comp, is_service_ready in components:
                try:
                    messages[comp] = next(is_service_ready)
                    nxt.append((comp, is_service_ready))
                except StopIteration:
                    logger.debug(
                        "Service ready for component [%s] in %0.2f seconds",
                        comp.identity, (datetime.now() - start).total_seconds())

            components = nxt
            if datetime.now() > timeout:
                log_messages(logger.error)
                logger.critical("Wait for service failed in components: {}!".format(
                    ', '.join([comp.identity for comp, it in components])))
                exit(1)

            elif len(components) > 0:
                if backoff == maxinterval:
                    log_messages(logger.info)
                    logger.info("Waiting {} seconds to retry in components: {}".format(
                        backoff, ', '.join([comp.identity for comp, it in components])))
                sleep(backoff)
                backoff = min(2 * backoff, maxinterval)


@Command.registry.register
class BackupCommand(Command):
    identity = 'backup'

    @classmethod
    def argparser_setup(cls, parser, env):
        parser.add_argument(
            '--no-zip', dest='nozip', action='store_true',
            help='use directory instead of zip-file as backup format')

        parser.add_argument(
            'target', type=str, metavar='path', nargs='?',
            help='backup destination path')

    @classmethod
    def execute(cls, args, env):
        target = args.target
        autoname = datetime.today().strftime(env.core.options['backup.filename'])
        if target is None:
            if env.core.options['backup.path']:
                target = pthjoin(env.core.options['backup.path'], autoname)
            else:
                target = NamedTemporaryFile(delete=False).name
                os.unlink(target)
                logger.warn("Backup path not set. Writing backup to temporary file %s!", target)

        if os.path.exists(target):
            raise RuntimeError("Target already exists!")

        if args.nozip:
            @contextmanager
            def tgt_context():
                tmpdir = mkdtemp(dir=os.path.split(target)[0])
                try:
                    yield tmpdir
                    logger.debug("Renaming [%s] to [%s]...", tmpdir, target)
                    os.rename(tmpdir, target)
                except Exception:
                    rmtree(tmpdir)
                    raise
                    
        else:
            @contextmanager
            def tgt_context():
                tmp_root = os.path.split(target)[0]
                with TemporaryDirectory(dir=tmp_root) as tmp_dir:
                    yield tmp_dir
                    tmp_arch = mkstemp(dir=tmp_root)[1]
                    os.unlink(tmp_arch)
                    try:
                        cls.compress(tmp_dir, tmp_arch)
                        logger.debug("Renaming [%s] to [%s]...", tmp_arch, target)
                        os.rename(tmp_arch, target)
                    except Exception:
                        os.unlink(tmp_arch)
                        raise

        with tgt_context() as tgt:
            backup(env, tgt)

        print(target)

    @classmethod
    def compress(cls, src, dst):
        logger.debug("Compressing '%s' to '%s'...", src, dst)
        with ZipFile(dst, 'w', allowZip64=True) as zipf:
            for root, dirs, files in os.walk(src):
                zipf.write(root, os.path.relpath(root, src))
                for fn in files:
                    filename = os.path.join(root, fn)
                    if os.path.isfile(filename):
                        arcname = os.path.join(os.path.relpath(root, src), fn)
                        zipf.write(filename, arcname)


@Command.registry.register
class RestoreCommand(Command):
    identity = 'restore'

    @classmethod
    def argparser_setup(cls, parser, env):
        parser.add_argument(
            'source', type=str, metavar='path',
            help="Исходный файл или директория с резервной копией для"
            + " восстановления")  # NOQA: W503

    @classmethod
    def execute(cls, args, env):
        if is_zipfile(args.source):
            @contextmanager
            def src_context():
                with TemporaryDirectory() as tmpdir:
                    cls.decompress(args.source, tmpdir)
                    yield tmpdir
        else:
            @contextmanager
            def src_context():
                yield args.source

        with src_context() as src:
            restore(env, src)

    @classmethod
    def decompress(cls, src, dst):
        logger.debug("Decompressing '%s' to '%s'...", src, dst)
        with ZipFile(src, 'r') as zipf:
            zipf.extractall(dst)


@Command.registry.register
class MaintenanceCommand(Command):
    identity = 'maintenance'

    @classmethod
    def argparser_setup(cls, parser, env):
        pass

    @classmethod
    def execute(cls, args, env):
        for comp in env.chain('maintenance'):
            logger.debug("Maintenance for component: %s...", comp.identity)
            comp.maintenance()


@Command.registry.register
class DumpConfigCommand(Command):
    identity = 'dump_config'

    @classmethod
    def argparser_setup(cls, parser, env):
        pass

    @classmethod
    def execute(cls, args, env):
        for comp in env.chain('initialize'):
            sprint = False
            for k, v in comp.options._options.items():
                if not sprint:
                    print('[{}]'.format(comp.identity))
                    sprint = True
                print("{} = {}".format(k, v))


@Command.registry.register
class StatisticsCommand(Command):
    identity = 'statistics'

    @classmethod
    def argparser_setup(cls, parser, env):
        pass

    @classmethod
    def execute(cls, args, env):
        result = dict()
        for comp in env._components.values():
            if hasattr(comp, 'query_stat'):
                result[comp.identity] = comp.query_stat()

        print(geojson.dumps(result, ensure_ascii=False, indent=2).encode('utf-8'))
