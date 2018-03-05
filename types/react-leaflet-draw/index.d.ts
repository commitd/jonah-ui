
declare module 'react-leaflet-draw' {
    import * as React from 'react'
    import { Layer, Polygon, Map, Rectangle, Polyline, Circle, Marker, LayerGroup } from "leaflet"
    import { LayersControl, LayersControlProps, } from 'react-leaflet'

    export type DrawableType = "polyline" | "polygon" | "rectangle" | "circle" | "marker"
    export type DrawableShape = Polygon | Rectangle | Circle | Marker | Polyline


    export type EditControlEvent<D= {}> = {
        layerType: DrawableType,
        layer: DrawableShape,
        data: D,
        target: Map
    }

    export type EditControlProps = {
        onMounted?(): void,
        draw?: {
            polyline?: boolean | {}
            polygon?: boolean | {}
            rectangle?: boolean | {}
            circle?: boolean | {}
            circlemarker: boolean | {}
            marker?: boolean | {}
        }
        edit?: {
            edit?: boolean | {}
            remove?: boolean | {}
            poly?: boolean | {}
            allowIntersection?: boolean
        },
        position: 'topright' | 'topleft' | 'bottomright' | 'bottomleft'

        // Event handlers
        // TODO: Not too sure these are 100% the documentation is a bit odd in places
        onCreated?(e: EditControlEvent<DrawableShape>): void,
        onEdited?(e: EditControlEvent<LayerGroup>): void
        onDrawStart?(e: EditControlEvent<DrawableType>): void
        onDrawStop?(e: EditControlEvent<DrawableType>): void
        onDrawVertex?(e: EditControlEvent<LayerGroup>): void
        onEditStart?(e: EditControlEvent<DrawableType>): void
        onEditMove?(e: EditControlEvent<Layer>): void
        onEditResize?(e: EditControlEvent<Layer>): void
        onEditVertex?(e: EditControlEvent<LayerGroup>): void
        onEditStop?(e: EditControlEvent<DrawableType>): void
        onDeleted?(e: EditControlEvent<LayerGroup>): void
        onDeleteStart?(e: EditControlEvent<DrawableType>): void
        onDeleteStop?(e: EditControlEvent<DrawableType>): void
    }

    export class EditControl extends LayersControl<EditControlProps & LayersControlProps> { }
}