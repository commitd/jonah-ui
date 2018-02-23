import * as React from 'react'
import { Feed, Segment } from 'semantic-ui-react'
import MentionSnippet from './MentionSnippet'
import { ActionDropdown } from 'invest-components'
import { Mention } from '../../types'
import { DOCUMENT_VIEW } from '../../Actions';

export type Props = {
    datasetId: string
    documentId: string,
    content: string
    mentions: Mention[]
}

class MentionsSnippet extends React.Component<Props> {

    render() {
        const { mentions, content } = this.props

        return (

            <Feed>
                <Segment basic={true} floated="right">
                    <ActionDropdown text="View" action={DOCUMENT_VIEW} onSelect={this.handleDocumentAction} />
                </Segment>
                {
                    mentions
                        .map(m => <MentionSnippet key={m.id} datasetId={this.props.datasetId} mention={m} content={content} />)
                }
            </Feed >
        )
    }

    private handleDocumentAction = (act: (payload: {}) => void) => {
        act({
            datasetId: this.props.datasetId,
            documentId: this.props.documentId
        })
    }
}

export default MentionsSnippet
