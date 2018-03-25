import * as React from 'react'

import { Grid } from 'semantic-ui-react'
import { Counter, PieChart, BarChart, TimelineChart, Card, termBinsToXY, timeBinsToXY } from 'invest-components'

import { Response } from './DataContainer'

type OwnProps = {
    data?: Response
}

type Props = OwnProps

class View extends React.Component<Props> {

    render() {

        const { data } = this.props

        if (!data || !data.corpus) {
            return 'No data'
        }

        const numDocuments = data.corpus.countDocuments
        const numMentions = data.corpus.countMentions
        const numEntities = data.corpus.countEntities
        const numRelations = data.corpus.countRelations
        const documentTypes = data.corpus.documentTypes.bins
        const documentLanguages = data.corpus.documentLanguages.bins
        const documentClassifications = data.corpus.documentClassifications.bins
        const mentionTypes = data.corpus.mentionTypes.bins
        const documentTimeline = data.corpus.documentTimeline.bins.map(b => ({ ts: Date.parse(b.ts), count: b.count }))

        const numEvents = null

        return (
            <div >
                <Grid>
                    <Grid.Row columns={5}>
                        {numDocuments != null && <Grid.Column>
                            <Counter value={numDocuments || 0} singular="document" plural="documents" />
                        </Grid.Column>}
                        {numMentions != null && <Grid.Column>
                            <Counter value={numMentions || 0} singular="mention" plural="mentions" />
                        </Grid.Column>}
                        {numEntities != null && <Grid.Column>
                            <Counter value={numEntities || 0} singular="entity" plural="entities" />
                        </Grid.Column>}
                        {numRelations != null && <Grid.Column>
                            <Counter value={numRelations || 0} singular="relation" plural="relations" />
                        </Grid.Column>}
                        {numEvents != null && <Grid.Column>
                            <Counter value={numEvents || 0} singular="event" plural="events" />
                        </Grid.Column>}
                    </Grid.Row>
                </Grid>
                <Grid>
                    <Grid.Row columns={1}>
                        {documentTimeline && documentTimeline.length > 1 && <Grid.Column>
                            <Card title="Document timeline">
                                <TimelineChart data={timeBinsToXY(documentTimeline)} />
                            </Card>
                        </Grid.Column>}
                    </Grid.Row>
                </Grid>
                <Grid><Grid.Row columns={3}>
                    {documentTypes && <Grid.Column>
                        <Card title="Types"><PieChart data={termBinsToXY(documentTypes)} /></Card>
                    </Grid.Column>}
                    {documentLanguages && <Grid.Column>
                        <Card title="Languages"><PieChart data={termBinsToXY(documentLanguages)} /></Card>
                    </Grid.Column>}
                    {documentClassifications && <Grid.Column>
                        <Card title="Classifications">
                            <PieChart data={termBinsToXY(documentClassifications)} />
                        </Card>
                    </Grid.Column>}
                </Grid.Row>
                </Grid>
                {mentionTypes && <Grid><Grid.Row columns={1}><Grid.Column>
                    <Card
                        title="Mention types"
                        subTitle={`${mentionTypes.length} mention types within the corpus`}
                    >
                        <BarChart data={termBinsToXY(mentionTypes)} />
                    </Card>
                </Grid.Column></Grid.Row></Grid>}

            </div>
        )
    }
}

export default View