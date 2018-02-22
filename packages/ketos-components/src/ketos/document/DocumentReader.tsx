import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import { Card } from 'invest-components'

import DocumentContent from './DocumentContent'
import DocumentInfo from './DocumentInfo'

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
        // const { selectedMentions } = this.state

        return (
            <Grid>
                <Grid.Column width={10}>
                    <DocumentContent
                        content={document.content}
                        title={document.info.title}
                        mentions={document.mentions}
                        onMentionSelect={this.handleSelectedMentions}
                    />
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

                </Grid.Column>
            </Grid>
        )
    }
}

export default DocumentReader