import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import Card from '../../general/ui/Card'

import DocumentContent from './DocumentContent'
import DocumentMeta from './DocumentMeta'
import DocumentInfo from './DocumentInfo'

export interface Document {
    id: string
    length: number
    title: string
    info: {
        language: string
        source: string
        type: string
        classification: string
        timestamp: string
    }
    content: string
    metadata: {
        key: string
        value: string[]
    }[]
}

export interface OwnProps {
    datasetId: string,
    document: Document
}

export type Props = OwnProps

class DocumentReader extends React.Component<Props> {

    render() {
        const { datasetId, document } = this.props

        return (
            <Grid>
                <Grid.Column width={10}>
                    <DocumentContent content={document.content} title={document.title} />
                </Grid.Column>
                <Grid.Column width={6}>
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
                </Grid.Column>
            </Grid>
        )
    }
}

export default DocumentReader