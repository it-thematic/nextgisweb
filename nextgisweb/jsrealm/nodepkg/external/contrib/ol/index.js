import $ol$AssertionError from './ol/AssertionError.js';
import $ol$Collection, {CollectionEvent as _ol_Collection$CollectionEvent} from './ol/Collection.js';
import $ol$DataTile from './ol/DataTile.js';
import $ol$Disposable from './ol/Disposable.js';
import $ol$Feature, {createStyleFunction as _ol_Feature$createStyleFunction} from './ol/Feature.js';
import $ol$Geolocation from './ol/Geolocation.js';
import $ol$Image, {listenImage as _ol_Image$listenImage} from './ol/Image.js';
import $ol$ImageBase from './ol/ImageBase.js';
import $ol$ImageCanvas from './ol/ImageCanvas.js';
import $ol$ImageTile from './ol/ImageTile.js';
import $ol$Kinetic from './ol/Kinetic.js';
import $ol$Map from './ol/Map.js';
import $ol$MapBrowserEvent from './ol/MapBrowserEvent.js';
import $ol$MapBrowserEventHandler from './ol/MapBrowserEventHandler.js';
import $ol$MapEvent from './ol/MapEvent.js';
import $ol$Object, {ObjectEvent as _ol_Object$ObjectEvent} from './ol/Object.js';
import $ol$Observable, {unByKey as _ol_Observable$unByKey} from './ol/Observable.js';
import $ol$Overlay from './ol/Overlay.js';
import $ol$PluggableMap from './ol/PluggableMap.js';
import $ol$Tile from './ol/Tile.js';
import $ol$TileCache from './ol/TileCache.js';
import $ol$TileQueue, {getTilePriority as _ol_TileQueue$getTilePriority} from './ol/TileQueue.js';
import $ol$TileRange, {createOrUpdate as _ol_TileRange$createOrUpdate} from './ol/TileRange.js';
import $ol$VectorRenderTile from './ol/VectorRenderTile.js';
import $ol$VectorTile from './ol/VectorTile.js';
import $ol$View, {
    createCenterConstraint as _ol_View$createCenterConstraint,
    createResolutionConstraint as _ol_View$createResolutionConstraint,
    createRotationConstraint as _ol_View$createRotationConstraint,
    isNoopAnimation as _ol_View$isNoopAnimation
} from './ol/View.js';
import {
    binarySearch as _ol_array$binarySearch,
    equals as _ol_array$equals,
    extend as _ol_array$extend,
    find as _ol_array$find,
    findIndex as _ol_array$findIndex,
    includes as _ol_array$includes,
    isSorted as _ol_array$isSorted,
    linearFindNearest as _ol_array$linearFindNearest,
    numberSafeCompareFunction as _ol_array$numberSafeCompareFunction,
    remove as _ol_array$remove,
    reverseSubArray as _ol_array$reverseSubArray,
    stableSort as _ol_array$stableSort
} from './ol/array.js';
import {assert as _ol_asserts$assert} from './ol/asserts.js';
import {
    createExtent as _ol_centerconstraint$createExtent,
    none as _ol_centerconstraint$none
} from './ol/centerconstraint.js';
import {
    asArray as _ol_color$asArray,
    asString as _ol_color$asString,
    fromString as _ol_color$fromString,
    isStringColor as _ol_color$isStringColor,
    normalize as _ol_color$normalize,
    toString as _ol_color$toString
} from './ol/color.js';
import {asColorLike as _ol_colorlike$asColorLike} from './ol/colorlike.js';
import {defaults as _ol_control$defaults} from './ol/control.js';
import {
    add as _ol_coordinate$add,
    closestOnCircle as _ol_coordinate$closestOnCircle,
    closestOnSegment as _ol_coordinate$closestOnSegment,
    createStringXY as _ol_coordinate$createStringXY,
    degreesToStringHDMS as _ol_coordinate$degreesToStringHDMS,
    distance as _ol_coordinate$distance,
    equals as _ol_coordinate$equals,
    format as _ol_coordinate$format,
    getWorldsAway as _ol_coordinate$getWorldsAway,
    rotate as _ol_coordinate$rotate,
    scale as _ol_coordinate$scale,
    squaredDistance as _ol_coordinate$squaredDistance,
    squaredDistanceToSegment as _ol_coordinate$squaredDistanceToSegment,
    toStringHDMS as _ol_coordinate$toStringHDMS,
    toStringXY as _ol_coordinate$toStringXY,
    wrapX as _ol_coordinate$wrapX
} from './ol/coordinate.js';
import {
    CLASS_COLLAPSED as _ol_css$CLASS_COLLAPSED,
    CLASS_CONTROL as _ol_css$CLASS_CONTROL,
    CLASS_HIDDEN as _ol_css$CLASS_HIDDEN,
    CLASS_SELECTABLE as _ol_css$CLASS_SELECTABLE,
    CLASS_UNSELECTABLE as _ol_css$CLASS_UNSELECTABLE,
    CLASS_UNSUPPORTED as _ol_css$CLASS_UNSUPPORTED,
    cssOpacity as _ol_css$cssOpacity,
    getFontParameters as _ol_css$getFontParameters
} from './ol/css.js';
import {
    createCanvasContext2D as _ol_dom$createCanvasContext2D,
    outerHeight as _ol_dom$outerHeight,
    outerWidth as _ol_dom$outerWidth,
    removeChildren as _ol_dom$removeChildren,
    removeNode as _ol_dom$removeNode,
    replaceChildren as _ol_dom$replaceChildren,
    replaceNode as _ol_dom$replaceNode
} from './ol/dom.js';
import {
    easeIn as _ol_easing$easeIn,
    easeOut as _ol_easing$easeOut,
    inAndOut as _ol_easing$inAndOut,
    linear as _ol_easing$linear,
    upAndDown as _ol_easing$upAndDown
} from './ol/easing.js';
import {
    listen as _ol_events$listen,
    listenOnce as _ol_events$listenOnce,
    unlistenByKey as _ol_events$unlistenByKey
} from './ol/events.js';
import {
    applyTransform as _ol_extent$applyTransform,
    approximatelyEquals as _ol_extent$approximatelyEquals,
    boundingExtent as _ol_extent$boundingExtent,
    buffer as _ol_extent$buffer,
    clone as _ol_extent$clone,
    closestSquaredDistanceXY as _ol_extent$closestSquaredDistanceXY,
    containsCoordinate as _ol_extent$containsCoordinate,
    containsExtent as _ol_extent$containsExtent,
    containsXY as _ol_extent$containsXY,
    coordinateRelationship as _ol_extent$coordinateRelationship,
    createEmpty as _ol_extent$createEmpty,
    createOrUpdate as _ol_extent$createOrUpdate,
    createOrUpdateEmpty as _ol_extent$createOrUpdateEmpty,
    createOrUpdateFromCoordinate as _ol_extent$createOrUpdateFromCoordinate,
    createOrUpdateFromCoordinates as _ol_extent$createOrUpdateFromCoordinates,
    createOrUpdateFromFlatCoordinates as _ol_extent$createOrUpdateFromFlatCoordinates,
    createOrUpdateFromRings as _ol_extent$createOrUpdateFromRings,
    equals as _ol_extent$equals,
    extend as _ol_extent$extend,
    extendCoordinate as _ol_extent$extendCoordinate,
    extendCoordinates as _ol_extent$extendCoordinates,
    extendFlatCoordinates as _ol_extent$extendFlatCoordinates,
    extendRings as _ol_extent$extendRings,
    extendXY as _ol_extent$extendXY,
    forEachCorner as _ol_extent$forEachCorner,
    getArea as _ol_extent$getArea,
    getBottomLeft as _ol_extent$getBottomLeft,
    getBottomRight as _ol_extent$getBottomRight,
    getCenter as _ol_extent$getCenter,
    getCorner as _ol_extent$getCorner,
    getEnlargedArea as _ol_extent$getEnlargedArea,
    getForViewAndSize as _ol_extent$getForViewAndSize,
    getHeight as _ol_extent$getHeight,
    getIntersection as _ol_extent$getIntersection,
    getIntersectionArea as _ol_extent$getIntersectionArea,
    getMargin as _ol_extent$getMargin,
    getSize as _ol_extent$getSize,
    getTopLeft as _ol_extent$getTopLeft,
    getTopRight as _ol_extent$getTopRight,
    getWidth as _ol_extent$getWidth,
    intersects as _ol_extent$intersects,
    intersectsSegment as _ol_extent$intersectsSegment,
    isEmpty as _ol_extent$isEmpty,
    returnOrUpdate as _ol_extent$returnOrUpdate,
    scaleFromCenter as _ol_extent$scaleFromCenter,
    wrapX as _ol_extent$wrapX
} from './ol/extent.js';
import {
    loadFeaturesXhr as _ol_featureloader$loadFeaturesXhr,
    setWithCredentials as _ol_featureloader$setWithCredentials,
    xhr as _ol_featureloader$xhr
} from './ol/featureloader.js';
import {
    FALSE as _ol_functions$FALSE,
    memoizeOne as _ol_functions$memoizeOne,
    toPromise as _ol_functions$toPromise,
    TRUE as _ol_functions$TRUE,
    VOID as _ol_functions$VOID
} from './ol/functions.js';
import {
    DEVICE_PIXEL_RATIO as _ol_has$DEVICE_PIXEL_RATIO,
    FIREFOX as _ol_has$FIREFOX,
    IMAGE_DECODE as _ol_has$IMAGE_DECODE,
    MAC as _ol_has$MAC,
    PASSIVE_EVENT_LISTENERS as _ol_has$PASSIVE_EVENT_LISTENERS,
    SAFARI as _ol_has$SAFARI,
    WEBKIT as _ol_has$WEBKIT,
    WORKER_OFFSCREEN_CANVAS as _ol_has$WORKER_OFFSCREEN_CANVAS
} from './ol/has.js';
import {defaults as _ol_interaction$defaults} from './ol/interaction.js';
import {
    all as _ol_loadingstrategy$all,
    bbox as _ol_loadingstrategy$bbox,
    tile as _ol_loadingstrategy$tile
} from './ol/loadingstrategy.js';
import {
    ceil as _ol_math$ceil,
    clamp as _ol_math$clamp,
    cosh as _ol_math$cosh,
    floor as _ol_math$floor,
    lerp as _ol_math$lerp,
    log2 as _ol_math$log2,
    modulo as _ol_math$modulo,
    round as _ol_math$round,
    solveLinearSystem as _ol_math$solveLinearSystem,
    squaredDistance as _ol_math$squaredDistance,
    squaredSegmentDistance as _ol_math$squaredSegmentDistance,
    toDegrees as _ol_math$toDegrees,
    toFixed as _ol_math$toFixed,
    toRadians as _ol_math$toRadians
} from './ol/math.js';
import {
    ClientError as _ol_net$ClientError,
    getJSON as _ol_net$getJSON,
    jsonp as _ol_net$jsonp,
    overrideXHR as _ol_net$overrideXHR,
    resolveUrl as _ol_net$resolveUrl,
    ResponseError as _ol_net$ResponseError,
    restoreXHR as _ol_net$restoreXHR
} from './ol/net.js';
import {
    assign as _ol_obj$assign,
    clear as _ol_obj$clear,
    getValues as _ol_obj$getValues,
    isEmpty as _ol_obj$isEmpty
} from './ol/obj.js';
import {
    addCommon as _ol_proj$addCommon,
    addCoordinateTransforms as _ol_proj$addCoordinateTransforms,
    addEquivalentProjections as _ol_proj$addEquivalentProjections,
    addEquivalentTransforms as _ol_proj$addEquivalentTransforms,
    addProjection as _ol_proj$addProjection,
    addProjections as _ol_proj$addProjections,
    clearAllProjections as _ol_proj$clearAllProjections,
    clearUserProjection as _ol_proj$clearUserProjection,
    cloneTransform as _ol_proj$cloneTransform,
    createProjection as _ol_proj$createProjection,
    createSafeCoordinateTransform as _ol_proj$createSafeCoordinateTransform,
    createTransformFromCoordinateTransform as _ol_proj$createTransformFromCoordinateTransform,
    equivalent as _ol_proj$equivalent,
    fromLonLat as _ol_proj$fromLonLat,
    fromUserCoordinate as _ol_proj$fromUserCoordinate,
    fromUserExtent as _ol_proj$fromUserExtent,
    fromUserResolution as _ol_proj$fromUserResolution,
    get as _ol_proj$get,
    getPointResolution as _ol_proj$getPointResolution,
    getTransform as _ol_proj$getTransform,
    getTransformFromProjections as _ol_proj$getTransformFromProjections,
    getUserProjection as _ol_proj$getUserProjection,
    identityTransform as _ol_proj$identityTransform,
    setUserProjection as _ol_proj$setUserProjection,
    toLonLat as _ol_proj$toLonLat,
    toUserCoordinate as _ol_proj$toUserCoordinate,
    toUserExtent as _ol_proj$toUserExtent,
    toUserResolution as _ol_proj$toUserResolution,
    transform as _ol_proj$transform,
    transformExtent as _ol_proj$transformExtent,
    transformWithProjections as _ol_proj$transformWithProjections,
    useGeographic as _ol_proj$useGeographic
} from './ol/proj.js';
import {
    getRenderPixel as _ol_render$getRenderPixel,
    getVectorContext as _ol_render$getVectorContext,
    toContext as _ol_render$toContext
} from './ol/render.js';
import {
    calculateSourceExtentResolution as _ol_reproj$calculateSourceExtentResolution,
    calculateSourceResolution as _ol_reproj$calculateSourceResolution,
    render as _ol_reproj$render
} from './ol/reproj.js';
import {
    createMinMaxResolution as _ol_resolutionconstraint$createMinMaxResolution,
    createSnapToPower as _ol_resolutionconstraint$createSnapToPower,
    createSnapToResolutions as _ol_resolutionconstraint$createSnapToResolutions
} from './ol/resolutionconstraint.js';
import {
    createSnapToN as _ol_rotationconstraint$createSnapToN,
    createSnapToZero as _ol_rotationconstraint$createSnapToZero,
    disable as _ol_rotationconstraint$disable,
    none as _ol_rotationconstraint$none
} from './ol/rotationconstraint.js';
import {
    buffer as _ol_size$buffer,
    hasArea as _ol_size$hasArea,
    scale as _ol_size$scale,
    toSize as _ol_size$toSize
} from './ol/size.js';
import {
    DEFAULT_RADIUS as _ol_sphere$DEFAULT_RADIUS,
    getArea as _ol_sphere$getArea,
    getDistance as _ol_sphere$getDistance,
    getLength as _ol_sphere$getLength,
    offset as _ol_sphere$offset
} from './ol/sphere.js';
import {compareVersions as _ol_string$compareVersions, padNumber as _ol_string$padNumber} from './ol/string.js';
import {
    createOrUpdate as _ol_tilecoord$createOrUpdate,
    fromKey as _ol_tilecoord$fromKey,
    getCacheKeyForTileKey as _ol_tilecoord$getCacheKeyForTileKey,
    getKey as _ol_tilecoord$getKey,
    getKeyZXY as _ol_tilecoord$getKeyZXY,
    hash as _ol_tilecoord$hash,
    withinExtentAndZ as _ol_tilecoord$withinExtentAndZ
} from './ol/tilecoord.js';
import {
    createForExtent as _ol_tilegrid$createForExtent,
    createForProjection as _ol_tilegrid$createForProjection,
    createXYZ as _ol_tilegrid$createXYZ,
    extentFromProjection as _ol_tilegrid$extentFromProjection,
    getForProjection as _ol_tilegrid$getForProjection,
    wrapX as _ol_tilegrid$wrapX
} from './ol/tilegrid.js';
import {
    createFromTemplate as _ol_tileurlfunction$createFromTemplate,
    createFromTemplates as _ol_tileurlfunction$createFromTemplates,
    createFromTileUrlFunctions as _ol_tileurlfunction$createFromTileUrlFunctions,
    expandUrl as _ol_tileurlfunction$expandUrl,
    nullTileUrlFunction as _ol_tileurlfunction$nullTileUrlFunction
} from './ol/tileurlfunction.js';
import {
    apply as _ol_transform$apply,
    compose as _ol_transform$compose,
    composeCssTransform as _ol_transform$composeCssTransform,
    create as _ol_transform$create,
    determinant as _ol_transform$determinant,
    invert as _ol_transform$invert,
    makeInverse as _ol_transform$makeInverse,
    makeScale as _ol_transform$makeScale,
    multiply as _ol_transform$multiply,
    reset as _ol_transform$reset,
    rotate as _ol_transform$rotate,
    scale as _ol_transform$scale,
    set as _ol_transform$set,
    setFromArray as _ol_transform$setFromArray,
    toString as _ol_transform$toString,
    translate as _ol_transform$translate
} from './ol/transform.js';
import {appendParams as _ol_uri$appendParams} from './ol/uri.js';
import {abstract as _ol_util$abstract, getUid as _ol_util$getUid, VERSION as _ol_util$VERSION} from './ol/util.js';
import {
    ARRAY_BUFFER as _ol_webgl$ARRAY_BUFFER,
    DYNAMIC_DRAW as _ol_webgl$DYNAMIC_DRAW,
    ELEMENT_ARRAY_BUFFER as _ol_webgl$ELEMENT_ARRAY_BUFFER,
    FLOAT as _ol_webgl$FLOAT,
    getContext as _ol_webgl$getContext,
    getSupportedExtensions as _ol_webgl$getSupportedExtensions,
    STATIC_DRAW as _ol_webgl$STATIC_DRAW,
    STREAM_DRAW as _ol_webgl$STREAM_DRAW,
    UNSIGNED_BYTE as _ol_webgl$UNSIGNED_BYTE,
    UNSIGNED_INT as _ol_webgl$UNSIGNED_INT,
    UNSIGNED_SHORT as _ol_webgl$UNSIGNED_SHORT
} from './ol/webgl.js';
import {
    createElementNS as _ol_xml$createElementNS,
    getAllTextContent as _ol_xml$getAllTextContent,
    getAllTextContent_ as _ol_xml$getAllTextContent_,
    getAttributeNS as _ol_xml$getAttributeNS,
    getDocument as _ol_xml$getDocument,
    getXMLSerializer as _ol_xml$getXMLSerializer,
    isDocument as _ol_xml$isDocument,
    makeArrayExtender as _ol_xml$makeArrayExtender,
    makeArrayPusher as _ol_xml$makeArrayPusher,
    makeArraySerializer as _ol_xml$makeArraySerializer,
    makeChildAppender as _ol_xml$makeChildAppender,
    makeObjectPropertyPusher as _ol_xml$makeObjectPropertyPusher,
    makeObjectPropertySetter as _ol_xml$makeObjectPropertySetter,
    makeReplacer as _ol_xml$makeReplacer,
    makeSequence as _ol_xml$makeSequence,
    makeSimpleNodeFactory as _ol_xml$makeSimpleNodeFactory,
    makeStructureNS as _ol_xml$makeStructureNS,
    OBJECT_PROPERTY_NODE_FACTORY as _ol_xml$OBJECT_PROPERTY_NODE_FACTORY,
    parse as _ol_xml$parse,
    parseNode as _ol_xml$parseNode,
    pushParseAndPop as _ol_xml$pushParseAndPop,
    pushSerializeAndPop as _ol_xml$pushSerializeAndPop,
    registerDocument as _ol_xml$registerDocument,
    registerXMLSerializer as _ol_xml$registerXMLSerializer,
    serialize as _ol_xml$serialize,
    XML_SCHEMA_INSTANCE_URI as _ol_xml$XML_SCHEMA_INSTANCE_URI
} from './ol/xml.js';
import $ol$webgl$Buffer, {getArrayClassForType as _ol_webgl_Buffer$getArrayClassForType} from './ol/webgl/Buffer.js';
import $ol$webgl$Helper, {
    computeAttributesStride as _ol_webgl_Helper$computeAttributesStride
} from './ol/webgl/Helper.js';
import $ol$webgl$PaletteTexture from './ol/webgl/PaletteTexture.js';
import $ol$webgl$PostProcessingPass from './ol/webgl/PostProcessingPass.js';
import $ol$webgl$RenderTarget from './ol/webgl/RenderTarget.js';
import {
    parseLiteralStyle as _ol_webgl_ShaderBuilder$parseLiteralStyle,
    ShaderBuilder as _ol_webgl_ShaderBuilder$ShaderBuilder
} from './ol/webgl/ShaderBuilder.js';
import $ol$webgl$TileTexture from './ol/webgl/TileTexture.js';
import {create as _ol_vec_mat4$create, fromTransform as _ol_vec_mat4$fromTransform} from './ol/vec/mat4.js';
import $ol$tilegrid$TileGrid from './ol/tilegrid/TileGrid.js';
import $ol$tilegrid$WMTS, {
    createFromCapabilitiesMatrixSet as _ol_tilegrid_WMTS$createFromCapabilitiesMatrixSet
} from './ol/tilegrid/WMTS.js';
import {
    DEFAULT_MAX_ZOOM as _ol_tilegrid_common$DEFAULT_MAX_ZOOM,
    DEFAULT_TILE_SIZE as _ol_tilegrid_common$DEFAULT_TILE_SIZE
} from './ol/tilegrid/common.js';
import $ol$style$Circle from './ol/style/Circle.js';
import $ol$style$Fill from './ol/style/Fill.js';
import $ol$style$Icon from './ol/style/Icon.js';
import $ol$style$IconImage, {get as _ol_style_IconImage$get} from './ol/style/IconImage.js';
import $ol$style$IconImageCache, {shared as _ol_style_IconImageCache$shared} from './ol/style/IconImageCache.js';
import $ol$style$Image from './ol/style/Image.js';
import $ol$style$RegularShape from './ol/style/RegularShape.js';
import $ol$style$Stroke from './ol/style/Stroke.js';
import $ol$style$Style, {
    createDefaultStyle as _ol_style_Style$createDefaultStyle,
    createEditingStyle as _ol_style_Style$createEditingStyle,
    toFunction as _ol_style_Style$toFunction
} from './ol/style/Style.js';
import $ol$style$Text from './ol/style/Text.js';
import {
    arrayToGlsl as _ol_style_expressions$arrayToGlsl,
    colorToGlsl as _ol_style_expressions$colorToGlsl,
    expressionToGlsl as _ol_style_expressions$expressionToGlsl,
    getStringNumberEquivalent as _ol_style_expressions$getStringNumberEquivalent,
    getValueType as _ol_style_expressions$getValueType,
    isTypeUnique as _ol_style_expressions$isTypeUnique,
    numberToGlsl as _ol_style_expressions$numberToGlsl,
    Operators as _ol_style_expressions$Operators,
    PALETTE_TEXTURE_ARRAY as _ol_style_expressions$PALETTE_TEXTURE_ARRAY,
    stringToGlsl as _ol_style_expressions$stringToGlsl,
    uniformNameForVariable as _ol_style_expressions$uniformNameForVariable
} from './ol/style/expressions.js';
import $ol$structs$LRUCache from './ol/structs/LRUCache.js';
import $ol$structs$LinkedList from './ol/structs/LinkedList.js';
import $ol$structs$PriorityQueue, {DROP as _ol_structs_PriorityQueue$DROP} from './ol/structs/PriorityQueue.js';
import $ol$structs$RBush from './ol/structs/RBush.js';
import $ol$source$BingMaps, {quadKey as _ol_source_BingMaps$quadKey} from './ol/source/BingMaps.js';
import $ol$source$CartoDB from './ol/source/CartoDB.js';
import $ol$source$Cluster from './ol/source/Cluster.js';
import $ol$source$DataTile from './ol/source/DataTile.js';
import $ol$source$GeoTIFF from './ol/source/GeoTIFF.js';
import $ol$source$IIIF from './ol/source/IIIF.js';
import $ol$source$Image, {
    defaultImageLoadFunction as _ol_source_Image$defaultImageLoadFunction,
    ImageSourceEvent as _ol_source_Image$ImageSourceEvent
} from './ol/source/Image.js';
import $ol$source$ImageArcGISRest from './ol/source/ImageArcGISRest.js';
import $ol$source$ImageCanvas from './ol/source/ImageCanvas.js';
import $ol$source$ImageMapGuide from './ol/source/ImageMapGuide.js';
import $ol$source$ImageStatic from './ol/source/ImageStatic.js';
import $ol$source$ImageWMS from './ol/source/ImageWMS.js';
import $ol$source$OGCMapTile from './ol/source/OGCMapTile.js';
import $ol$source$OGCVectorTile from './ol/source/OGCVectorTile.js';
import $ol$source$OSM, {ATTRIBUTION as _ol_source_OSM$ATTRIBUTION} from './ol/source/OSM.js';
import $ol$source$Raster, {
    newImageData as _ol_source_Raster$newImageData,
    Processor as _ol_source_Raster$Processor,
    RasterSourceEvent as _ol_source_Raster$RasterSourceEvent
} from './ol/source/Raster.js';
import $ol$source$Source from './ol/source/Source.js';
import $ol$source$Stamen from './ol/source/Stamen.js';
import $ol$source$Tile, {TileSourceEvent as _ol_source_Tile$TileSourceEvent} from './ol/source/Tile.js';
import $ol$source$TileArcGISRest from './ol/source/TileArcGISRest.js';
import $ol$source$TileDebug from './ol/source/TileDebug.js';
import $ol$source$TileImage from './ol/source/TileImage.js';
import $ol$source$TileJSON from './ol/source/TileJSON.js';
import $ol$source$TileWMS from './ol/source/TileWMS.js';
import $ol$source$UTFGrid, {CustomTile as _ol_source_UTFGrid$CustomTile} from './ol/source/UTFGrid.js';
import $ol$source$UrlTile from './ol/source/UrlTile.js';
import $ol$source$Vector, {VectorSourceEvent as _ol_source_Vector$VectorSourceEvent} from './ol/source/Vector.js';
import $ol$source$VectorTile, {
    defaultLoadFunction as _ol_source_VectorTile$defaultLoadFunction
} from './ol/source/VectorTile.js';
import $ol$source$WMTS, {optionsFromCapabilities as _ol_source_WMTS$optionsFromCapabilities} from './ol/source/WMTS.js';
import $ol$source$XYZ from './ol/source/XYZ.js';
import $ol$source$Zoomify, {CustomTile as _ol_source_Zoomify$CustomTile} from './ol/source/Zoomify.js';
import {DEFAULT_WMS_VERSION as _ol_source_common$DEFAULT_WMS_VERSION} from './ol/source/common.js';
import {
    getMapTileUrlTemplate as _ol_source_ogcTileUtil$getMapTileUrlTemplate,
    getTileSetInfo as _ol_source_ogcTileUtil$getTileSetInfo,
    getVectorTileUrlTemplate as _ol_source_ogcTileUtil$getVectorTileUrlTemplate
} from './ol/source/ogcTileUtil.js';
import $ol$reproj$Image from './ol/reproj/Image.js';
import $ol$reproj$Tile from './ol/reproj/Tile.js';
import $ol$reproj$Triangulation from './ol/reproj/Triangulation.js';
import {
    ENABLE_RASTER_REPROJECTION as _ol_reproj_common$ENABLE_RASTER_REPROJECTION,
    ERROR_THRESHOLD as _ol_reproj_common$ERROR_THRESHOLD
} from './ol/reproj/common.js';
import $ol$renderer$Composite from './ol/renderer/Composite.js';
import $ol$renderer$Layer from './ol/renderer/Layer.js';
import $ol$renderer$Map from './ol/renderer/Map.js';
import {
    defaultOrder as _ol_renderer_vector$defaultOrder,
    getSquaredTolerance as _ol_renderer_vector$getSquaredTolerance,
    getTolerance as _ol_renderer_vector$getTolerance,
    renderFeature as _ol_renderer_vector$renderFeature
} from './ol/renderer/vector.js';
import $ol$renderer$webgl$Layer, {
    colorDecodeId as _ol_renderer_webgl_Layer$colorDecodeId,
    colorEncodeId as _ol_renderer_webgl_Layer$colorEncodeId,
    getBlankImageData as _ol_renderer_webgl_Layer$getBlankImageData,
    writePointFeatureToBuffers as _ol_renderer_webgl_Layer$writePointFeatureToBuffers
} from './ol/renderer/webgl/Layer.js';
import $ol$renderer$webgl$PointsLayer from './ol/renderer/webgl/PointsLayer.js';
import $ol$renderer$webgl$TileLayer, {
    Attributes as _ol_renderer_webgl_TileLayer$Attributes,
    Uniforms as _ol_renderer_webgl_TileLayer$Uniforms
} from './ol/renderer/webgl/TileLayer.js';
import $ol$renderer$canvas$ImageLayer from './ol/renderer/canvas/ImageLayer.js';
import $ol$renderer$canvas$Layer from './ol/renderer/canvas/Layer.js';
import $ol$renderer$canvas$TileLayer from './ol/renderer/canvas/TileLayer.js';
import $ol$renderer$canvas$VectorImageLayer from './ol/renderer/canvas/VectorImageLayer.js';
import $ol$renderer$canvas$VectorLayer from './ol/renderer/canvas/VectorLayer.js';
import $ol$renderer$canvas$VectorTileLayer from './ol/renderer/canvas/VectorTileLayer.js';
import {
    IMAGE_SMOOTHING_DISABLED as _ol_renderer_canvas_common$IMAGE_SMOOTHING_DISABLED
} from './ol/renderer/canvas/common.js';
import $ol$render$Box from './ol/render/Box.js';
import $ol$render$Event from './ol/render/Event.js';
import $ol$render$Feature from './ol/render/Feature.js';
import $ol$render$VectorContext from './ol/render/VectorContext.js';
import {
    checkedFonts as _ol_render_canvas$checkedFonts,
    defaultFillStyle as _ol_render_canvas$defaultFillStyle,
    defaultFont as _ol_render_canvas$defaultFont,
    defaultLineCap as _ol_render_canvas$defaultLineCap,
    defaultLineDash as _ol_render_canvas$defaultLineDash,
    defaultLineDashOffset as _ol_render_canvas$defaultLineDashOffset,
    defaultLineJoin as _ol_render_canvas$defaultLineJoin,
    defaultLineWidth as _ol_render_canvas$defaultLineWidth,
    defaultMiterLimit as _ol_render_canvas$defaultMiterLimit,
    defaultPadding as _ol_render_canvas$defaultPadding,
    defaultStrokeStyle as _ol_render_canvas$defaultStrokeStyle,
    defaultTextAlign as _ol_render_canvas$defaultTextAlign,
    defaultTextBaseline as _ol_render_canvas$defaultTextBaseline,
    drawImageOrLabel as _ol_render_canvas$drawImageOrLabel,
    labelCache as _ol_render_canvas$labelCache,
    measureAndCacheTextWidth as _ol_render_canvas$measureAndCacheTextWidth,
    measureTextHeight as _ol_render_canvas$measureTextHeight,
    measureTextWidth as _ol_render_canvas$measureTextWidth,
    measureTextWidths as _ol_render_canvas$measureTextWidths,
    registerFont as _ol_render_canvas$registerFont,
    rotateAtOffset as _ol_render_canvas$rotateAtOffset,
    textHeights as _ol_render_canvas$textHeights
} from './ol/render/canvas.js';
import $ol$render$canvas$Builder from './ol/render/canvas/Builder.js';
import $ol$render$canvas$BuilderGroup from './ol/render/canvas/BuilderGroup.js';
import $ol$render$canvas$Executor from './ol/render/canvas/Executor.js';
import $ol$render$canvas$ExecutorGroup, {
    getPixelIndexArray as _ol_render_canvas_ExecutorGroup$getPixelIndexArray
} from './ol/render/canvas/ExecutorGroup.js';
import $ol$render$canvas$ImageBuilder from './ol/render/canvas/ImageBuilder.js';
import $ol$render$canvas$Immediate from './ol/render/canvas/Immediate.js';
import {
    beginPathInstruction as _ol_render_canvas_Instruction$beginPathInstruction,
    closePathInstruction as _ol_render_canvas_Instruction$closePathInstruction,
    fillInstruction as _ol_render_canvas_Instruction$fillInstruction,
    strokeInstruction as _ol_render_canvas_Instruction$strokeInstruction
} from './ol/render/canvas/Instruction.js';
import $ol$render$canvas$LineStringBuilder from './ol/render/canvas/LineStringBuilder.js';
import $ol$render$canvas$PolygonBuilder from './ol/render/canvas/PolygonBuilder.js';
import $ol$render$canvas$TextBuilder from './ol/render/canvas/TextBuilder.js';
import {
    createHitDetectionImageData as _ol_render_canvas_hitdetect$createHitDetectionImageData,
    HIT_DETECT_RESOLUTION as _ol_render_canvas_hitdetect$HIT_DETECT_RESOLUTION,
    hitDetect as _ol_render_canvas_hitdetect$hitDetect
} from './ol/render/canvas/hitdetect.js';
import $ol$proj$Projection from './ol/proj/Projection.js';
import {
    fromCode as _ol_proj_Units$fromCode,
    METERS_PER_UNIT as _ol_proj_Units$METERS_PER_UNIT
} from './ol/proj/Units.js';
import {
    EXTENT as _ol_proj_epsg3857$EXTENT,
    fromEPSG4326 as _ol_proj_epsg3857$fromEPSG4326,
    HALF_SIZE as _ol_proj_epsg3857$HALF_SIZE,
    MAX_SAFE_Y as _ol_proj_epsg3857$MAX_SAFE_Y,
    PROJECTIONS as _ol_proj_epsg3857$PROJECTIONS,
    RADIUS as _ol_proj_epsg3857$RADIUS,
    toEPSG4326 as _ol_proj_epsg3857$toEPSG4326,
    WORLD_EXTENT as _ol_proj_epsg3857$WORLD_EXTENT
} from './ol/proj/epsg3857.js';
import {
    EXTENT as _ol_proj_epsg4326$EXTENT,
    METERS_PER_UNIT as _ol_proj_epsg4326$METERS_PER_UNIT,
    PROJECTIONS as _ol_proj_epsg4326$PROJECTIONS,
    RADIUS as _ol_proj_epsg4326$RADIUS
} from './ol/proj/epsg4326.js';
import {register as _ol_proj_proj4$register} from './ol/proj/proj4.js';
import {
    add as _ol_proj_projections$add,
    clear as _ol_proj_projections$clear,
    get as _ol_proj_projections$get
} from './ol/proj/projections.js';
import {
    add as _ol_proj_transforms$add,
    clear as _ol_proj_transforms$clear,
    get as _ol_proj_transforms$get,
    remove as _ol_proj_transforms$remove
} from './ol/proj/transforms.js';
import $ol$layer$Base from './ol/layer/Base.js';
import $ol$layer$BaseImage from './ol/layer/BaseImage.js';
import $ol$layer$BaseTile from './ol/layer/BaseTile.js';
import $ol$layer$BaseVector from './ol/layer/BaseVector.js';
import $ol$layer$Graticule from './ol/layer/Graticule.js';
import $ol$layer$Group, {GroupEvent as _ol_layer_Group$GroupEvent} from './ol/layer/Group.js';
import $ol$layer$Heatmap from './ol/layer/Heatmap.js';
import $ol$layer$Image from './ol/layer/Image.js';
import $ol$layer$Layer, {inView as _ol_layer_Layer$inView} from './ol/layer/Layer.js';
import $ol$layer$MapboxVector, {
    getMapboxPath as _ol_layer_MapboxVector$getMapboxPath,
    normalizeGlyphsUrl as _ol_layer_MapboxVector$normalizeGlyphsUrl,
    normalizeSourceUrl as _ol_layer_MapboxVector$normalizeSourceUrl,
    normalizeSpriteUrl as _ol_layer_MapboxVector$normalizeSpriteUrl,
    normalizeStyleUrl as _ol_layer_MapboxVector$normalizeStyleUrl
} from './ol/layer/MapboxVector.js';
import $ol$layer$Tile from './ol/layer/Tile.js';
import $ol$layer$Vector from './ol/layer/Vector.js';
import $ol$layer$VectorImage from './ol/layer/VectorImage.js';
import $ol$layer$VectorTile from './ol/layer/VectorTile.js';
import $ol$layer$WebGLPoints from './ol/layer/WebGLPoints.js';
import $ol$layer$WebGLTile from './ol/layer/WebGLTile.js';
import $ol$interaction$DoubleClickZoom from './ol/interaction/DoubleClickZoom.js';
import $ol$interaction$DragAndDrop, {
    DragAndDropEvent as _ol_interaction_DragAndDrop$DragAndDropEvent
} from './ol/interaction/DragAndDrop.js';
import $ol$interaction$DragBox, {
    DragBoxEvent as _ol_interaction_DragBox$DragBoxEvent
} from './ol/interaction/DragBox.js';
import $ol$interaction$DragPan from './ol/interaction/DragPan.js';
import $ol$interaction$DragRotate from './ol/interaction/DragRotate.js';
import $ol$interaction$DragRotateAndZoom from './ol/interaction/DragRotateAndZoom.js';
import $ol$interaction$DragZoom from './ol/interaction/DragZoom.js';
import $ol$interaction$Draw, {
    createBox as _ol_interaction_Draw$createBox,
    createRegularPolygon as _ol_interaction_Draw$createRegularPolygon,
    DrawEvent as _ol_interaction_Draw$DrawEvent
} from './ol/interaction/Draw.js';
import $ol$interaction$Extent, {ExtentEvent as _ol_interaction_Extent$ExtentEvent} from './ol/interaction/Extent.js';
import $ol$interaction$Interaction, {
    pan as _ol_interaction_Interaction$pan,
    zoomByDelta as _ol_interaction_Interaction$zoomByDelta
} from './ol/interaction/Interaction.js';
import $ol$interaction$KeyboardPan from './ol/interaction/KeyboardPan.js';
import $ol$interaction$KeyboardZoom from './ol/interaction/KeyboardZoom.js';
import $ol$interaction$Modify, {ModifyEvent as _ol_interaction_Modify$ModifyEvent} from './ol/interaction/Modify.js';
import $ol$interaction$MouseWheelZoom from './ol/interaction/MouseWheelZoom.js';
import $ol$interaction$PinchRotate from './ol/interaction/PinchRotate.js';
import $ol$interaction$PinchZoom from './ol/interaction/PinchZoom.js';
import $ol$interaction$Pointer, {centroid as _ol_interaction_Pointer$centroid} from './ol/interaction/Pointer.js';
import $ol$interaction$Select, {SelectEvent as _ol_interaction_Select$SelectEvent} from './ol/interaction/Select.js';
import $ol$interaction$Snap from './ol/interaction/Snap.js';
import $ol$interaction$Translate, {
    TranslateEvent as _ol_interaction_Translate$TranslateEvent
} from './ol/interaction/Translate.js';
import $ol$geom$Circle from './ol/geom/Circle.js';
import $ol$geom$Geometry from './ol/geom/Geometry.js';
import $ol$geom$GeometryCollection from './ol/geom/GeometryCollection.js';
import $ol$geom$LineString from './ol/geom/LineString.js';
import $ol$geom$LinearRing from './ol/geom/LinearRing.js';
import $ol$geom$MultiLineString from './ol/geom/MultiLineString.js';
import $ol$geom$MultiPoint from './ol/geom/MultiPoint.js';
import $ol$geom$MultiPolygon from './ol/geom/MultiPolygon.js';
import $ol$geom$Point from './ol/geom/Point.js';
import $ol$geom$Polygon, {
    circular as _ol_geom_Polygon$circular,
    fromCircle as _ol_geom_Polygon$fromCircle,
    fromExtent as _ol_geom_Polygon$fromExtent,
    makeRegular as _ol_geom_Polygon$makeRegular
} from './ol/geom/Polygon.js';
import $ol$geom$SimpleGeometry, {
    getStrideForLayout as _ol_geom_SimpleGeometry$getStrideForLayout,
    transformGeom2D as _ol_geom_SimpleGeometry$transformGeom2D
} from './ol/geom/SimpleGeometry.js';
import {
    linearRing as _ol_geom_flat_area$linearRing,
    linearRings as _ol_geom_flat_area$linearRings,
    linearRingss as _ol_geom_flat_area$linearRingss
} from './ol/geom/flat/area.js';
import {linearRingss as _ol_geom_flat_center$linearRingss} from './ol/geom/flat/center.js';
import {
    arrayMaxSquaredDelta as _ol_geom_flat_closest$arrayMaxSquaredDelta,
    assignClosestArrayPoint as _ol_geom_flat_closest$assignClosestArrayPoint,
    assignClosestMultiArrayPoint as _ol_geom_flat_closest$assignClosestMultiArrayPoint,
    assignClosestPoint as _ol_geom_flat_closest$assignClosestPoint,
    maxSquaredDelta as _ol_geom_flat_closest$maxSquaredDelta,
    multiArrayMaxSquaredDelta as _ol_geom_flat_closest$multiArrayMaxSquaredDelta
} from './ol/geom/flat/closest.js';
import {
    linearRingContainsExtent as _ol_geom_flat_contains$linearRingContainsExtent,
    linearRingContainsXY as _ol_geom_flat_contains$linearRingContainsXY,
    linearRingsContainsXY as _ol_geom_flat_contains$linearRingsContainsXY,
    linearRingssContainsXY as _ol_geom_flat_contains$linearRingssContainsXY
} from './ol/geom/flat/contains.js';
import {
    deflateCoordinate as _ol_geom_flat_deflate$deflateCoordinate,
    deflateCoordinates as _ol_geom_flat_deflate$deflateCoordinates,
    deflateCoordinatesArray as _ol_geom_flat_deflate$deflateCoordinatesArray,
    deflateMultiCoordinatesArray as _ol_geom_flat_deflate$deflateMultiCoordinatesArray
} from './ol/geom/flat/deflate.js';
import {flipXY as _ol_geom_flat_flip$flipXY} from './ol/geom/flat/flip.js';
import {
    greatCircleArc as _ol_geom_flat_geodesic$greatCircleArc,
    meridian as _ol_geom_flat_geodesic$meridian,
    parallel as _ol_geom_flat_geodesic$parallel
} from './ol/geom/flat/geodesic.js';
import {
    inflateCoordinates as _ol_geom_flat_inflate$inflateCoordinates,
    inflateCoordinatesArray as _ol_geom_flat_inflate$inflateCoordinatesArray,
    inflateMultiCoordinatesArray as _ol_geom_flat_inflate$inflateMultiCoordinatesArray
} from './ol/geom/flat/inflate.js';
import {
    getInteriorPointOfArray as _ol_geom_flat_interiorpoint$getInteriorPointOfArray,
    getInteriorPointsOfMultiArray as _ol_geom_flat_interiorpoint$getInteriorPointsOfMultiArray
} from './ol/geom/flat/interiorpoint.js';
import {
    interpolatePoint as _ol_geom_flat_interpolate$interpolatePoint,
    lineStringCoordinateAtM as _ol_geom_flat_interpolate$lineStringCoordinateAtM,
    lineStringsCoordinateAtM as _ol_geom_flat_interpolate$lineStringsCoordinateAtM
} from './ol/geom/flat/interpolate.js';
import {
    intersectsLinearRing as _ol_geom_flat_intersectsextent$intersectsLinearRing,
    intersectsLinearRingArray as _ol_geom_flat_intersectsextent$intersectsLinearRingArray,
    intersectsLinearRingMultiArray as _ol_geom_flat_intersectsextent$intersectsLinearRingMultiArray,
    intersectsLineString as _ol_geom_flat_intersectsextent$intersectsLineString,
    intersectsLineStringArray as _ol_geom_flat_intersectsextent$intersectsLineStringArray
} from './ol/geom/flat/intersectsextent.js';
import {
    linearRingLength as _ol_geom_flat_length$linearRingLength,
    lineStringLength as _ol_geom_flat_length$lineStringLength
} from './ol/geom/flat/length.js';
import {
    linearRingIsClockwise as _ol_geom_flat_orient$linearRingIsClockwise,
    linearRingsAreOriented as _ol_geom_flat_orient$linearRingsAreOriented,
    linearRingssAreOriented as _ol_geom_flat_orient$linearRingssAreOriented,
    orientLinearRings as _ol_geom_flat_orient$orientLinearRings,
    orientLinearRingsArray as _ol_geom_flat_orient$orientLinearRingsArray
} from './ol/geom/flat/orient.js';
import {coordinates as _ol_geom_flat_reverse$coordinates} from './ol/geom/flat/reverse.js';
import {forEach as _ol_geom_flat_segments$forEach} from './ol/geom/flat/segments.js';
import {
    douglasPeucker as _ol_geom_flat_simplify$douglasPeucker,
    douglasPeuckerArray as _ol_geom_flat_simplify$douglasPeuckerArray,
    douglasPeuckerMultiArray as _ol_geom_flat_simplify$douglasPeuckerMultiArray,
    quantize as _ol_geom_flat_simplify$quantize,
    quantizeArray as _ol_geom_flat_simplify$quantizeArray,
    quantizeMultiArray as _ol_geom_flat_simplify$quantizeMultiArray,
    radialDistance as _ol_geom_flat_simplify$radialDistance,
    simplifyLineString as _ol_geom_flat_simplify$simplifyLineString,
    snap as _ol_geom_flat_simplify$snap
} from './ol/geom/flat/simplify.js';
import {matchingChunk as _ol_geom_flat_straightchunk$matchingChunk} from './ol/geom/flat/straightchunk.js';
import {drawTextOnPath as _ol_geom_flat_textpath$drawTextOnPath} from './ol/geom/flat/textpath.js';
import {lineStringIsClosed as _ol_geom_flat_topology$lineStringIsClosed} from './ol/geom/flat/topology.js';
import {
    rotate as _ol_geom_flat_transform$rotate,
    scale as _ol_geom_flat_transform$scale,
    transform2D as _ol_geom_flat_transform$transform2D,
    translate as _ol_geom_flat_transform$translate
} from './ol/geom/flat/transform.js';
import $ol$format$EsriJSON from './ol/format/EsriJSON.js';
import $ol$format$Feature, {
    transformExtentWithOptions as _ol_format_Feature$transformExtentWithOptions,
    transformGeometryWithOptions as _ol_format_Feature$transformGeometryWithOptions
} from './ol/format/Feature.js';
import $ol$format$GML from './ol/format/GML.js';
import $ol$format$GML2 from './ol/format/GML2.js';
import $ol$format$GML3 from './ol/format/GML3.js';
import $ol$format$GML32 from './ol/format/GML32.js';
import $ol$format$GMLBase, {GMLNS as _ol_format_GMLBase$GMLNS} from './ol/format/GMLBase.js';
import $ol$format$GPX from './ol/format/GPX.js';
import $ol$format$GeoJSON from './ol/format/GeoJSON.js';
import $ol$format$IGC from './ol/format/IGC.js';
import $ol$format$IIIFInfo from './ol/format/IIIFInfo.js';
import $ol$format$JSONFeature from './ol/format/JSONFeature.js';
import $ol$format$KML, {
    getDefaultFillStyle as _ol_format_KML$getDefaultFillStyle,
    getDefaultImageStyle as _ol_format_KML$getDefaultImageStyle,
    getDefaultStrokeStyle as _ol_format_KML$getDefaultStrokeStyle,
    getDefaultStyle as _ol_format_KML$getDefaultStyle,
    getDefaultStyleArray as _ol_format_KML$getDefaultStyleArray,
    getDefaultTextStyle as _ol_format_KML$getDefaultTextStyle,
    readFlatCoordinates as _ol_format_KML$readFlatCoordinates
} from './ol/format/KML.js';
import $ol$format$MVT from './ol/format/MVT.js';
import $ol$format$OSMXML from './ol/format/OSMXML.js';
import $ol$format$OWS from './ol/format/OWS.js';
import $ol$format$Polyline, {
    decodeDeltas as _ol_format_Polyline$decodeDeltas,
    decodeFloats as _ol_format_Polyline$decodeFloats,
    decodeSignedIntegers as _ol_format_Polyline$decodeSignedIntegers,
    decodeUnsignedIntegers as _ol_format_Polyline$decodeUnsignedIntegers,
    encodeDeltas as _ol_format_Polyline$encodeDeltas,
    encodeFloats as _ol_format_Polyline$encodeFloats,
    encodeSignedIntegers as _ol_format_Polyline$encodeSignedIntegers,
    encodeUnsignedInteger as _ol_format_Polyline$encodeUnsignedInteger,
    encodeUnsignedIntegers as _ol_format_Polyline$encodeUnsignedIntegers
} from './ol/format/Polyline.js';
import $ol$format$TextFeature from './ol/format/TextFeature.js';
import $ol$format$TopoJSON from './ol/format/TopoJSON.js';
import $ol$format$WFS, {writeFilter as _ol_format_WFS$writeFilter} from './ol/format/WFS.js';
import $ol$format$WKB from './ol/format/WKB.js';
import $ol$format$WKT from './ol/format/WKT.js';
import $ol$format$WMSCapabilities from './ol/format/WMSCapabilities.js';
import $ol$format$WMSGetFeatureInfo from './ol/format/WMSGetFeatureInfo.js';
import $ol$format$WMTSCapabilities from './ol/format/WMTSCapabilities.js';
import $ol$format$XML from './ol/format/XML.js';
import $ol$format$XMLFeature from './ol/format/XMLFeature.js';
import {
    and as _ol_format_filter$and,
    bbox as _ol_format_filter$bbox,
    between as _ol_format_filter$between,
    contains as _ol_format_filter$contains,
    disjoint as _ol_format_filter$disjoint,
    during as _ol_format_filter$during,
    dwithin as _ol_format_filter$dwithin,
    equalTo as _ol_format_filter$equalTo,
    greaterThan as _ol_format_filter$greaterThan,
    greaterThanOrEqualTo as _ol_format_filter$greaterThanOrEqualTo,
    intersects as _ol_format_filter$intersects,
    isNull as _ol_format_filter$isNull,
    lessThan as _ol_format_filter$lessThan,
    lessThanOrEqualTo as _ol_format_filter$lessThanOrEqualTo,
    like as _ol_format_filter$like,
    not as _ol_format_filter$not,
    notEqualTo as _ol_format_filter$notEqualTo,
    or as _ol_format_filter$or,
    resourceId as _ol_format_filter$resourceId,
    within as _ol_format_filter$within
} from './ol/format/filter.js';
import {readHref as _ol_format_xlink$readHref} from './ol/format/xlink.js';
import {
    readBoolean as _ol_format_xsd$readBoolean,
    readBooleanString as _ol_format_xsd$readBooleanString,
    readDateTime as _ol_format_xsd$readDateTime,
    readDecimal as _ol_format_xsd$readDecimal,
    readDecimalString as _ol_format_xsd$readDecimalString,
    readNonNegativeIntegerString as _ol_format_xsd$readNonNegativeIntegerString,
    readPositiveInteger as _ol_format_xsd$readPositiveInteger,
    readString as _ol_format_xsd$readString,
    writeBooleanTextNode as _ol_format_xsd$writeBooleanTextNode,
    writeCDATASection as _ol_format_xsd$writeCDATASection,
    writeDateTimeTextNode as _ol_format_xsd$writeDateTimeTextNode,
    writeDecimalTextNode as _ol_format_xsd$writeDecimalTextNode,
    writeNonNegativeIntegerTextNode as _ol_format_xsd$writeNonNegativeIntegerTextNode,
    writeStringTextNode as _ol_format_xsd$writeStringTextNode
} from './ol/format/xsd.js';
import $ol$format$filter$And from './ol/format/filter/And.js';
import $ol$format$filter$Bbox from './ol/format/filter/Bbox.js';
import $ol$format$filter$Comparison from './ol/format/filter/Comparison.js';
import $ol$format$filter$ComparisonBinary from './ol/format/filter/ComparisonBinary.js';
import $ol$format$filter$Contains from './ol/format/filter/Contains.js';
import $ol$format$filter$DWithin from './ol/format/filter/DWithin.js';
import $ol$format$filter$Disjoint from './ol/format/filter/Disjoint.js';
import $ol$format$filter$During from './ol/format/filter/During.js';
import $ol$format$filter$EqualTo from './ol/format/filter/EqualTo.js';
import $ol$format$filter$Filter from './ol/format/filter/Filter.js';
import $ol$format$filter$GreaterThan from './ol/format/filter/GreaterThan.js';
import $ol$format$filter$GreaterThanOrEqualTo from './ol/format/filter/GreaterThanOrEqualTo.js';
import $ol$format$filter$Intersects from './ol/format/filter/Intersects.js';
import $ol$format$filter$IsBetween from './ol/format/filter/IsBetween.js';
import $ol$format$filter$IsLike from './ol/format/filter/IsLike.js';
import $ol$format$filter$IsNull from './ol/format/filter/IsNull.js';
import $ol$format$filter$LessThan from './ol/format/filter/LessThan.js';
import $ol$format$filter$LessThanOrEqualTo from './ol/format/filter/LessThanOrEqualTo.js';
import $ol$format$filter$LogicalNary from './ol/format/filter/LogicalNary.js';
import $ol$format$filter$Not from './ol/format/filter/Not.js';
import $ol$format$filter$NotEqualTo from './ol/format/filter/NotEqualTo.js';
import $ol$format$filter$Or from './ol/format/filter/Or.js';
import $ol$format$filter$ResourceId from './ol/format/filter/ResourceId.js';
import $ol$format$filter$Spatial from './ol/format/filter/Spatial.js';
import $ol$format$filter$Within from './ol/format/filter/Within.js';
import $ol$events$Event, {
    preventDefault as _ol_events_Event$preventDefault,
    stopPropagation as _ol_events_Event$stopPropagation
} from './ol/events/Event.js';
import $ol$events$Target from './ol/events/Target.js';
import {
    all as _ol_events_condition$all,
    altKeyOnly as _ol_events_condition$altKeyOnly,
    altShiftKeysOnly as _ol_events_condition$altShiftKeysOnly,
    always as _ol_events_condition$always,
    click as _ol_events_condition$click,
    doubleClick as _ol_events_condition$doubleClick,
    focus as _ol_events_condition$focus,
    focusWithTabindex as _ol_events_condition$focusWithTabindex,
    mouseActionButton as _ol_events_condition$mouseActionButton,
    mouseOnly as _ol_events_condition$mouseOnly,
    never as _ol_events_condition$never,
    noModifierKeys as _ol_events_condition$noModifierKeys,
    penOnly as _ol_events_condition$penOnly,
    platformModifierKeyOnly as _ol_events_condition$platformModifierKeyOnly,
    pointerMove as _ol_events_condition$pointerMove,
    primaryAction as _ol_events_condition$primaryAction,
    shiftKeyOnly as _ol_events_condition$shiftKeyOnly,
    singleClick as _ol_events_condition$singleClick,
    targetNotEditable as _ol_events_condition$targetNotEditable,
    touchOnly as _ol_events_condition$touchOnly
} from './ol/events/condition.js';
import $ol$control$Attribution from './ol/control/Attribution.js';
import $ol$control$Control from './ol/control/Control.js';
import $ol$control$FullScreen from './ol/control/FullScreen.js';
import $ol$control$MousePosition from './ol/control/MousePosition.js';
import $ol$control$OverviewMap from './ol/control/OverviewMap.js';
import $ol$control$Rotate from './ol/control/Rotate.js';
import $ol$control$ScaleLine from './ol/control/ScaleLine.js';
import $ol$control$Zoom from './ol/control/Zoom.js';
import $ol$control$ZoomSlider from './ol/control/ZoomSlider.js';
import $ol$control$ZoomToExtent from './ol/control/ZoomToExtent.js';

var ol = {};
ol.AssertionError = $ol$AssertionError || {};
ol.Collection = $ol$Collection || {};
ol.Collection.CollectionEvent = _ol_Collection$CollectionEvent || {};
ol.DataTile = $ol$DataTile || {};
ol.Disposable = $ol$Disposable || {};
ol.Feature = $ol$Feature || {};
ol.Feature.createStyleFunction = _ol_Feature$createStyleFunction || {};
ol.Geolocation = $ol$Geolocation || {};
ol.Image = $ol$Image || {};
ol.Image.listenImage = _ol_Image$listenImage || {};
ol.ImageBase = $ol$ImageBase || {};
ol.ImageCanvas = $ol$ImageCanvas || {};
ol.ImageTile = $ol$ImageTile || {};
ol.Kinetic = $ol$Kinetic || {};
ol.Map = $ol$Map || {};
ol.MapBrowserEvent = $ol$MapBrowserEvent || {};
ol.MapBrowserEventHandler = $ol$MapBrowserEventHandler || {};
ol.MapEvent = $ol$MapEvent || {};
ol.Object = $ol$Object || {};
ol.Object.ObjectEvent = _ol_Object$ObjectEvent || {};
ol.Observable = $ol$Observable || {};
ol.Observable.unByKey = _ol_Observable$unByKey || {};
ol.Overlay = $ol$Overlay || {};
ol.PluggableMap = $ol$PluggableMap || {};
ol.Tile = $ol$Tile || {};
ol.TileCache = $ol$TileCache || {};
ol.TileQueue = $ol$TileQueue || {};
ol.TileQueue.getTilePriority = _ol_TileQueue$getTilePriority || {};
ol.TileRange = $ol$TileRange || {};
ol.TileRange.createOrUpdate = _ol_TileRange$createOrUpdate || {};
ol.VectorRenderTile = $ol$VectorRenderTile || {};
ol.VectorTile = $ol$VectorTile || {};
ol.View = $ol$View || {};
ol.View.createCenterConstraint = _ol_View$createCenterConstraint || {};
ol.View.createResolutionConstraint = _ol_View$createResolutionConstraint || {};
ol.View.createRotationConstraint = _ol_View$createRotationConstraint || {};
ol.View.isNoopAnimation = _ol_View$isNoopAnimation || {};
ol.array = {};
ol.array.binarySearch = _ol_array$binarySearch || {};
ol.array.equals = _ol_array$equals || {};
ol.array.extend = _ol_array$extend || {};
ol.array.find = _ol_array$find || {};
ol.array.findIndex = _ol_array$findIndex || {};
ol.array.includes = _ol_array$includes || {};
ol.array.isSorted = _ol_array$isSorted || {};
ol.array.linearFindNearest = _ol_array$linearFindNearest || {};
ol.array.numberSafeCompareFunction = _ol_array$numberSafeCompareFunction || {};
ol.array.remove = _ol_array$remove || {};
ol.array.reverseSubArray = _ol_array$reverseSubArray || {};
ol.array.stableSort = _ol_array$stableSort || {};
ol.asserts = {};
ol.asserts.assert = _ol_asserts$assert || {};
ol.centerconstraint = {};
ol.centerconstraint.createExtent = _ol_centerconstraint$createExtent || {};
ol.centerconstraint.none = _ol_centerconstraint$none || {};
ol.color = {};
ol.color.asArray = _ol_color$asArray || {};
ol.color.asString = _ol_color$asString || {};
ol.color.fromString = _ol_color$fromString || {};
ol.color.isStringColor = _ol_color$isStringColor || {};
ol.color.normalize = _ol_color$normalize || {};
ol.color.toString = _ol_color$toString || {};
ol.colorlike = {};
ol.colorlike.asColorLike = _ol_colorlike$asColorLike || {};
ol.control = {};
ol.control.Attribution = $ol$control$Attribution || {};
ol.control.Control = $ol$control$Control || {};
ol.control.FullScreen = $ol$control$FullScreen || {};
ol.control.MousePosition = $ol$control$MousePosition || {};
ol.control.OverviewMap = $ol$control$OverviewMap || {};
ol.control.Rotate = $ol$control$Rotate || {};
ol.control.ScaleLine = $ol$control$ScaleLine || {};
ol.control.Zoom = $ol$control$Zoom || {};
ol.control.ZoomSlider = $ol$control$ZoomSlider || {};
ol.control.ZoomToExtent = $ol$control$ZoomToExtent || {};
ol.control.defaults = _ol_control$defaults || {};
ol.coordinate = {};
ol.coordinate.add = _ol_coordinate$add || {};
ol.coordinate.closestOnCircle = _ol_coordinate$closestOnCircle || {};
ol.coordinate.closestOnSegment = _ol_coordinate$closestOnSegment || {};
ol.coordinate.createStringXY = _ol_coordinate$createStringXY || {};
ol.coordinate.degreesToStringHDMS = _ol_coordinate$degreesToStringHDMS || {};
ol.coordinate.distance = _ol_coordinate$distance || {};
ol.coordinate.equals = _ol_coordinate$equals || {};
ol.coordinate.format = _ol_coordinate$format || {};
ol.coordinate.getWorldsAway = _ol_coordinate$getWorldsAway || {};
ol.coordinate.rotate = _ol_coordinate$rotate || {};
ol.coordinate.scale = _ol_coordinate$scale || {};
ol.coordinate.squaredDistance = _ol_coordinate$squaredDistance || {};
ol.coordinate.squaredDistanceToSegment = _ol_coordinate$squaredDistanceToSegment || {};
ol.coordinate.toStringHDMS = _ol_coordinate$toStringHDMS || {};
ol.coordinate.toStringXY = _ol_coordinate$toStringXY || {};
ol.coordinate.wrapX = _ol_coordinate$wrapX || {};
ol.css = {};
ol.css.CLASS_COLLAPSED = _ol_css$CLASS_COLLAPSED || {};
ol.css.CLASS_CONTROL = _ol_css$CLASS_CONTROL || {};
ol.css.CLASS_HIDDEN = _ol_css$CLASS_HIDDEN || {};
ol.css.CLASS_SELECTABLE = _ol_css$CLASS_SELECTABLE || {};
ol.css.CLASS_UNSELECTABLE = _ol_css$CLASS_UNSELECTABLE || {};
ol.css.CLASS_UNSUPPORTED = _ol_css$CLASS_UNSUPPORTED || {};
ol.css.cssOpacity = _ol_css$cssOpacity || {};
ol.css.getFontParameters = _ol_css$getFontParameters || {};
ol.dom = {};
ol.dom.createCanvasContext2D = _ol_dom$createCanvasContext2D || {};
ol.dom.outerHeight = _ol_dom$outerHeight || {};
ol.dom.outerWidth = _ol_dom$outerWidth || {};
ol.dom.removeChildren = _ol_dom$removeChildren || {};
ol.dom.removeNode = _ol_dom$removeNode || {};
ol.dom.replaceChildren = _ol_dom$replaceChildren || {};
ol.dom.replaceNode = _ol_dom$replaceNode || {};
ol.easing = {};
ol.easing.easeIn = _ol_easing$easeIn || {};
ol.easing.easeOut = _ol_easing$easeOut || {};
ol.easing.inAndOut = _ol_easing$inAndOut || {};
ol.easing.linear = _ol_easing$linear || {};
ol.easing.upAndDown = _ol_easing$upAndDown || {};
ol.events = {};
ol.events.Event = $ol$events$Event || {};
ol.events.Event.preventDefault = _ol_events_Event$preventDefault || {};
ol.events.Event.stopPropagation = _ol_events_Event$stopPropagation || {};
ol.events.Target = $ol$events$Target || {};
ol.events.condition = {};
ol.events.condition.all = _ol_events_condition$all || {};
ol.events.condition.altKeyOnly = _ol_events_condition$altKeyOnly || {};
ol.events.condition.altShiftKeysOnly = _ol_events_condition$altShiftKeysOnly || {};
ol.events.condition.always = _ol_events_condition$always || {};
ol.events.condition.click = _ol_events_condition$click || {};
ol.events.condition.doubleClick = _ol_events_condition$doubleClick || {};
ol.events.condition.focus = _ol_events_condition$focus || {};
ol.events.condition.focusWithTabindex = _ol_events_condition$focusWithTabindex || {};
ol.events.condition.mouseActionButton = _ol_events_condition$mouseActionButton || {};
ol.events.condition.mouseOnly = _ol_events_condition$mouseOnly || {};
ol.events.condition.never = _ol_events_condition$never || {};
ol.events.condition.noModifierKeys = _ol_events_condition$noModifierKeys || {};
ol.events.condition.penOnly = _ol_events_condition$penOnly || {};
ol.events.condition.platformModifierKeyOnly = _ol_events_condition$platformModifierKeyOnly || {};
ol.events.condition.pointerMove = _ol_events_condition$pointerMove || {};
ol.events.condition.primaryAction = _ol_events_condition$primaryAction || {};
ol.events.condition.shiftKeyOnly = _ol_events_condition$shiftKeyOnly || {};
ol.events.condition.singleClick = _ol_events_condition$singleClick || {};
ol.events.condition.targetNotEditable = _ol_events_condition$targetNotEditable || {};
ol.events.condition.touchOnly = _ol_events_condition$touchOnly || {};
ol.events.listen = _ol_events$listen || {};
ol.events.listenOnce = _ol_events$listenOnce || {};
ol.events.unlistenByKey = _ol_events$unlistenByKey || {};
ol.extent = {};
ol.extent.applyTransform = _ol_extent$applyTransform || {};
ol.extent.approximatelyEquals = _ol_extent$approximatelyEquals || {};
ol.extent.boundingExtent = _ol_extent$boundingExtent || {};
ol.extent.buffer = _ol_extent$buffer || {};
ol.extent.clone = _ol_extent$clone || {};
ol.extent.closestSquaredDistanceXY = _ol_extent$closestSquaredDistanceXY || {};
ol.extent.containsCoordinate = _ol_extent$containsCoordinate || {};
ol.extent.containsExtent = _ol_extent$containsExtent || {};
ol.extent.containsXY = _ol_extent$containsXY || {};
ol.extent.coordinateRelationship = _ol_extent$coordinateRelationship || {};
ol.extent.createEmpty = _ol_extent$createEmpty || {};
ol.extent.createOrUpdate = _ol_extent$createOrUpdate || {};
ol.extent.createOrUpdateEmpty = _ol_extent$createOrUpdateEmpty || {};
ol.extent.createOrUpdateFromCoordinate = _ol_extent$createOrUpdateFromCoordinate || {};
ol.extent.createOrUpdateFromCoordinates = _ol_extent$createOrUpdateFromCoordinates || {};
ol.extent.createOrUpdateFromFlatCoordinates = _ol_extent$createOrUpdateFromFlatCoordinates || {};
ol.extent.createOrUpdateFromRings = _ol_extent$createOrUpdateFromRings || {};
ol.extent.equals = _ol_extent$equals || {};
ol.extent.extend = _ol_extent$extend || {};
ol.extent.extendCoordinate = _ol_extent$extendCoordinate || {};
ol.extent.extendCoordinates = _ol_extent$extendCoordinates || {};
ol.extent.extendFlatCoordinates = _ol_extent$extendFlatCoordinates || {};
ol.extent.extendRings = _ol_extent$extendRings || {};
ol.extent.extendXY = _ol_extent$extendXY || {};
ol.extent.forEachCorner = _ol_extent$forEachCorner || {};
ol.extent.getArea = _ol_extent$getArea || {};
ol.extent.getBottomLeft = _ol_extent$getBottomLeft || {};
ol.extent.getBottomRight = _ol_extent$getBottomRight || {};
ol.extent.getCenter = _ol_extent$getCenter || {};
ol.extent.getCorner = _ol_extent$getCorner || {};
ol.extent.getEnlargedArea = _ol_extent$getEnlargedArea || {};
ol.extent.getForViewAndSize = _ol_extent$getForViewAndSize || {};
ol.extent.getHeight = _ol_extent$getHeight || {};
ol.extent.getIntersection = _ol_extent$getIntersection || {};
ol.extent.getIntersectionArea = _ol_extent$getIntersectionArea || {};
ol.extent.getMargin = _ol_extent$getMargin || {};
ol.extent.getSize = _ol_extent$getSize || {};
ol.extent.getTopLeft = _ol_extent$getTopLeft || {};
ol.extent.getTopRight = _ol_extent$getTopRight || {};
ol.extent.getWidth = _ol_extent$getWidth || {};
ol.extent.intersects = _ol_extent$intersects || {};
ol.extent.intersectsSegment = _ol_extent$intersectsSegment || {};
ol.extent.isEmpty = _ol_extent$isEmpty || {};
ol.extent.returnOrUpdate = _ol_extent$returnOrUpdate || {};
ol.extent.scaleFromCenter = _ol_extent$scaleFromCenter || {};
ol.extent.wrapX = _ol_extent$wrapX || {};
ol.featureloader = {};
ol.featureloader.loadFeaturesXhr = _ol_featureloader$loadFeaturesXhr || {};
ol.featureloader.setWithCredentials = _ol_featureloader$setWithCredentials || {};
ol.featureloader.xhr = _ol_featureloader$xhr || {};
ol.format = {};
ol.format.EsriJSON = $ol$format$EsriJSON || {};
ol.format.Feature = $ol$format$Feature || {};
ol.format.Feature.transformExtentWithOptions = _ol_format_Feature$transformExtentWithOptions || {};
ol.format.Feature.transformGeometryWithOptions = _ol_format_Feature$transformGeometryWithOptions || {};
ol.format.GML = $ol$format$GML || {};
ol.format.GML2 = $ol$format$GML2 || {};
ol.format.GML3 = $ol$format$GML3 || {};
ol.format.GML32 = $ol$format$GML32 || {};
ol.format.GMLBase = $ol$format$GMLBase || {};
ol.format.GMLBase.GMLNS = _ol_format_GMLBase$GMLNS || {};
ol.format.GPX = $ol$format$GPX || {};
ol.format.GeoJSON = $ol$format$GeoJSON || {};
ol.format.IGC = $ol$format$IGC || {};
ol.format.IIIFInfo = $ol$format$IIIFInfo || {};
ol.format.JSONFeature = $ol$format$JSONFeature || {};
ol.format.KML = $ol$format$KML || {};
ol.format.KML.getDefaultFillStyle = _ol_format_KML$getDefaultFillStyle || {};
ol.format.KML.getDefaultImageStyle = _ol_format_KML$getDefaultImageStyle || {};
ol.format.KML.getDefaultStrokeStyle = _ol_format_KML$getDefaultStrokeStyle || {};
ol.format.KML.getDefaultStyle = _ol_format_KML$getDefaultStyle || {};
ol.format.KML.getDefaultStyleArray = _ol_format_KML$getDefaultStyleArray || {};
ol.format.KML.getDefaultTextStyle = _ol_format_KML$getDefaultTextStyle || {};
ol.format.KML.readFlatCoordinates = _ol_format_KML$readFlatCoordinates || {};
ol.format.MVT = $ol$format$MVT || {};
ol.format.OSMXML = $ol$format$OSMXML || {};
ol.format.OWS = $ol$format$OWS || {};
ol.format.Polyline = $ol$format$Polyline || {};
ol.format.Polyline.decodeDeltas = _ol_format_Polyline$decodeDeltas || {};
ol.format.Polyline.decodeFloats = _ol_format_Polyline$decodeFloats || {};
ol.format.Polyline.decodeSignedIntegers = _ol_format_Polyline$decodeSignedIntegers || {};
ol.format.Polyline.decodeUnsignedIntegers = _ol_format_Polyline$decodeUnsignedIntegers || {};
ol.format.Polyline.encodeDeltas = _ol_format_Polyline$encodeDeltas || {};
ol.format.Polyline.encodeFloats = _ol_format_Polyline$encodeFloats || {};
ol.format.Polyline.encodeSignedIntegers = _ol_format_Polyline$encodeSignedIntegers || {};
ol.format.Polyline.encodeUnsignedInteger = _ol_format_Polyline$encodeUnsignedInteger || {};
ol.format.Polyline.encodeUnsignedIntegers = _ol_format_Polyline$encodeUnsignedIntegers || {};
ol.format.TextFeature = $ol$format$TextFeature || {};
ol.format.TopoJSON = $ol$format$TopoJSON || {};
ol.format.WFS = $ol$format$WFS || {};
ol.format.WFS.writeFilter = _ol_format_WFS$writeFilter || {};
ol.format.WKB = $ol$format$WKB || {};
ol.format.WKT = $ol$format$WKT || {};
ol.format.WMSCapabilities = $ol$format$WMSCapabilities || {};
ol.format.WMSGetFeatureInfo = $ol$format$WMSGetFeatureInfo || {};
ol.format.WMTSCapabilities = $ol$format$WMTSCapabilities || {};
ol.format.XML = $ol$format$XML || {};
ol.format.XMLFeature = $ol$format$XMLFeature || {};
ol.format.filter = {};
ol.format.filter.And = $ol$format$filter$And || {};
ol.format.filter.Bbox = $ol$format$filter$Bbox || {};
ol.format.filter.Comparison = $ol$format$filter$Comparison || {};
ol.format.filter.ComparisonBinary = $ol$format$filter$ComparisonBinary || {};
ol.format.filter.Contains = $ol$format$filter$Contains || {};
ol.format.filter.DWithin = $ol$format$filter$DWithin || {};
ol.format.filter.Disjoint = $ol$format$filter$Disjoint || {};
ol.format.filter.During = $ol$format$filter$During || {};
ol.format.filter.EqualTo = $ol$format$filter$EqualTo || {};
ol.format.filter.Filter = $ol$format$filter$Filter || {};
ol.format.filter.GreaterThan = $ol$format$filter$GreaterThan || {};
ol.format.filter.GreaterThanOrEqualTo = $ol$format$filter$GreaterThanOrEqualTo || {};
ol.format.filter.Intersects = $ol$format$filter$Intersects || {};
ol.format.filter.IsBetween = $ol$format$filter$IsBetween || {};
ol.format.filter.IsLike = $ol$format$filter$IsLike || {};
ol.format.filter.IsNull = $ol$format$filter$IsNull || {};
ol.format.filter.LessThan = $ol$format$filter$LessThan || {};
ol.format.filter.LessThanOrEqualTo = $ol$format$filter$LessThanOrEqualTo || {};
ol.format.filter.LogicalNary = $ol$format$filter$LogicalNary || {};
ol.format.filter.Not = $ol$format$filter$Not || {};
ol.format.filter.NotEqualTo = $ol$format$filter$NotEqualTo || {};
ol.format.filter.Or = $ol$format$filter$Or || {};
ol.format.filter.ResourceId = $ol$format$filter$ResourceId || {};
ol.format.filter.Spatial = $ol$format$filter$Spatial || {};
ol.format.filter.Within = $ol$format$filter$Within || {};
ol.format.filter.and = _ol_format_filter$and || {};
ol.format.filter.bbox = _ol_format_filter$bbox || {};
ol.format.filter.between = _ol_format_filter$between || {};
ol.format.filter.contains = _ol_format_filter$contains || {};
ol.format.filter.disjoint = _ol_format_filter$disjoint || {};
ol.format.filter.during = _ol_format_filter$during || {};
ol.format.filter.dwithin = _ol_format_filter$dwithin || {};
ol.format.filter.equalTo = _ol_format_filter$equalTo || {};
ol.format.filter.greaterThan = _ol_format_filter$greaterThan || {};
ol.format.filter.greaterThanOrEqualTo = _ol_format_filter$greaterThanOrEqualTo || {};
ol.format.filter.intersects = _ol_format_filter$intersects || {};
ol.format.filter.isNull = _ol_format_filter$isNull || {};
ol.format.filter.lessThan = _ol_format_filter$lessThan || {};
ol.format.filter.lessThanOrEqualTo = _ol_format_filter$lessThanOrEqualTo || {};
ol.format.filter.like = _ol_format_filter$like || {};
ol.format.filter.not = _ol_format_filter$not || {};
ol.format.filter.notEqualTo = _ol_format_filter$notEqualTo || {};
ol.format.filter.or = _ol_format_filter$or || {};
ol.format.filter.resourceId = _ol_format_filter$resourceId || {};
ol.format.filter.within = _ol_format_filter$within || {};
ol.format.xlink = {};
ol.format.xlink.readHref = _ol_format_xlink$readHref || {};
ol.format.xsd = {};
ol.format.xsd.readBoolean = _ol_format_xsd$readBoolean || {};
ol.format.xsd.readBooleanString = _ol_format_xsd$readBooleanString || {};
ol.format.xsd.readDateTime = _ol_format_xsd$readDateTime || {};
ol.format.xsd.readDecimal = _ol_format_xsd$readDecimal || {};
ol.format.xsd.readDecimalString = _ol_format_xsd$readDecimalString || {};
ol.format.xsd.readNonNegativeIntegerString = _ol_format_xsd$readNonNegativeIntegerString || {};
ol.format.xsd.readPositiveInteger = _ol_format_xsd$readPositiveInteger || {};
ol.format.xsd.readString = _ol_format_xsd$readString || {};
ol.format.xsd.writeBooleanTextNode = _ol_format_xsd$writeBooleanTextNode || {};
ol.format.xsd.writeCDATASection = _ol_format_xsd$writeCDATASection || {};
ol.format.xsd.writeDateTimeTextNode = _ol_format_xsd$writeDateTimeTextNode || {};
ol.format.xsd.writeDecimalTextNode = _ol_format_xsd$writeDecimalTextNode || {};
ol.format.xsd.writeNonNegativeIntegerTextNode = _ol_format_xsd$writeNonNegativeIntegerTextNode || {};
ol.format.xsd.writeStringTextNode = _ol_format_xsd$writeStringTextNode || {};
ol.functions = {};
ol.functions.FALSE = _ol_functions$FALSE || {};
ol.functions.TRUE = _ol_functions$TRUE || {};
ol.functions.VOID = _ol_functions$VOID || {};
ol.functions.memoizeOne = _ol_functions$memoizeOne || {};
ol.functions.toPromise = _ol_functions$toPromise || {};
ol.geom = {};
ol.geom.Circle = $ol$geom$Circle || {};
ol.geom.Geometry = $ol$geom$Geometry || {};
ol.geom.GeometryCollection = $ol$geom$GeometryCollection || {};
ol.geom.LineString = $ol$geom$LineString || {};
ol.geom.LinearRing = $ol$geom$LinearRing || {};
ol.geom.MultiLineString = $ol$geom$MultiLineString || {};
ol.geom.MultiPoint = $ol$geom$MultiPoint || {};
ol.geom.MultiPolygon = $ol$geom$MultiPolygon || {};
ol.geom.Point = $ol$geom$Point || {};
ol.geom.Polygon = $ol$geom$Polygon || {};
ol.geom.Polygon.circular = _ol_geom_Polygon$circular || {};
ol.geom.Polygon.fromCircle = _ol_geom_Polygon$fromCircle || {};
ol.geom.Polygon.fromExtent = _ol_geom_Polygon$fromExtent || {};
ol.geom.Polygon.makeRegular = _ol_geom_Polygon$makeRegular || {};
ol.geom.SimpleGeometry = $ol$geom$SimpleGeometry || {};
ol.geom.SimpleGeometry.getStrideForLayout = _ol_geom_SimpleGeometry$getStrideForLayout || {};
ol.geom.SimpleGeometry.transformGeom2D = _ol_geom_SimpleGeometry$transformGeom2D || {};
ol.geom.flat = {};
ol.geom.flat.area = {};
ol.geom.flat.area.linearRing = _ol_geom_flat_area$linearRing || {};
ol.geom.flat.area.linearRings = _ol_geom_flat_area$linearRings || {};
ol.geom.flat.area.linearRingss = _ol_geom_flat_area$linearRingss || {};
ol.geom.flat.center = {};
ol.geom.flat.center.linearRingss = _ol_geom_flat_center$linearRingss || {};
ol.geom.flat.closest = {};
ol.geom.flat.closest.arrayMaxSquaredDelta = _ol_geom_flat_closest$arrayMaxSquaredDelta || {};
ol.geom.flat.closest.assignClosestArrayPoint = _ol_geom_flat_closest$assignClosestArrayPoint || {};
ol.geom.flat.closest.assignClosestMultiArrayPoint = _ol_geom_flat_closest$assignClosestMultiArrayPoint || {};
ol.geom.flat.closest.assignClosestPoint = _ol_geom_flat_closest$assignClosestPoint || {};
ol.geom.flat.closest.maxSquaredDelta = _ol_geom_flat_closest$maxSquaredDelta || {};
ol.geom.flat.closest.multiArrayMaxSquaredDelta = _ol_geom_flat_closest$multiArrayMaxSquaredDelta || {};
ol.geom.flat.contains = {};
ol.geom.flat.contains.linearRingContainsExtent = _ol_geom_flat_contains$linearRingContainsExtent || {};
ol.geom.flat.contains.linearRingContainsXY = _ol_geom_flat_contains$linearRingContainsXY || {};
ol.geom.flat.contains.linearRingsContainsXY = _ol_geom_flat_contains$linearRingsContainsXY || {};
ol.geom.flat.contains.linearRingssContainsXY = _ol_geom_flat_contains$linearRingssContainsXY || {};
ol.geom.flat.deflate = {};
ol.geom.flat.deflate.deflateCoordinate = _ol_geom_flat_deflate$deflateCoordinate || {};
ol.geom.flat.deflate.deflateCoordinates = _ol_geom_flat_deflate$deflateCoordinates || {};
ol.geom.flat.deflate.deflateCoordinatesArray = _ol_geom_flat_deflate$deflateCoordinatesArray || {};
ol.geom.flat.deflate.deflateMultiCoordinatesArray = _ol_geom_flat_deflate$deflateMultiCoordinatesArray || {};
ol.geom.flat.flip = {};
ol.geom.flat.flip.flipXY = _ol_geom_flat_flip$flipXY || {};
ol.geom.flat.geodesic = {};
ol.geom.flat.geodesic.greatCircleArc = _ol_geom_flat_geodesic$greatCircleArc || {};
ol.geom.flat.geodesic.meridian = _ol_geom_flat_geodesic$meridian || {};
ol.geom.flat.geodesic.parallel = _ol_geom_flat_geodesic$parallel || {};
ol.geom.flat.inflate = {};
ol.geom.flat.inflate.inflateCoordinates = _ol_geom_flat_inflate$inflateCoordinates || {};
ol.geom.flat.inflate.inflateCoordinatesArray = _ol_geom_flat_inflate$inflateCoordinatesArray || {};
ol.geom.flat.inflate.inflateMultiCoordinatesArray = _ol_geom_flat_inflate$inflateMultiCoordinatesArray || {};
ol.geom.flat.interiorpoint = {};
ol.geom.flat.interiorpoint.getInteriorPointOfArray = _ol_geom_flat_interiorpoint$getInteriorPointOfArray || {};
ol.geom.flat.interiorpoint.getInteriorPointsOfMultiArray = _ol_geom_flat_interiorpoint$getInteriorPointsOfMultiArray || {};
ol.geom.flat.interpolate = {};
ol.geom.flat.interpolate.interpolatePoint = _ol_geom_flat_interpolate$interpolatePoint || {};
ol.geom.flat.interpolate.lineStringCoordinateAtM = _ol_geom_flat_interpolate$lineStringCoordinateAtM || {};
ol.geom.flat.interpolate.lineStringsCoordinateAtM = _ol_geom_flat_interpolate$lineStringsCoordinateAtM || {};
ol.geom.flat.intersectsextent = {};
ol.geom.flat.intersectsextent.intersectsLineString = _ol_geom_flat_intersectsextent$intersectsLineString || {};
ol.geom.flat.intersectsextent.intersectsLineStringArray = _ol_geom_flat_intersectsextent$intersectsLineStringArray || {};
ol.geom.flat.intersectsextent.intersectsLinearRing = _ol_geom_flat_intersectsextent$intersectsLinearRing || {};
ol.geom.flat.intersectsextent.intersectsLinearRingArray = _ol_geom_flat_intersectsextent$intersectsLinearRingArray || {};
ol.geom.flat.intersectsextent.intersectsLinearRingMultiArray = _ol_geom_flat_intersectsextent$intersectsLinearRingMultiArray || {};
ol.geom.flat.length = {};
ol.geom.flat.length.lineStringLength = _ol_geom_flat_length$lineStringLength || {};
ol.geom.flat.length.linearRingLength = _ol_geom_flat_length$linearRingLength || {};
ol.geom.flat.orient = {};
ol.geom.flat.orient.linearRingIsClockwise = _ol_geom_flat_orient$linearRingIsClockwise || {};
ol.geom.flat.orient.linearRingsAreOriented = _ol_geom_flat_orient$linearRingsAreOriented || {};
ol.geom.flat.orient.linearRingssAreOriented = _ol_geom_flat_orient$linearRingssAreOriented || {};
ol.geom.flat.orient.orientLinearRings = _ol_geom_flat_orient$orientLinearRings || {};
ol.geom.flat.orient.orientLinearRingsArray = _ol_geom_flat_orient$orientLinearRingsArray || {};
ol.geom.flat.reverse = {};
ol.geom.flat.reverse.coordinates = _ol_geom_flat_reverse$coordinates || {};
ol.geom.flat.segments = {};
ol.geom.flat.segments.forEach = _ol_geom_flat_segments$forEach || {};
ol.geom.flat.simplify = {};
ol.geom.flat.simplify.douglasPeucker = _ol_geom_flat_simplify$douglasPeucker || {};
ol.geom.flat.simplify.douglasPeuckerArray = _ol_geom_flat_simplify$douglasPeuckerArray || {};
ol.geom.flat.simplify.douglasPeuckerMultiArray = _ol_geom_flat_simplify$douglasPeuckerMultiArray || {};
ol.geom.flat.simplify.quantize = _ol_geom_flat_simplify$quantize || {};
ol.geom.flat.simplify.quantizeArray = _ol_geom_flat_simplify$quantizeArray || {};
ol.geom.flat.simplify.quantizeMultiArray = _ol_geom_flat_simplify$quantizeMultiArray || {};
ol.geom.flat.simplify.radialDistance = _ol_geom_flat_simplify$radialDistance || {};
ol.geom.flat.simplify.simplifyLineString = _ol_geom_flat_simplify$simplifyLineString || {};
ol.geom.flat.simplify.snap = _ol_geom_flat_simplify$snap || {};
ol.geom.flat.straightchunk = {};
ol.geom.flat.straightchunk.matchingChunk = _ol_geom_flat_straightchunk$matchingChunk || {};
ol.geom.flat.textpath = {};
ol.geom.flat.textpath.drawTextOnPath = _ol_geom_flat_textpath$drawTextOnPath || {};
ol.geom.flat.topology = {};
ol.geom.flat.topology.lineStringIsClosed = _ol_geom_flat_topology$lineStringIsClosed || {};
ol.geom.flat.transform = {};
ol.geom.flat.transform.rotate = _ol_geom_flat_transform$rotate || {};
ol.geom.flat.transform.scale = _ol_geom_flat_transform$scale || {};
ol.geom.flat.transform.transform2D = _ol_geom_flat_transform$transform2D || {};
ol.geom.flat.transform.translate = _ol_geom_flat_transform$translate || {};
ol.has = {};
ol.has.DEVICE_PIXEL_RATIO = _ol_has$DEVICE_PIXEL_RATIO || {};
ol.has.FIREFOX = _ol_has$FIREFOX || {};
ol.has.IMAGE_DECODE = _ol_has$IMAGE_DECODE || {};
ol.has.MAC = _ol_has$MAC || {};
ol.has.PASSIVE_EVENT_LISTENERS = _ol_has$PASSIVE_EVENT_LISTENERS || {};
ol.has.SAFARI = _ol_has$SAFARI || {};
ol.has.WEBKIT = _ol_has$WEBKIT || {};
ol.has.WORKER_OFFSCREEN_CANVAS = _ol_has$WORKER_OFFSCREEN_CANVAS || {};
ol.interaction = {};
ol.interaction.DoubleClickZoom = $ol$interaction$DoubleClickZoom || {};
ol.interaction.DragAndDrop = $ol$interaction$DragAndDrop || {};
ol.interaction.DragAndDrop.DragAndDropEvent = _ol_interaction_DragAndDrop$DragAndDropEvent || {};
ol.interaction.DragBox = $ol$interaction$DragBox || {};
ol.interaction.DragBox.DragBoxEvent = _ol_interaction_DragBox$DragBoxEvent || {};
ol.interaction.DragPan = $ol$interaction$DragPan || {};
ol.interaction.DragRotate = $ol$interaction$DragRotate || {};
ol.interaction.DragRotateAndZoom = $ol$interaction$DragRotateAndZoom || {};
ol.interaction.DragZoom = $ol$interaction$DragZoom || {};
ol.interaction.Draw = $ol$interaction$Draw || {};
ol.interaction.Draw.DrawEvent = _ol_interaction_Draw$DrawEvent || {};
ol.interaction.Draw.createBox = _ol_interaction_Draw$createBox || {};
ol.interaction.Draw.createRegularPolygon = _ol_interaction_Draw$createRegularPolygon || {};
ol.interaction.Extent = $ol$interaction$Extent || {};
ol.interaction.Extent.ExtentEvent = _ol_interaction_Extent$ExtentEvent || {};
ol.interaction.Interaction = $ol$interaction$Interaction || {};
ol.interaction.Interaction.pan = _ol_interaction_Interaction$pan || {};
ol.interaction.Interaction.zoomByDelta = _ol_interaction_Interaction$zoomByDelta || {};
ol.interaction.KeyboardPan = $ol$interaction$KeyboardPan || {};
ol.interaction.KeyboardZoom = $ol$interaction$KeyboardZoom || {};
ol.interaction.Modify = $ol$interaction$Modify || {};
ol.interaction.Modify.ModifyEvent = _ol_interaction_Modify$ModifyEvent || {};
ol.interaction.MouseWheelZoom = $ol$interaction$MouseWheelZoom || {};
ol.interaction.PinchRotate = $ol$interaction$PinchRotate || {};
ol.interaction.PinchZoom = $ol$interaction$PinchZoom || {};
ol.interaction.Pointer = $ol$interaction$Pointer || {};
ol.interaction.Pointer.centroid = _ol_interaction_Pointer$centroid || {};
ol.interaction.Select = $ol$interaction$Select || {};
ol.interaction.Select.SelectEvent = _ol_interaction_Select$SelectEvent || {};
ol.interaction.Snap = $ol$interaction$Snap || {};
ol.interaction.Translate = $ol$interaction$Translate || {};
ol.interaction.Translate.TranslateEvent = _ol_interaction_Translate$TranslateEvent || {};
ol.interaction.defaults = _ol_interaction$defaults || {};
ol.layer = {};
ol.layer.Base = $ol$layer$Base || {};
ol.layer.BaseImage = $ol$layer$BaseImage || {};
ol.layer.BaseTile = $ol$layer$BaseTile || {};
ol.layer.BaseVector = $ol$layer$BaseVector || {};
ol.layer.Graticule = $ol$layer$Graticule || {};
ol.layer.Group = $ol$layer$Group || {};
ol.layer.Group.GroupEvent = _ol_layer_Group$GroupEvent || {};
ol.layer.Heatmap = $ol$layer$Heatmap || {};
ol.layer.Image = $ol$layer$Image || {};
ol.layer.Layer = $ol$layer$Layer || {};
ol.layer.Layer.inView = _ol_layer_Layer$inView || {};
ol.layer.MapboxVector = $ol$layer$MapboxVector || {};
ol.layer.MapboxVector.getMapboxPath = _ol_layer_MapboxVector$getMapboxPath || {};
ol.layer.MapboxVector.normalizeGlyphsUrl = _ol_layer_MapboxVector$normalizeGlyphsUrl || {};
ol.layer.MapboxVector.normalizeSourceUrl = _ol_layer_MapboxVector$normalizeSourceUrl || {};
ol.layer.MapboxVector.normalizeSpriteUrl = _ol_layer_MapboxVector$normalizeSpriteUrl || {};
ol.layer.MapboxVector.normalizeStyleUrl = _ol_layer_MapboxVector$normalizeStyleUrl || {};
ol.layer.Tile = $ol$layer$Tile || {};
ol.layer.Vector = $ol$layer$Vector || {};
ol.layer.VectorImage = $ol$layer$VectorImage || {};
ol.layer.VectorTile = $ol$layer$VectorTile || {};
ol.layer.WebGLPoints = $ol$layer$WebGLPoints || {};
ol.layer.WebGLTile = $ol$layer$WebGLTile || {};
ol.loadingstrategy = {};
ol.loadingstrategy.all = _ol_loadingstrategy$all || {};
ol.loadingstrategy.bbox = _ol_loadingstrategy$bbox || {};
ol.loadingstrategy.tile = _ol_loadingstrategy$tile || {};
ol.math = {};
ol.math.ceil = _ol_math$ceil || {};
ol.math.clamp = _ol_math$clamp || {};
ol.math.cosh = _ol_math$cosh || {};
ol.math.floor = _ol_math$floor || {};
ol.math.lerp = _ol_math$lerp || {};
ol.math.log2 = _ol_math$log2 || {};
ol.math.modulo = _ol_math$modulo || {};
ol.math.round = _ol_math$round || {};
ol.math.solveLinearSystem = _ol_math$solveLinearSystem || {};
ol.math.squaredDistance = _ol_math$squaredDistance || {};
ol.math.squaredSegmentDistance = _ol_math$squaredSegmentDistance || {};
ol.math.toDegrees = _ol_math$toDegrees || {};
ol.math.toFixed = _ol_math$toFixed || {};
ol.math.toRadians = _ol_math$toRadians || {};
ol.net = {};
ol.net.ClientError = _ol_net$ClientError || {};
ol.net.ResponseError = _ol_net$ResponseError || {};
ol.net.getJSON = _ol_net$getJSON || {};
ol.net.jsonp = _ol_net$jsonp || {};
ol.net.overrideXHR = _ol_net$overrideXHR || {};
ol.net.resolveUrl = _ol_net$resolveUrl || {};
ol.net.restoreXHR = _ol_net$restoreXHR || {};
ol.obj = {};
ol.obj.assign = _ol_obj$assign || {};
ol.obj.clear = _ol_obj$clear || {};
ol.obj.getValues = _ol_obj$getValues || {};
ol.obj.isEmpty = _ol_obj$isEmpty || {};
ol.proj = {};
ol.proj.Projection = $ol$proj$Projection || {};
ol.proj.Units = {};
ol.proj.Units.METERS_PER_UNIT = _ol_proj_Units$METERS_PER_UNIT || {};
ol.proj.Units.fromCode = _ol_proj_Units$fromCode || {};
ol.proj.addCommon = _ol_proj$addCommon || {};
ol.proj.addCoordinateTransforms = _ol_proj$addCoordinateTransforms || {};
ol.proj.addEquivalentProjections = _ol_proj$addEquivalentProjections || {};
ol.proj.addEquivalentTransforms = _ol_proj$addEquivalentTransforms || {};
ol.proj.addProjection = _ol_proj$addProjection || {};
ol.proj.addProjections = _ol_proj$addProjections || {};
ol.proj.clearAllProjections = _ol_proj$clearAllProjections || {};
ol.proj.clearUserProjection = _ol_proj$clearUserProjection || {};
ol.proj.cloneTransform = _ol_proj$cloneTransform || {};
ol.proj.createProjection = _ol_proj$createProjection || {};
ol.proj.createSafeCoordinateTransform = _ol_proj$createSafeCoordinateTransform || {};
ol.proj.createTransformFromCoordinateTransform = _ol_proj$createTransformFromCoordinateTransform || {};
ol.proj.epsg3857 = {};
ol.proj.epsg3857.EXTENT = _ol_proj_epsg3857$EXTENT || {};
ol.proj.epsg3857.HALF_SIZE = _ol_proj_epsg3857$HALF_SIZE || {};
ol.proj.epsg3857.MAX_SAFE_Y = _ol_proj_epsg3857$MAX_SAFE_Y || {};
ol.proj.epsg3857.PROJECTIONS = _ol_proj_epsg3857$PROJECTIONS || {};
ol.proj.epsg3857.RADIUS = _ol_proj_epsg3857$RADIUS || {};
ol.proj.epsg3857.WORLD_EXTENT = _ol_proj_epsg3857$WORLD_EXTENT || {};
ol.proj.epsg3857.fromEPSG4326 = _ol_proj_epsg3857$fromEPSG4326 || {};
ol.proj.epsg3857.toEPSG4326 = _ol_proj_epsg3857$toEPSG4326 || {};
ol.proj.epsg4326 = {};
ol.proj.epsg4326.EXTENT = _ol_proj_epsg4326$EXTENT || {};
ol.proj.epsg4326.METERS_PER_UNIT = _ol_proj_epsg4326$METERS_PER_UNIT || {};
ol.proj.epsg4326.PROJECTIONS = _ol_proj_epsg4326$PROJECTIONS || {};
ol.proj.epsg4326.RADIUS = _ol_proj_epsg4326$RADIUS || {};
ol.proj.equivalent = _ol_proj$equivalent || {};
ol.proj.fromLonLat = _ol_proj$fromLonLat || {};
ol.proj.fromUserCoordinate = _ol_proj$fromUserCoordinate || {};
ol.proj.fromUserExtent = _ol_proj$fromUserExtent || {};
ol.proj.fromUserResolution = _ol_proj$fromUserResolution || {};
ol.proj.get = _ol_proj$get || {};
ol.proj.getPointResolution = _ol_proj$getPointResolution || {};
ol.proj.getTransform = _ol_proj$getTransform || {};
ol.proj.getTransformFromProjections = _ol_proj$getTransformFromProjections || {};
ol.proj.getUserProjection = _ol_proj$getUserProjection || {};
ol.proj.identityTransform = _ol_proj$identityTransform || {};
ol.proj.proj4 = {};
ol.proj.proj4.register = _ol_proj_proj4$register || {};
ol.proj.projections = {};
ol.proj.projections.add = _ol_proj_projections$add || {};
ol.proj.projections.clear = _ol_proj_projections$clear || {};
ol.proj.projections.get = _ol_proj_projections$get || {};
ol.proj.setUserProjection = _ol_proj$setUserProjection || {};
ol.proj.toLonLat = _ol_proj$toLonLat || {};
ol.proj.toUserCoordinate = _ol_proj$toUserCoordinate || {};
ol.proj.toUserExtent = _ol_proj$toUserExtent || {};
ol.proj.toUserResolution = _ol_proj$toUserResolution || {};
ol.proj.transform = _ol_proj$transform || {};
ol.proj.transformExtent = _ol_proj$transformExtent || {};
ol.proj.transformWithProjections = _ol_proj$transformWithProjections || {};
ol.proj.transforms = {};
ol.proj.transforms.add = _ol_proj_transforms$add || {};
ol.proj.transforms.clear = _ol_proj_transforms$clear || {};
ol.proj.transforms.get = _ol_proj_transforms$get || {};
ol.proj.transforms.remove = _ol_proj_transforms$remove || {};
ol.proj.useGeographic = _ol_proj$useGeographic || {};
ol.render = {};
ol.render.Box = $ol$render$Box || {};
ol.render.Event = $ol$render$Event || {};
ol.render.Feature = $ol$render$Feature || {};
ol.render.VectorContext = $ol$render$VectorContext || {};
ol.render.canvas = {};
ol.render.canvas.Builder = $ol$render$canvas$Builder || {};
ol.render.canvas.BuilderGroup = $ol$render$canvas$BuilderGroup || {};
ol.render.canvas.Executor = $ol$render$canvas$Executor || {};
ol.render.canvas.ExecutorGroup = $ol$render$canvas$ExecutorGroup || {};
ol.render.canvas.ExecutorGroup.getPixelIndexArray = _ol_render_canvas_ExecutorGroup$getPixelIndexArray || {};
ol.render.canvas.ImageBuilder = $ol$render$canvas$ImageBuilder || {};
ol.render.canvas.Immediate = $ol$render$canvas$Immediate || {};
ol.render.canvas.Instruction = {};
ol.render.canvas.Instruction.beginPathInstruction = _ol_render_canvas_Instruction$beginPathInstruction || {};
ol.render.canvas.Instruction.closePathInstruction = _ol_render_canvas_Instruction$closePathInstruction || {};
ol.render.canvas.Instruction.fillInstruction = _ol_render_canvas_Instruction$fillInstruction || {};
ol.render.canvas.Instruction.strokeInstruction = _ol_render_canvas_Instruction$strokeInstruction || {};
ol.render.canvas.LineStringBuilder = $ol$render$canvas$LineStringBuilder || {};
ol.render.canvas.PolygonBuilder = $ol$render$canvas$PolygonBuilder || {};
ol.render.canvas.TextBuilder = $ol$render$canvas$TextBuilder || {};
ol.render.canvas.checkedFonts = _ol_render_canvas$checkedFonts || {};
ol.render.canvas.defaultFillStyle = _ol_render_canvas$defaultFillStyle || {};
ol.render.canvas.defaultFont = _ol_render_canvas$defaultFont || {};
ol.render.canvas.defaultLineCap = _ol_render_canvas$defaultLineCap || {};
ol.render.canvas.defaultLineDash = _ol_render_canvas$defaultLineDash || {};
ol.render.canvas.defaultLineDashOffset = _ol_render_canvas$defaultLineDashOffset || {};
ol.render.canvas.defaultLineJoin = _ol_render_canvas$defaultLineJoin || {};
ol.render.canvas.defaultLineWidth = _ol_render_canvas$defaultLineWidth || {};
ol.render.canvas.defaultMiterLimit = _ol_render_canvas$defaultMiterLimit || {};
ol.render.canvas.defaultPadding = _ol_render_canvas$defaultPadding || {};
ol.render.canvas.defaultStrokeStyle = _ol_render_canvas$defaultStrokeStyle || {};
ol.render.canvas.defaultTextAlign = _ol_render_canvas$defaultTextAlign || {};
ol.render.canvas.defaultTextBaseline = _ol_render_canvas$defaultTextBaseline || {};
ol.render.canvas.drawImageOrLabel = _ol_render_canvas$drawImageOrLabel || {};
ol.render.canvas.hitdetect = {};
ol.render.canvas.hitdetect.HIT_DETECT_RESOLUTION = _ol_render_canvas_hitdetect$HIT_DETECT_RESOLUTION || {};
ol.render.canvas.hitdetect.createHitDetectionImageData = _ol_render_canvas_hitdetect$createHitDetectionImageData || {};
ol.render.canvas.hitdetect.hitDetect = _ol_render_canvas_hitdetect$hitDetect || {};
ol.render.canvas.labelCache = _ol_render_canvas$labelCache || {};
ol.render.canvas.measureAndCacheTextWidth = _ol_render_canvas$measureAndCacheTextWidth || {};
ol.render.canvas.measureTextHeight = _ol_render_canvas$measureTextHeight || {};
ol.render.canvas.measureTextWidth = _ol_render_canvas$measureTextWidth || {};
ol.render.canvas.measureTextWidths = _ol_render_canvas$measureTextWidths || {};
ol.render.canvas.registerFont = _ol_render_canvas$registerFont || {};
ol.render.canvas.rotateAtOffset = _ol_render_canvas$rotateAtOffset || {};
ol.render.canvas.textHeights = _ol_render_canvas$textHeights || {};
ol.render.getRenderPixel = _ol_render$getRenderPixel || {};
ol.render.getVectorContext = _ol_render$getVectorContext || {};
ol.render.toContext = _ol_render$toContext || {};
ol.renderer = {};
ol.renderer.Composite = $ol$renderer$Composite || {};
ol.renderer.Layer = $ol$renderer$Layer || {};
ol.renderer.Map = $ol$renderer$Map || {};
ol.renderer.canvas = {};
ol.renderer.canvas.ImageLayer = $ol$renderer$canvas$ImageLayer || {};
ol.renderer.canvas.Layer = $ol$renderer$canvas$Layer || {};
ol.renderer.canvas.TileLayer = $ol$renderer$canvas$TileLayer || {};
ol.renderer.canvas.VectorImageLayer = $ol$renderer$canvas$VectorImageLayer || {};
ol.renderer.canvas.VectorLayer = $ol$renderer$canvas$VectorLayer || {};
ol.renderer.canvas.VectorTileLayer = $ol$renderer$canvas$VectorTileLayer || {};
ol.renderer.canvas.common = {};
ol.renderer.canvas.common.IMAGE_SMOOTHING_DISABLED = _ol_renderer_canvas_common$IMAGE_SMOOTHING_DISABLED || {};
ol.renderer.vector = {};
ol.renderer.vector.defaultOrder = _ol_renderer_vector$defaultOrder || {};
ol.renderer.vector.getSquaredTolerance = _ol_renderer_vector$getSquaredTolerance || {};
ol.renderer.vector.getTolerance = _ol_renderer_vector$getTolerance || {};
ol.renderer.vector.renderFeature = _ol_renderer_vector$renderFeature || {};
ol.renderer.webgl = {};
ol.renderer.webgl.Layer = $ol$renderer$webgl$Layer || {};
ol.renderer.webgl.Layer.colorDecodeId = _ol_renderer_webgl_Layer$colorDecodeId || {};
ol.renderer.webgl.Layer.colorEncodeId = _ol_renderer_webgl_Layer$colorEncodeId || {};
ol.renderer.webgl.Layer.getBlankImageData = _ol_renderer_webgl_Layer$getBlankImageData || {};
ol.renderer.webgl.Layer.writePointFeatureToBuffers = _ol_renderer_webgl_Layer$writePointFeatureToBuffers || {};
ol.renderer.webgl.PointsLayer = $ol$renderer$webgl$PointsLayer || {};
ol.renderer.webgl.TileLayer = $ol$renderer$webgl$TileLayer || {};
ol.renderer.webgl.TileLayer.Attributes = _ol_renderer_webgl_TileLayer$Attributes || {};
ol.renderer.webgl.TileLayer.Uniforms = _ol_renderer_webgl_TileLayer$Uniforms || {};
ol.reproj = {};
ol.reproj.Image = $ol$reproj$Image || {};
ol.reproj.Tile = $ol$reproj$Tile || {};
ol.reproj.Triangulation = $ol$reproj$Triangulation || {};
ol.reproj.calculateSourceExtentResolution = _ol_reproj$calculateSourceExtentResolution || {};
ol.reproj.calculateSourceResolution = _ol_reproj$calculateSourceResolution || {};
ol.reproj.common = {};
ol.reproj.common.ENABLE_RASTER_REPROJECTION = _ol_reproj_common$ENABLE_RASTER_REPROJECTION || {};
ol.reproj.common.ERROR_THRESHOLD = _ol_reproj_common$ERROR_THRESHOLD || {};
ol.reproj.render = _ol_reproj$render || {};
ol.resolutionconstraint = {};
ol.resolutionconstraint.createMinMaxResolution = _ol_resolutionconstraint$createMinMaxResolution || {};
ol.resolutionconstraint.createSnapToPower = _ol_resolutionconstraint$createSnapToPower || {};
ol.resolutionconstraint.createSnapToResolutions = _ol_resolutionconstraint$createSnapToResolutions || {};
ol.rotationconstraint = {};
ol.rotationconstraint.createSnapToN = _ol_rotationconstraint$createSnapToN || {};
ol.rotationconstraint.createSnapToZero = _ol_rotationconstraint$createSnapToZero || {};
ol.rotationconstraint.disable = _ol_rotationconstraint$disable || {};
ol.rotationconstraint.none = _ol_rotationconstraint$none || {};
ol.size = {};
ol.size.buffer = _ol_size$buffer || {};
ol.size.hasArea = _ol_size$hasArea || {};
ol.size.scale = _ol_size$scale || {};
ol.size.toSize = _ol_size$toSize || {};
ol.source = {};
ol.source.BingMaps = $ol$source$BingMaps || {};
ol.source.BingMaps.quadKey = _ol_source_BingMaps$quadKey || {};
ol.source.CartoDB = $ol$source$CartoDB || {};
ol.source.Cluster = $ol$source$Cluster || {};
ol.source.DataTile = $ol$source$DataTile || {};
ol.source.GeoTIFF = $ol$source$GeoTIFF || {};
ol.source.IIIF = $ol$source$IIIF || {};
ol.source.Image = $ol$source$Image || {};
ol.source.Image.ImageSourceEvent = _ol_source_Image$ImageSourceEvent || {};
ol.source.Image.defaultImageLoadFunction = _ol_source_Image$defaultImageLoadFunction || {};
ol.source.ImageArcGISRest = $ol$source$ImageArcGISRest || {};
ol.source.ImageCanvas = $ol$source$ImageCanvas || {};
ol.source.ImageMapGuide = $ol$source$ImageMapGuide || {};
ol.source.ImageStatic = $ol$source$ImageStatic || {};
ol.source.ImageWMS = $ol$source$ImageWMS || {};
ol.source.OGCMapTile = $ol$source$OGCMapTile || {};
ol.source.OGCVectorTile = $ol$source$OGCVectorTile || {};
ol.source.OSM = $ol$source$OSM || {};
ol.source.OSM.ATTRIBUTION = _ol_source_OSM$ATTRIBUTION || {};
ol.source.Raster = $ol$source$Raster || {};
ol.source.Raster.Processor = _ol_source_Raster$Processor || {};
ol.source.Raster.RasterSourceEvent = _ol_source_Raster$RasterSourceEvent || {};
ol.source.Raster.newImageData = _ol_source_Raster$newImageData || {};
ol.source.Source = $ol$source$Source || {};
ol.source.Stamen = $ol$source$Stamen || {};
ol.source.Tile = $ol$source$Tile || {};
ol.source.Tile.TileSourceEvent = _ol_source_Tile$TileSourceEvent || {};
ol.source.TileArcGISRest = $ol$source$TileArcGISRest || {};
ol.source.TileDebug = $ol$source$TileDebug || {};
ol.source.TileImage = $ol$source$TileImage || {};
ol.source.TileJSON = $ol$source$TileJSON || {};
ol.source.TileWMS = $ol$source$TileWMS || {};
ol.source.UTFGrid = $ol$source$UTFGrid || {};
ol.source.UTFGrid.CustomTile = _ol_source_UTFGrid$CustomTile || {};
ol.source.UrlTile = $ol$source$UrlTile || {};
ol.source.Vector = $ol$source$Vector || {};
ol.source.Vector.VectorSourceEvent = _ol_source_Vector$VectorSourceEvent || {};
ol.source.VectorTile = $ol$source$VectorTile || {};
ol.source.VectorTile.defaultLoadFunction = _ol_source_VectorTile$defaultLoadFunction || {};
ol.source.WMTS = $ol$source$WMTS || {};
ol.source.WMTS.optionsFromCapabilities = _ol_source_WMTS$optionsFromCapabilities || {};
ol.source.XYZ = $ol$source$XYZ || {};
ol.source.Zoomify = $ol$source$Zoomify || {};
ol.source.Zoomify.CustomTile = _ol_source_Zoomify$CustomTile || {};
ol.source.common = {};
ol.source.common.DEFAULT_WMS_VERSION = _ol_source_common$DEFAULT_WMS_VERSION || {};
ol.source.ogcTileUtil = {};
ol.source.ogcTileUtil.getMapTileUrlTemplate = _ol_source_ogcTileUtil$getMapTileUrlTemplate || {};
ol.source.ogcTileUtil.getTileSetInfo = _ol_source_ogcTileUtil$getTileSetInfo || {};
ol.source.ogcTileUtil.getVectorTileUrlTemplate = _ol_source_ogcTileUtil$getVectorTileUrlTemplate || {};
ol.sphere = {};
ol.sphere.DEFAULT_RADIUS = _ol_sphere$DEFAULT_RADIUS || {};
ol.sphere.getArea = _ol_sphere$getArea || {};
ol.sphere.getDistance = _ol_sphere$getDistance || {};
ol.sphere.getLength = _ol_sphere$getLength || {};
ol.sphere.offset = _ol_sphere$offset || {};
ol.string = {};
ol.string.compareVersions = _ol_string$compareVersions || {};
ol.string.padNumber = _ol_string$padNumber || {};
ol.structs = {};
ol.structs.LRUCache = $ol$structs$LRUCache || {};
ol.structs.LinkedList = $ol$structs$LinkedList || {};
ol.structs.PriorityQueue = $ol$structs$PriorityQueue || {};
ol.structs.PriorityQueue.DROP = _ol_structs_PriorityQueue$DROP || {};
ol.structs.RBush = $ol$structs$RBush || {};
ol.style = {};
ol.style.Circle = $ol$style$Circle || {};
ol.style.Fill = $ol$style$Fill || {};
ol.style.Icon = $ol$style$Icon || {};
ol.style.IconImage = $ol$style$IconImage || {};
ol.style.IconImage.get = _ol_style_IconImage$get || {};
ol.style.IconImageCache = $ol$style$IconImageCache || {};
ol.style.IconImageCache.shared = _ol_style_IconImageCache$shared || {};
ol.style.Image = $ol$style$Image || {};
ol.style.RegularShape = $ol$style$RegularShape || {};
ol.style.Stroke = $ol$style$Stroke || {};
ol.style.Style = $ol$style$Style || {};
ol.style.Style.createDefaultStyle = _ol_style_Style$createDefaultStyle || {};
ol.style.Style.createEditingStyle = _ol_style_Style$createEditingStyle || {};
ol.style.Style.toFunction = _ol_style_Style$toFunction || {};
ol.style.Text = $ol$style$Text || {};
ol.style.expressions = {};
ol.style.expressions.Operators = _ol_style_expressions$Operators || {};
ol.style.expressions.PALETTE_TEXTURE_ARRAY = _ol_style_expressions$PALETTE_TEXTURE_ARRAY || {};
ol.style.expressions.arrayToGlsl = _ol_style_expressions$arrayToGlsl || {};
ol.style.expressions.colorToGlsl = _ol_style_expressions$colorToGlsl || {};
ol.style.expressions.expressionToGlsl = _ol_style_expressions$expressionToGlsl || {};
ol.style.expressions.getStringNumberEquivalent = _ol_style_expressions$getStringNumberEquivalent || {};
ol.style.expressions.getValueType = _ol_style_expressions$getValueType || {};
ol.style.expressions.isTypeUnique = _ol_style_expressions$isTypeUnique || {};
ol.style.expressions.numberToGlsl = _ol_style_expressions$numberToGlsl || {};
ol.style.expressions.stringToGlsl = _ol_style_expressions$stringToGlsl || {};
ol.style.expressions.uniformNameForVariable = _ol_style_expressions$uniformNameForVariable || {};
ol.tilecoord = {};
ol.tilecoord.createOrUpdate = _ol_tilecoord$createOrUpdate || {};
ol.tilecoord.fromKey = _ol_tilecoord$fromKey || {};
ol.tilecoord.getCacheKeyForTileKey = _ol_tilecoord$getCacheKeyForTileKey || {};
ol.tilecoord.getKey = _ol_tilecoord$getKey || {};
ol.tilecoord.getKeyZXY = _ol_tilecoord$getKeyZXY || {};
ol.tilecoord.hash = _ol_tilecoord$hash || {};
ol.tilecoord.withinExtentAndZ = _ol_tilecoord$withinExtentAndZ || {};
ol.tilegrid = {};
ol.tilegrid.TileGrid = $ol$tilegrid$TileGrid || {};
ol.tilegrid.WMTS = $ol$tilegrid$WMTS || {};
ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet = _ol_tilegrid_WMTS$createFromCapabilitiesMatrixSet || {};
ol.tilegrid.common = {};
ol.tilegrid.common.DEFAULT_MAX_ZOOM = _ol_tilegrid_common$DEFAULT_MAX_ZOOM || {};
ol.tilegrid.common.DEFAULT_TILE_SIZE = _ol_tilegrid_common$DEFAULT_TILE_SIZE || {};
ol.tilegrid.createForExtent = _ol_tilegrid$createForExtent || {};
ol.tilegrid.createForProjection = _ol_tilegrid$createForProjection || {};
ol.tilegrid.createXYZ = _ol_tilegrid$createXYZ || {};
ol.tilegrid.extentFromProjection = _ol_tilegrid$extentFromProjection || {};
ol.tilegrid.getForProjection = _ol_tilegrid$getForProjection || {};
ol.tilegrid.wrapX = _ol_tilegrid$wrapX || {};
ol.tileurlfunction = {};
ol.tileurlfunction.createFromTemplate = _ol_tileurlfunction$createFromTemplate || {};
ol.tileurlfunction.createFromTemplates = _ol_tileurlfunction$createFromTemplates || {};
ol.tileurlfunction.createFromTileUrlFunctions = _ol_tileurlfunction$createFromTileUrlFunctions || {};
ol.tileurlfunction.expandUrl = _ol_tileurlfunction$expandUrl || {};
ol.tileurlfunction.nullTileUrlFunction = _ol_tileurlfunction$nullTileUrlFunction || {};
ol.transform = {};
ol.transform.apply = _ol_transform$apply || {};
ol.transform.compose = _ol_transform$compose || {};
ol.transform.composeCssTransform = _ol_transform$composeCssTransform || {};
ol.transform.create = _ol_transform$create || {};
ol.transform.determinant = _ol_transform$determinant || {};
ol.transform.invert = _ol_transform$invert || {};
ol.transform.makeInverse = _ol_transform$makeInverse || {};
ol.transform.makeScale = _ol_transform$makeScale || {};
ol.transform.multiply = _ol_transform$multiply || {};
ol.transform.reset = _ol_transform$reset || {};
ol.transform.rotate = _ol_transform$rotate || {};
ol.transform.scale = _ol_transform$scale || {};
ol.transform.set = _ol_transform$set || {};
ol.transform.setFromArray = _ol_transform$setFromArray || {};
ol.transform.toString = _ol_transform$toString || {};
ol.transform.translate = _ol_transform$translate || {};
ol.uri = {};
ol.uri.appendParams = _ol_uri$appendParams || {};
ol.util = {};
ol.util.VERSION = _ol_util$VERSION || {};
ol.util.abstract = _ol_util$abstract || {};
ol.util.getUid = _ol_util$getUid || {};
ol.vec = {};
ol.vec.mat4 = {};
ol.vec.mat4.create = _ol_vec_mat4$create || {};
ol.vec.mat4.fromTransform = _ol_vec_mat4$fromTransform || {};
ol.webgl = {};
ol.webgl.ARRAY_BUFFER = _ol_webgl$ARRAY_BUFFER || {};
ol.webgl.Buffer = $ol$webgl$Buffer || {};
ol.webgl.Buffer.getArrayClassForType = _ol_webgl_Buffer$getArrayClassForType || {};
ol.webgl.DYNAMIC_DRAW = _ol_webgl$DYNAMIC_DRAW || {};
ol.webgl.ELEMENT_ARRAY_BUFFER = _ol_webgl$ELEMENT_ARRAY_BUFFER || {};
ol.webgl.FLOAT = _ol_webgl$FLOAT || {};
ol.webgl.Helper = $ol$webgl$Helper || {};
ol.webgl.Helper.computeAttributesStride = _ol_webgl_Helper$computeAttributesStride || {};
ol.webgl.PaletteTexture = $ol$webgl$PaletteTexture || {};
ol.webgl.PostProcessingPass = $ol$webgl$PostProcessingPass || {};
ol.webgl.RenderTarget = $ol$webgl$RenderTarget || {};
ol.webgl.STATIC_DRAW = _ol_webgl$STATIC_DRAW || {};
ol.webgl.STREAM_DRAW = _ol_webgl$STREAM_DRAW || {};
ol.webgl.ShaderBuilder = {};
ol.webgl.ShaderBuilder.ShaderBuilder = _ol_webgl_ShaderBuilder$ShaderBuilder || {};
ol.webgl.ShaderBuilder.parseLiteralStyle = _ol_webgl_ShaderBuilder$parseLiteralStyle || {};
ol.webgl.TileTexture = $ol$webgl$TileTexture || {};
ol.webgl.UNSIGNED_BYTE = _ol_webgl$UNSIGNED_BYTE || {};
ol.webgl.UNSIGNED_INT = _ol_webgl$UNSIGNED_INT || {};
ol.webgl.UNSIGNED_SHORT = _ol_webgl$UNSIGNED_SHORT || {};
ol.webgl.getContext = _ol_webgl$getContext || {};
ol.webgl.getSupportedExtensions = _ol_webgl$getSupportedExtensions || {};
ol.xml = {};
ol.xml.OBJECT_PROPERTY_NODE_FACTORY = _ol_xml$OBJECT_PROPERTY_NODE_FACTORY || {};
ol.xml.XML_SCHEMA_INSTANCE_URI = _ol_xml$XML_SCHEMA_INSTANCE_URI || {};
ol.xml.createElementNS = _ol_xml$createElementNS || {};
ol.xml.getAllTextContent = _ol_xml$getAllTextContent || {};
ol.xml.getAllTextContent_ = _ol_xml$getAllTextContent_ || {};
ol.xml.getAttributeNS = _ol_xml$getAttributeNS || {};
ol.xml.getDocument = _ol_xml$getDocument || {};
ol.xml.getXMLSerializer = _ol_xml$getXMLSerializer || {};
ol.xml.isDocument = _ol_xml$isDocument || {};
ol.xml.makeArrayExtender = _ol_xml$makeArrayExtender || {};
ol.xml.makeArrayPusher = _ol_xml$makeArrayPusher || {};
ol.xml.makeArraySerializer = _ol_xml$makeArraySerializer || {};
ol.xml.makeChildAppender = _ol_xml$makeChildAppender || {};
ol.xml.makeObjectPropertyPusher = _ol_xml$makeObjectPropertyPusher || {};
ol.xml.makeObjectPropertySetter = _ol_xml$makeObjectPropertySetter || {};
ol.xml.makeReplacer = _ol_xml$makeReplacer || {};
ol.xml.makeSequence = _ol_xml$makeSequence || {};
ol.xml.makeSimpleNodeFactory = _ol_xml$makeSimpleNodeFactory || {};
ol.xml.makeStructureNS = _ol_xml$makeStructureNS || {};
ol.xml.parse = _ol_xml$parse || {};
ol.xml.parseNode = _ol_xml$parseNode || {};
ol.xml.pushParseAndPop = _ol_xml$pushParseAndPop || {};
ol.xml.pushSerializeAndPop = _ol_xml$pushSerializeAndPop || {};
ol.xml.registerDocument = _ol_xml$registerDocument || {};
ol.xml.registerXMLSerializer = _ol_xml$registerXMLSerializer || {};
ol.xml.serialize = _ol_xml$serialize || {};

export default ol;
