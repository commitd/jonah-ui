import * as React from 'react'
import { SimpleMap } from 'ketos-components'
import { Response } from './DataContainer'
import { Marker, Tooltip } from 'react-leaflet'
import { decode } from 'latlon-geohash'
import { Segment, Card } from 'semantic-ui-react'

type Props = {
    data?: Response
}

type MarkerInfo = {
    geohash: string
    names: string[]
    documents: {
        // Document info
        id: string
        summary: string
        // Original POI info
        name: string
        lat: number
        lon: number
    }[]
}

type State = {
    selected?: MarkerInfo
}

class Results extends React.Component<Props, State> {

    state: State = {
        selected: undefined
    }

    handleClick = (v: MarkerInfo) => {
        this.setState({
            selected: v
        })
    }

    render() {
        const { data } = this.props

        if (data == null || data.corpus.searchDocuments.hits.results.length === 0) {
            return <p>No results</p>
        }

        const results = data.corpus.searchDocuments.hits.results

        // Group markers by geohashes

        const geohashes: { [id: string]: MarkerInfo } = {}

        results.forEach(d => {
            d.locations.forEach(l => {
                let v = geohashes[l.geohash]
                if (v == null) {
                    v = {
                        geohash: l.geohash,
                        names: [],
                        documents: []
                    }
                    geohashes[l.geohash] = v
                }

                if (!v.names.includes(l.name)) {
                    v.names.push(l.name)
                }

                // TODO: Check the document is not already in? or is it ok to have multiple?
                v.documents.push({
                    id: d.id,
                    summary: d.summary,
                    name: l.name,
                    lat: l.lat,
                    lon: l.lon
                })
            })

        })

        const { selected } = this.state

        return (
            <div>
                <SimpleMap>
                    {
                        Object.keys(geohashes).map(k => {
                            const v = geohashes[k]
                            const { lat, lon } = decode(v.geohash)
                            return <Marker
                                key={k}
                                position={{ lat: lat, lng: lon }}
                                onclick={() => this.handleClick(v)}
                            >
                                <Tooltip>
                                    <p>{v.names.join('; ')}</p>
                                </Tooltip>
                            </Marker>
                        })
                    }
                </SimpleMap>

                {selected && <Segment>
                    {selected.documents.map(d =>
                        <Card
                            fluid={true}
                            key={selected.geohash + '-' + d.id}
                            header={d.name}
                            description={d.summary}
                        />)
                    }
                </Segment>}
            </div>
        )
    }
}

export default Results
