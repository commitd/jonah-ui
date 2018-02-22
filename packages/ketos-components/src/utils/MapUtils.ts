import { Icon, Marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export function setupLeaflet() {

    // Fix for Leaflet data urls which result from WebPack
    // https://github.com/Leaflet/Leaflet/issues/4968

    const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png')
    const iconUrl = require('leaflet/dist/images/marker-icon.png')
    const shadowUrl = require('leaflet/dist/images/marker-shadow.png')
    Icon.Default.imagePath = ''
    Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl
    })
    Marker.prototype.options.icon = new Icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    })
}