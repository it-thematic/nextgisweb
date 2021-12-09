/*** {
    "revision": "327f0198", "parents": ["2cee4e63"],
    "date": "2021-11-26T15:35:50",
    "message": "add field to enable search in layer"
} ***/

-- TODO: Write code here and remove this placeholder line!
ALTER TABLE public.webmap_item ADD layer_search boolean NOT NULL DEFAULT True;