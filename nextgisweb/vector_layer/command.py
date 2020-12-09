# -*- coding: utf-8 -*-
from __future__ import division, absolute_import, print_function, unicode_literals
import logging

from sqlalchemy.sql import text as literal_sql

from ..command import Command
from ..models import DBSession

from .model import SCHEMA


_logger = logging.getLogger(__name__)


@Command.registry.register
class CleanupOrhpanedTablesCommand():
    identity = 'vector_layer.cleanup_orphaned_tables'

    @classmethod
    def argparser_setup(cls, parser, env):
        parser.add_argument(
            '--confirm', action='store_true', default=False,
            help="Actually deletes orphaned tables"
        )
        parser.add_argument(
            '--table-per-transaction', dest='table_per_txn', action='store_true', default=False,
            help='Drop one table per transaction')

    @classmethod
    def execute(cls, args, env):
        con = DBSession.connection()

        regexp = r'^layer_[0-9a-f]{32}$'

        base_query = '''
            SELECT t.table_name, v.id, (v.id IS NULL) AS orphan
            FROM information_schema.tables t
            LEFT JOIN public.vector_layer v ON 'layer_' || v.tbl_uuid = t.table_name
            WHERE t.table_schema = :schema AND t.table_name ~ :regexp
        '''

        total, orphan = con.execute(literal_sql('''
            SELECT COUNT(*), COUNT(*) - COUNT(base.id)
            FROM ( %s ) base
        ''' % base_query), schema=SCHEMA, regexp=regexp).fetchone()

        _logger.info("%d tables found, %d orphan (schema = '%s', regexp = '%s')",
                     total, orphan, SCHEMA, regexp)

        result = con.execute(literal_sql('''
            SELECT base.table_name, base.id
            FROM ( %s ) base
            WHERE base.orphan
        ''' % base_query), schema=SCHEMA, regexp=regexp)

        if not args.confirm:
            return

        if not args.table_per_txn:
            con.execute('BEGIN')

        count = 0
        try:
            for row in result:
                if args.table_per_txn:
                    con.execute('BEGIN')

                if row['id'] is not None:
                    raise ValueError("Resource id should be empty!")

                drop_query = 'DROP TABLE "%s"."%s"' % (SCHEMA, row['table_name'])
                _logger.debug(drop_query)
                con.execute(drop_query)

                if args.table_per_txn:
                    con.execute('COMMIT')

                count += 1
        except Exception:
            con.execute('ROLLBACK')
            raise
        else:
            if not args.table_per_txn:
                con.execute('COMMIT')
        finally:
            _logger.info('%d orphaned tables deleted', count)
