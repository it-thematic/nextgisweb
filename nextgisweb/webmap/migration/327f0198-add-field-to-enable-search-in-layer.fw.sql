/*** {
    "revision": "327f0198", "parents": ["3206493e"],
    "date": "2021-11-26T15:35:50",
    "message": "add field to enable search in layer"
} ***/

-- TODO: Write code here and remove this placeholder line!
ALTER TABLE webmap_item ADD COLUMN layer_search boolean NOT NULL DEFAULT True;