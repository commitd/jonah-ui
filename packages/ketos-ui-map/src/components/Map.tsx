import * as React from 'react'
import { Map, TileLayer } from 'react-leaflet'

type OwnProps = {
    url?: string
    center?: {
        lat: number,
        lng: number,
    }
    zoom?: number

}

type Props = OwnProps

class SimpleMap extends React.Component<Props> {

    render() {

        let { center, zoom, url } = this.props

        url = url ? url : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        center = center ? center : { lat: 0, lng: 0 }
        zoom = zoom ? zoom : 2

        const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
            </ Map>)
    }
}

export default SimpleMap
