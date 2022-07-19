/*** { "revision": "37141d15" } ***/

-- TODO: Write code here and remove this placeholder line!
ALTER TABLE webmap_item ADD COLUMN IF NOT EXISTS layer_search boolean NOT NULL DEFAULT True;