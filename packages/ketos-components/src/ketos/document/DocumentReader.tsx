import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import { Card } from 'invest-components'

import DocumentContent from './DocumentContent'
import DocumentInfo from './DocumentInfo'
import { BasicDocumentNode, BasicDocumentInfo, Metadata, Mention } from '../../types'
import SelectedMentions from '../mentions/SelectedMentions'

export type Document = BasicDocumentNode & {
    length: number
    content: string
    info: BasicDocumentInfo
    metadata: Metadata[]
    mentions: Mention[]
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

        const mentions = document.mentions

        return (
            <Grid>
                <Grid.Column width={10}>
                    <DocumentContent
                        content={document.content}
                        title={document.info.title}
                        mentions={document.mentions}
                        onMentionSelect={this.handleSelectedMentions}
                        selectedMentions={selectedMentions}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Card title="Info">
                        <DocumentInfo
                            datasetId={datasetId}
                            documentId={document.id}
                            info={document.info}
                        />
                    </Card>
                    {mentions && <Card title="Selected mentions">
                        {selectedMentions && selectedMentions.length > 0
                            && <SelectedMentions
                                datasetId={datasetId}
                                selectedMentions={selectedMentions}
                                mentions={document.mentions}
                            />}
                        {!selectedMentions && <p>Click on the underlined mention in the text to select</p>}
                    </Card>}

                </Grid.Column>
            </Grid>
        )
    }
}

export default DocumentReader