ALTER TABLE public.vector_layer
    ADD COLUMN feature_oid_field_id INTEGER;

ALTER TABLE public.vector_layer
    ADD CONSTRAINT vector_layer_feature_oid_feild_id_fkey FOREIGN KEY (feature_oid_field_id)
    REFERENCES public.layer_field_vector_layer (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

ALTER TABLE public.postgis_layer
    ADD COLUMN feature_oid_field_id INTEGER;

ALTER TABLE public.postgis_layer
    ADD CONSTRAINT postgis_layer_feature_oid_feild_id_fkey FOREIGN KEY (feature_oid_field_id)
    REFERENCES public.layer_field_postgis_layer (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;