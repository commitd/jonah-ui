import * as React from 'react'

import { Grid } from 'semantic-ui-react'
import { Counter, PieChart, BarChart, TimelineChart, Card, TermBin, TimeBin, termBinToXY, timeBinToXY } from 'invest-components'

type OwnProps = {
    numDocuments?: number,
    numEntities?: number,
    numRelations?: number,
    numMentions?: number,
    numEvents?: number,
    documentTypes?: TermBin[],
    documentLanguages?: TermBin[],
    documentClassifications?: TermBin[],
    mentionTypes?: TermBin[],
    documentTimeline?: TimeBin[],
}

type Props = OwnProps

class View extends React.Component<Props> {

    render() {

        const { numDocuments, numMentions, numEntities, numRelations,
            documentClassifications, documentLanguages,
            numEvents, documentTypes, mentionTypes, documentTimeline } = this.props

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
                        {documentTimeline && <Grid.Column>
                            <Card title="Document timeline">
                                <TimelineChart data={termBinToXY(documentTimeline)} />
                            </Card>
                        </Grid.Column>}
                    </Grid.Row>
                </Grid>
                <Grid><Grid.Row columns={3}>
                    {documentTypes && <Grid.Column>
                        <Card title="Types"><PieChart data={termBinToXY(documentTypes)} /></Card>
                    </Grid.Column>}
                    {documentLanguages && <Grid.Column>
                        <Card title="Languages"><PieChart data={termBinToXY(documentLanguages)} /></Card>
                    </Grid.Column>}
                    {documentClassifications && <Grid.Column>
                        <Card title="Classifications">
                            <PieChart data={termBinToXY(documentClassifications)} />
                        </Card>
                    </Grid.Column>}
                </Grid.Row>
                </Grid>
                {mentionTypes && <Grid><Grid.Row columns={1}><Grid.Column>
                    <Card
                        title="Mention types"
                        subTitle={`${mentionTypes.length} mention types within the corpus`}
                    >
                        <BarChart data={termBinToXY(mentionTypes)} />
                    </Card>
                </Grid.Column></Grid.Row></Grid>}

            </div>
        )
    }
}

export default View