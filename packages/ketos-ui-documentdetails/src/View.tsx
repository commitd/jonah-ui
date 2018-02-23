import * as React from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'
import { Response } from './DataContainer'
import { DocumentMeta, DocumentInfo, EntityTable, RelationTable } from 'ketos-components'
import { Counter, Card, BarChart } from 'invest-components'

type Props = {
    data?: Response
}

export default class EntityView extends React.Component<Props> {

    render() {
        const { data } = this.props
        if (data == null) {
            return <div />
        }

        const document = data.corpus.document
        if (document == null) {
            return <p>Not found</p>
        }

        const datasetId = data.corpus.id

        // Generate barchart data from the raw entities
        const entityTypeCount = {}
        document.entities.map(e => {
            entityTypeCount[e.type] = entityTypeCount[e.type] == null ? 1 : entityTypeCount[e.type] + 1
        })
        const entityTypes = Object.keys(entityTypeCount).map(k => {
            return {
                x: k,
                y: entityTypeCount[k]
            }
        })

        return (
            <Container>
                <Header as="h1">{document.info.title}</Header>

                <p>{document.summary}</p>

                <Card title="Info">
                    <DocumentInfo
                        datasetId={datasetId}
                        documentId={document.id}
                        info={document.info}
                        length={document.length}
                    />
                </Card>

                <Card title="Statistics">
                    <Grid>
                        <Grid.Row columns={6}>
                            <Grid.Column>
                                <Counter value={document.entities.length} singular="entity" plural="entities" />
                            </Grid.Column>
                            <Grid.Column>
                                <Counter value={document.relations.length} singular="relation" plural="relations" />
                            </Grid.Column>
                            <Grid.Column>
                                <Counter
                                    value={document.metadata.length}
                                    singular="metadata value"
                                    plural="metadata values"
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <BarChart data={entityTypes} />
                        </Grid.Row>
                    </Grid>
                </Card>

                <Card title="Metadata">
                    <DocumentMeta
                        metadata={document.metadata}
                    />
                </Card>

                <Card title="Entities">
                    <EntityTable
                        datasetId={datasetId}
                        entities={document.entities}
                    />
                </Card>

                <Card title="Relations">
                    <RelationTable
                        datasetId={datasetId}
                        relations={document.relations}
                    />
                </Card>

            </Container>
        )
    }

}
