import * as React from 'react'
import { Grid, Table } from 'semantic-ui-react'
import { BarChart, TimelineChart, Card } from 'invest-components'
import { termBinsToXY, timeBinsToXY } from 'ketos-components'

import { Response } from '../DataContainer'

export type Props = {
    data?: Response
}

export default class Results extends React.Component<Props> {

    render() {
        const { data } = this.props
        if (!data || !data.corpus) {
            return <div />
        }

        const { documentTimeline, entityTimeline, entityTypes, entityValues, relationTypes } = data.corpus

        return (
            <Grid>
                <Grid.Row columns={1}>
                    {documentTimeline && <Grid.Column>
                        <Card title="Document timeline">
                            <TimelineChart data={timeBinsToXY(documentTimeline.bins)} />
                        </Card>
                    </Grid.Column>}
                </Grid.Row>
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
                        title="Entity values"
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
                <Grid.Row columns={1}><Grid.Column>
                    <Card
                        title="Relation types"
                    >
                        <BarChart data={termBinsToXY(relationTypes.bins)} />
                    </Card>
                </Grid.Column></Grid.Row>
            </Grid >
        )
    }
}
