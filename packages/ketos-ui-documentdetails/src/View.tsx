import * as React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Response } from './DataContainer'
import { DocumentMeta, DocumentInfo, EntityTable, RelationTable } from 'ketos-components'
import { Card } from 'invest-components'

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

        return (
            <Container>
                <Header as="h1">{document.info.title}</Header>

                <p>{document.summary}</p>

                <Card title="Info">
                    <DocumentInfo
                        datasetId={datasetId}
                        documentId={document.id}
                        length={document.length}
                        source={document.info.source}
                        type={document.info.type}
                        language={document.info.language}
                    />
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
