import * as React from 'react'
import { Grid, Table } from 'semantic-ui-react'
import { BarChart, TimelineChart, Card, termBinsToXY, timeBinsToXY } from 'invest-components'
import { SimpleMap } from 'ketos-components'
import { Marker, Tooltip } from 'react-leaflet'
import { Response } from './FilteredDataContainer'

export type Props = {
    data?: Response
}

export default class Results extends React.Component<Props> {

    render() {
        const { data } = this.props
        if (!data || !data.corpus) {
            return <div />
        }

        const { entityTimeline, entityTypes, entityValues, relationTypes, documentLocations } = data.corpus

        return (
            <Grid>

                <Grid.Row columns={1}>
                    {entityTimeline && <Grid.Column>
                        <Card title="Entities timeline">
                            <TimelineChart data={timeBinsToXY(entityTimeline.bins)} />
                        </Card>
                    </Grid.Column>}
                </Grid.Row>
                <Grid.Row columns={1}><Grid.Column>
                    <Card
                        title="Entity types"
                    >
                        <BarChart data={termBinsToXY(entityTypes.bins)} />
                    </Card>
                </Grid.Column></Grid.Row>
                <Grid.Row columns={1}><Grid.Column>
                    <Card
                        title="Relation types"
                    >
                        <BarChart data={termBinsToXY(relationTypes.bins)} />
                    </Card>
                </Grid.Column></Grid.Row>
                <Grid.Row columns={1}><Grid.Column>
                    <Card
                        title="Locations"
                    >
                        <SimpleMap>
                            {
                                documentLocations.map(k => {
                                    return <Marker
                                        key={k.geohash}
                                        position={{ lat: k.lat, lng: k.lon }}
                                    >
                                        <Tooltip>
                                            <p>{k.name}</p>
                                        </Tooltip>
                                    </Marker>
                                })
                            }
                        </SimpleMap>
                    </Card>
                </Grid.Column></Grid.Row>
                <Grid.Row columns={1}><Grid.Column>
                    <Card
                        title="Top Entity values"
                    >
                        <Table>
                            <Table.Body>
                                {entityValues.bins.map(b =>
                                    <Table.Row key={b.term}>
                                        <Table.Cell content={b.term} />
                                        <Table.Cell content={b.count} />
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>

                    </Card>
                </Grid.Column></Grid.Row>
            </Grid >
        )
    }

}
