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
        summary: string
        info: {
            title: string
        }
    }
}

export type Props = {
    datasetId: string,
    mention: MentionResult,
}

class MentionView extends React.Component<Props> {

    handleActions = (act: (payload?: {}) => void, action: string) => {
        const datasetId = this.props.datasetId
        const m = this.props.mention
        if (action === 'mention.view') {
            act({
                datasetId,
                mentionId: m.id
            })
        } else if (action === 'entity.view' && m.entityId) {
            act({
                datasetId,
                entityId: this.props.mention.entityId
            })
        } else if (action === 'document.view' && m.document) {
            act({
                datasetId,
                documentId: m.document.id
            })
        } else if (action === 'relation.search') {

            act({
                datasetId: this.props.datasetId,
                sourceType: m.type,
                sourceValue: m.value
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
                        {document != null && <span><b>{document.info.title}</b>: {document.summary}</span>}
                    </Item.Extra>
                </Item.Content >
            </Item >
        )
    }
}

export default MentionView