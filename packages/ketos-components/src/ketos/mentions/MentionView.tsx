import * as React from 'react'
import { Item, Segment } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'

export interface MentionResult {
    id: string
    type: string
    value: string
    entityId?: string
    document?: {
        id: string
        title: string
        summary: string
    }
}

export type Props = {
    datasetId: string,
    mention: MentionResult,
}

class MentionView extends React.Component<Props> {

    handleActions = (act: (payload?: {}) => void, action: string) => {
        const datasetId = this.props.datasetId

        if (action === 'mention.view') {
            act({
                datasetId,
                mentionId: this.props.mention.id
            })
        } else if (action === 'entity.view' && this.props.mention.entityId) {
            act({
                datasetId,
                entityId: this.props.mention.entityId
            })
        } else if (action === 'document.view' && this.props.mention.document) {
            act({
                datasetId,
                documentId: this.props.mention.document.id
            })
        }
    }

    render() {
        const { mention } = this.props
        const { type, value, entityId, document } = mention

        const actions = ['mentions.view']
        if (document != null) {
            actions.push('document.view')
        }
        if (entityId != null) {
            actions.push('entity.view')
        }

        return (
            <Item>
                <Item.Content>
                    <Segment basic={true} floated="right">
                        <ActionDropdown text="Action" actions={actions} onSelect={this.handleActions} />
                    </Segment>
                    <Item.Header>
                        {value}
                    </Item.Header>
                    <Item.Description>
                        {type}
                    </Item.Description>
                    <Item.Extra>
                        {document != null && <span><b>{document.title}</b>: {document.summary}</span>}
                    </Item.Extra>
                </Item.Content >
            </Item >
        )
    }
}

export default MentionView