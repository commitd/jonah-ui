import * as React from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Card } from 'invest-components'

import DocumentContent from './DocumentContent'
import DocumentMeta from './DocumentMeta'
import DocumentInfo from './DocumentInfo'
import MentionTable from '../mentions/MentionTable'

export interface Document {
    id: string
    length: number
    info: {
        title: string
        language: string
        source: string
        type: string
        classification: string
        documentDate: number
    }
    content: string
    metadata: {
        key: string
        value: string
    }[]
    mentions: {
        begin: number
        end: number
        value: string
        type: number
        id: string,
        entityId: string
    }[]
}

export interface OwnProps {
    datasetId: string,
    document: Document
}

export type Props = OwnProps

export type State = {
    selectedMentions?: string[]
}

class DocumentReader extends React.Component<Props, State> {

    state: State = {
        selectedMentions: []
    }

    handleSelectedMentions = (mentions: string[]) => {
        this.setState({
            selectedMentions: mentions
        })
    }

    render() {
        const { datasetId, document } = this.props
        const { selectedMentions } = this.state

        return (
            <Grid>
                <Grid.Column width={10}>
                    <DocumentContent
                        content={document.content}
                        title={document.info.title}
                        mentions={document.mentions}
                        onMentionSelect={this.handleSelectedMentions}
                    />
                    {/* <Divider hidden={true} />
                    <h3>Mentions in document</h3>
                    <MentionTable
                        datasetId={datasetId}
                        mentions={document.mentions}
                        selectedMentions={selectedMentions}
                    /> */}
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