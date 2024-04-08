import zipfile
from typing import Tuple
from osgeo import gdal, gdalconst


def read_dataset(filename: str, **kwargs) -> Tuple[gdal.Dataset, str]:
    """
    Read a GDAL dataset from a file.

    Parameters
    ----------
    filename : str
        Path to the file.

    Returns
    -------
    Tuple[gdal.Dataset, str]
        A tuple of the GDAL dataset and the filename.
    """
    inner_filename = filename
    gdalds = None
    if not zipfile.is_zipfile(filename):
        gdalds = gdal.OpenEx(filename, gdalconst.GA_ReadOnly, **kwargs)
    else:
        with zipfile.ZipFile(filename) as fzip:
            for zipfn in fzip.namelist():
                inner_filename = ('/vsizip/{%s}/%s' % (filename, zipfn))
                gdalds = gdal.OpenEx(inner_filename, gdalconst.GA_ReadOnly, **kwargs)
                if gdalds is not None:
                    break
    if gdalds is None:
        return gdal.Open(filename, gdalconst.GA_ReadOnly), filename

    return gdalds, inner_filename
