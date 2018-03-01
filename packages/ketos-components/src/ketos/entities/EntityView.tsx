import * as React from 'react'
import { Item, Segment } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import { BasicEntityNode, BasicDocumentNode } from '../../types'
import { DOCUMENT_VIEW, ENTITY_VIEW, ENTITY_EDIT, ENTITY_DELETE } from '../../Actions'

export type Props = {
    datasetId: string,
    entity: BasicEntityNode & {
        document: BasicDocumentNode
    }
}

class EntityView extends React.Component<Props> {

    handleActions = (act: (payload?: {}) => void, action: string) => {
        const datasetId = this.props.datasetId
        const e = this.props.entity
        if (e.id && (action === ENTITY_VIEW || action === ENTITY_EDIT || action === ENTITY_DELETE)) {
            act({
                datasetId,
                entityId: e.id
            })
        } else if (action === DOCUMENT_VIEW && e.document) {
            act({
                datasetId,
                documentId: e.document.id
            })
        }
    }

    render() {
        const { entity } = this.props
        const { type, value, document } = entity

        const actions = [ENTITY_VIEW, ENTITY_EDIT, ENTITY_DELETE]
        if (document != null) {
            actions.push(DOCUMENT_VIEW)
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
                        {document != null && <span><b>{document.info.title}</b> {this.renderSnippet()}</span>}
                    </Item.Extra>
                </Item.Content >
            </Item >
        )
    }

    private renderSnippet() {
        if (this.props.entity.document) {
            return <span>: {this.props.entity.document.summary}</span>
        } else {
            return <span />
        }
    }
}

export default EntityView