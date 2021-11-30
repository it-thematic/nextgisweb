/*** {
    "revision": "32b6ed04", "parents": ["327f0198"],
    "date": "2021-12-07T13:23:34",
    "message": "add field to enable click on layer"
} ***/

-- TODO: Write code here and remove this placeholder line!
ALTER TABLE public.webmap_item ADD layer_click boolean NOT NULL DEFAULT FALSE;