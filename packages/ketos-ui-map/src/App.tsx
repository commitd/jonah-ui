import * as React from 'react'
import { ChildProps } from 'invest-plugin'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

type OwnProps = {}

type Props = OwnProps & ChildProps

class App extends React.Component<Props> {

  render() {
    const position = { lat: 51.897806, lng: -2.071795 }

    const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={attribution}
        />
        <Marker position={position}>
          <Popup>
            <span>Committed</span>
          </Popup>
        </Marker>
      </Map>)
  }
}

export default App
