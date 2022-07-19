/*** {
    "revision": "37141d15", "parents": ["33d90e2c"],
    "date": "2022-07-13T11:39:52",
    "message": "remove field to enable search in layer"
} ***/

-- TODO: Write code here and remove this placeholder line!
ALTER TABLE webmap_item DROP COLUMN IF EXISTS layer_search;
