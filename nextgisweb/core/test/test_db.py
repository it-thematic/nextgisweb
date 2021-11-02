from distutils.version import LooseVersion

from nextgisweb.models import DBSession


def test_postgres_version(ngw_txn):
    """ Useless PostgreSQL version check """

    version = LooseVersion(DBSession.execute(
        'SHOW server_version').scalar())
    assert version >= LooseVersion('9.3')


def test_postgis_version(ngw_txn):
    """ Useless PostgreGIS version check """

    version = LooseVersion(DBSession.execute(
        'SELECT PostGIS_Lib_Version()').scalar())
    assert version >= LooseVersion('2.1.2')
