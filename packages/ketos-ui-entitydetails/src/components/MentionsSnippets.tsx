import * as React from 'react'
import { Feed, Segment } from 'semantic-ui-react'
import MentionSnippet from './MentionSnippet'
import { ActionDropdown } from 'invest-components'

type OwnProps = {
    datasetId: string
    documentId: string,
    content: string
    mentions: {
        id: string
        begin: number
        end: number
        value: string
        type: string
    }[]
}

type Props = OwnProps

class MentionsSnippet extends React.Component<Props> {

    render() {
        const { mentions, content } = this.props

        return (

            <Feed>
                <Segment basic={true} floated="right">
                    <ActionDropdown text="View" action="document.view" onSelect={this.handleDocumentAction} />
                </Segment>
                {
                    mentions
                        .map(m => <MentionSnippet key={m.id} mention={m} content={content} />)
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
