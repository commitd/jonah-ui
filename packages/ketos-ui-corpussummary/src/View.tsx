import { BarChart, Card, Counter, PieChart, TimelineChart, termBinsToXY, timeBinsToXY } from 'invest-components'
import * as React from 'react'
import { Grid } from 'semantic-ui-react'
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

    return (
      <div>
        <Grid>
          <Grid.Row stretched={true}>
            {numDocuments != null && (
              <Grid.Column computer={4} tablet={8} mobile={16}>
                <Counter value={numDocuments || 0} singular="document" plural="documents" />
              </Grid.Column>
            )}
            {numMentions != null && (
              <Grid.Column computer={4} tablet={8} mobile={16}>
                <Counter value={numMentions || 0} singular="mention" plural="mentions" />
              </Grid.Column>
            )}
            {numEntities != null && (
              <Grid.Column computer={4} tablet={8} mobile={16}>
                <Counter value={numEntities || 0} singular="entity" plural="entities" />
              </Grid.Column>
            )}
            {numRelations != null && (
              <Grid.Column computer={4} tablet={8} mobile={16}>
                <Counter value={numRelations || 0} singular="relation" plural="relations" />
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={1}>
            {documentTimeline &&
              documentTimeline.length > 1 && (
                <Grid.Column>
                  <Card title="Document timeline">
                    <TimelineChart data={timeBinsToXY(documentTimeline)} />
                  </Card>
                </Grid.Column>
              )}
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={3} centered={true}>
            {documentTypes && (
              <Grid.Column computer={5} tablet={16} mobile={16}>
                <Card title="Types">
                  {documentTypes.length > 0 ? (
                    <PieChart data={termBinsToXY(documentTypes)} />
                  ) : (
                    <p>
                      <b>No data</b>
                    </p>
                  )}
                </Card>
              </Grid.Column>
            )}
            {documentLanguages && (
              <Grid.Column computer={5} tablet={16} mobile={16}>
                <Card title="Languages">
                  {documentLanguages.length > 0 ? (
                    <PieChart data={termBinsToXY(documentLanguages)} />
                  ) : (
                    <p>
                      <b>No data</b>
                    </p>
                  )}
                </Card>
              </Grid.Column>
            )}
            {documentClassifications && (
              <Grid.Column computer={5} tablet={16} mobile={16}>
                <Card title="Classifications">
                  {documentClassifications.length > 0 ? (
                    <PieChart data={termBinsToXY(documentClassifications)} />
                  ) : (
                    <p>
                      <b>No data</b>
                    </p>
                  )}
                </Card>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
        {mentionTypes && (
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Card title="Mention types" subTitle={`${mentionTypes.length} mention types within the corpus`}>
                  <BarChart data={termBinsToXY(mentionTypes)} />
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    )
  }
}

export default View
