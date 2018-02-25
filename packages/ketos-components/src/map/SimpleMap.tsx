import * as React from 'react'
import { Map, TileLayer } from 'react-leaflet'

export type Props = {
    url: string,
    attribution: string,
    center?: {
        lat: number,
        lng: number,
    }
    zoom?: number
}

export default class SimpleMap extends React.Component<Props> {

    render() {

        let { center, zoom, url, attribution } = this.props
        center = center ? center : { lat: 0, lng: 0 }
        zoom = zoom ? zoom : 2

        return (
            <Map
                center={center}
                zoom={zoom}
                style={{
                    width: '100%', height: '700px'
                }}
            >
                <TileLayer
                    url={url}
                    attribution={attribution}
                />
                {
                    this.props.children
                }
            </Map>)
    }
}
