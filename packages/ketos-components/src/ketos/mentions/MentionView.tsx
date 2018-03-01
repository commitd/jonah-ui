import * as React from 'react'
import { Item, Segment } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import DocumentSnippet from '../document/DocumentSnippet'
import { Mention, BasicDocumentNode } from '../../types'
import { MENTION_VIEW, ENTITY_VIEW, RELATION_SEARCH, DOCUMENT_SEARCH, DOCUMENT_VIEW, MENTION_EDIT } from '../../Actions'

export type MentionResult = Mention & {
    document: BasicDocumentNode & {
        content: string
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
        if (action === MENTION_VIEW || action === MENTION_DELETE || action === MENTION_EDIT) {
            act({
                datasetId,
                mentionId: m.id
            })
        } else if (action === ENTITY_VIEW && m.entityId) {
            act({
                datasetId,
                entityId: this.props.mention.entityId
            })
        } else if (action === DOCUMENT_SEARCH && m.document) {
            act({
                datasetId,
                documentId: m.document.id
            })
        } else if (action === RELATION_SEARCH) {

            act({
                datasetId: this.props.datasetId,
                sourceType: m.type,
                sourceValue: m.value
            })
        }
    }

    render() {
        const { mention } = this.props
        const { type, subType, value, entityId, document } = mention

        const actions = [MENTION_VIEW, MENTION_EDIT, MENTION_DELETE]
        if (document != null) {
            actions.push(DOCUMENT_VIEW)
        }
        if (entityId != null) {
            actions.push(ENTITY_VIEW)
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
                        {type} {subType != null ? <span>: {subType}</span> : ''}
                    </Item.Description>
                    <Item.Extra>
                        {document != null && <span><b>{document.info.title}</b> {this.renderSnippet()}</span>}
                    </Item.Extra>
                </Item.Content >
            </Item >
        )
    }

    renderSnippet() {
        const m = this.props.mention
        if (m.document) {
            if (m.begin != null && m.end != null && m.document.content) {
                return <DocumentSnippet content={m.document.content} begin={m.begin} end={m.end} />
            } else if (m.document.summary) {
                return <span>: {m.document.summary}</span>
            }
        }

        return <span />

    }
}

export default MentionView