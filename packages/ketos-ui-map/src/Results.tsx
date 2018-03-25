import * as React from 'react'
import { SimpleMap, DocumentSearchResultsView } from 'ketos-components'
import { Response, LocationEntity, LocatedDocument } from './DataContainer'
import { GeoJSON, FeatureGroup } from 'react-leaflet'
import { GeoJsonObject } from 'geojson'
import { Layer, Circle, Map } from 'leaflet'
import { EditControl, EditControlEvent, DrawableShape } from 'react-leaflet-draw'
import { GeoRadius } from 'invest-types'

type Props = {
    data?: Response,
    onOffsetChanged(offset: number): void,
    onBoundsChanged(bounds?: GeoRadius): void
}

type State = {
    selectedLayer?: Layer
}

class Results extends React.Component<Props, State> {

    state: State = {}

    render() {
        const { data } = this.props

        if (!data || !data.corpus || data.corpus.searchDocuments.hits.results.length === 0) {
            return <p>No results</p>
        }

        const results = data.corpus.searchDocuments.hits.results

        // Group markers by geohashes

        const features = results.map(d => {
            return (d.entities || [])
                .filter(e => e.properties && e.properties.geoJson)
                .map(e => {
                    return (
                        <GeoJSON
                            key={d.id + '_' + e.id}
                            data={e.properties.geoJson as GeoJsonObject}
                            onEachFeature={this.handleFeatureClick(d, e)}
                        />
                    )
                })
        })
            .reduce((x, y) => x.concat(y), [])

        // const { selected } = this.state

        return (
            <div>
                <SimpleMap>
                    {<FeatureGroup>
                        <EditControl
                            position="topright"
                            // onEdited={this.handleEditPath}
                            onCreated={this.handleCreatePath}
                            // onDeleted={this.handleDeletePath}
                            draw={{
                                rectangle: false,
                                polygon: false,
                                polyline: false,
                                circle: true,
                                marker: false,
                                circlemarker: false
                            }}
                            edit={{
                                edit: false,
                                remove: true,
                                poly: false,
                                allowIntersection: false
                            }}
                        />
                    </FeatureGroup>}
                    {features}
                </SimpleMap>
                <DocumentSearchResultsView
                    datasetId={data.corpus.id}
                    offset={data.corpus.searchDocuments.hits.offset}
                    size={data.corpus.searchDocuments.hits.size}
                    total={data.corpus.searchDocuments.hits.total}
                    results={results}
                    onOffsetChange={this.props.onOffsetChanged}
                />
            </div>
        )
    }

    private handleFeatureClick = (d: LocatedDocument, e: LocationEntity) =>
        (feature: {}, layer: Layer) => {
            layer.bindPopup(e.value)
        }

    private handleCreatePath = (e: EditControlEvent<DrawableShape>) => {
        if (e.layerType === 'circle') {
            const r = e.layer as Circle
            const latLng = r.getLatLng()

            const bounds = {
                lat: latLng.lat,
                lon: latLng.lng,
                radius: r.getRadius()
            }

            this.setSelectedLayer(e.target as Map, r, bounds)
        } else {

            // If we get anything other than a supported type, clear the sample
            this.setSelectedLayer(e.target as Map, undefined, undefined)

        }
    }

    private setSelectedLayer = (map: Map, layer?: Layer, bounds?: GeoRadius) => {
        this.setState((state) => {

            // Remove the old selection from the map
            if (state.selectedLayer) {
                map.removeLayer(state.selectedLayer)
            }

            return {
                selectedLayer: layer
            }
        })

        // TODO: CLick to remove

        this.props.onBoundsChanged(bounds)
    }

}

export default Results
