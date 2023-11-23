/// <reference types="dojo/dijit" />

import type Feature from "ol/Feature";

import type WebmapStore from "../store";

import type { DisplayConfig } from "./DisplayConfig";
import type { DisplayMap } from "./DisplayMap";
import type { WebmapLayer } from "./WebmapLayer";

export * from "./DisplayConfig";
export * from "./WebmapLayer";

interface DojoDisplayIdentifyPopup {
    widget?: DojoDisplayIdentify;
}
interface DojoDisplayIdentify {
    _popup: DojoDisplayIdentifyPopup;
    reset: () => void;
}

export interface HighlightFeatureData {
    geom: string;
    featureId: number;
    layerId: number;
}

export interface FeatureHighlighter {
    highlightFeature: (data: HighlightFeatureData) => void;
    getHighlighted: () => Feature[];
    unhighlightFeature: (filter: (feature: Feature) => boolean) => void;
}

export interface DojoItem extends HTMLElement {
    set: (key: string, value: unknown) => void;
    domNode: HTMLElement;
    on?: (eventName: string, callback: (panel: PanelDojoItem) => void) => void;
    addChild: (child: DojoItem) => void;
    get: (val: string) => unknown;
}

export type StoreItem = dojo.data.api.Item;

export interface WebmapItem {
    checked: boolean;
    id: number;
    identifiable: boolean;
    label: string;
    layerId: number;
    position: unknown;
    styleId: number;
    type: string;
    visibility: boolean;
}

export interface CustomItemFileWriteStore extends dojo.data.ItemFileWriteStore {
    dumpItem: (item: StoreItem) => WebmapItem;
}

export interface DojoDisplay extends dijit._WidgetBase {
    identify: DojoDisplayIdentify;
    featureHighlighter: FeatureHighlighter;
    map: DisplayMap;
    mapContainer: dijit.layout.BorderContainer;
    displayProjection: string;
    config: DisplayConfig;
    itemStore: CustomItemFileWriteStore;
    webmapStore: WebmapStore;
    /**
     * @deprecated use webmapStore.getlayers() instead
     */
    _layers: Record<number, WebmapLayer>;
}

export interface PanelClsParams {
    display: DojoDisplay;
    menuIcon: string;
    name: string;
    order: number;
    title: string;
    splitter: boolean;
}

export interface PanelDojoItem extends DojoItem {
    name: string;
    menuIcon?: string;
    title: string;

    order?: number;
    cls?: new (params: PanelClsParams) => PanelDojoItem;
    params: PanelClsParams;

    isFullWidth?: boolean;
    show: () => void;
    hide: () => void;
}
