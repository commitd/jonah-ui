import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import {
    BasicCorpusNode, BasicDocumentNode, BasicEntityNode,
    BasicMentionNode, BasicRelationNode, DOCUMENT_VIEW, RELATION_VIEW, ENTITY_VIEW, MENTION_VIEW, CORPUS_VIEW
} from 'ketos-components'

type Props = {
    type: string
    datasetId: string
    data?: BasicEntityNode | BasicDocumentNode | BasicCorpusNode | BasicRelationNode | BasicMentionNode

}

export default class SelectionView extends React.Component<Props> {

    render() {
        const { type, data } = this.props

        const action = this.getActionFromType()
        return (
            <Table>
                <Table.Body>
                    <Table.Row><Table.Cell content={type} /></Table.Row>
                    {data && this.renderByType()}
                    {data && data.id && action && <Table.Row>
                        <Table.Cell>
                            <ActionDropdown key={data.id} action={action} text="View" onSelect={this.handleAction} />
                        </Table.Cell>
                    </Table.Row>}
                </Table.Body>
            </Table>
        )
    }

    private renderByType() {
        const data = this.props.data
        if (data == null) {
            return null
        }

        switch (this.props.type) {
            case 'Document': {
                const d = data as BasicDocumentNode
                return <Table.Row><Table.Cell content={d.info.title} /></Table.Row>
            }
            case 'Relation': {
                const d = data as BasicRelationNode
                return [
                    <Table.Row key="r.type"><Table.Cell content={d.type} /></Table.Row>,
                    <Table.Row key="r.value"><Table.Cell content={d.value} /></Table.Row>
                ]

            }
            case 'Entity': {
                const d = data as BasicEntityNode
                return [
                    <Table.Row key="e.type"><Table.Cell content={d.type} /></Table.Row>,
                    <Table.Row key="e.value"><Table.Cell content={d.value} /></Table.Row>
                ]
            }
            case 'Mention': {
                const d = data as BasicMentionNode
                return [
                    <Table.Row key="m.type"><Table.Cell content={d.type} /></Table.Row>,
                    <Table.Row key="m.value"><Table.Cell content={d.value} /></Table.Row>
                ]
            }
            case 'Dataset': {
                const d = data as BasicCorpusNode
                return (
                    <Table.Row><Table.Cell content={d.name} /></Table.Row>
                )
            }
            default:
                return null
        }
    }

    private getActionFromType() {
        switch (this.props.type) {
            case 'Document': return DOCUMENT_VIEW
            case 'Relation': return RELATION_VIEW
            case 'Entity': return ENTITY_VIEW
            case 'Mention': return MENTION_VIEW
            default:
                return null
        }
    }

    private handleAction = (act: (payload?: {}) => void, action: string) => {
        if (!this.props.data || !this.props.data.id) {
            return
        }

        const datasetId = this.props.datasetId
        const id = this.props.data.id

        if (action === DOCUMENT_VIEW) {
            act({
                datasetId,
                documentId: id
            })
        } else if (action === MENTION_VIEW) {
            act({
                datasetId,
                mentionId: id
            })
        } else if (action === ENTITY_VIEW) {
            act({
                datasetId,
                entityId: id
            })
        } else if (action === RELATION_VIEW) {
            act({
                datasetId,
                relationId: id
            })
        } else if (action === CORPUS_VIEW) {
            act({
                datasetId,
                corpusId: id
            })
        }
    }
}