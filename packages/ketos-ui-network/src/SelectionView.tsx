import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import { BasicMentionNode, BasicDocumentNode, BasicEntityNode, BasicCorpusNode, BasicRelationNode } from './Queries'

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
            case 'Document': return 'document.view'
            case 'Relation': return 'relation.view'
            case 'Entity': return 'entity.view'
            case 'Mention': return 'mention.view'
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

        if (action === 'document.view') {
            act({
                datasetId,
                documentId: id
            })
        } else if (action === 'mention.view') {
            act({
                datasetId,
                mentionId: id
            })
        } else if (action === 'entity.view') {
            act({
                datasetId,
                entityId: id
            })
        } else if (action === 'relation.view') {
            act({
                datasetId,
                relationId: id
            })
        } else if (action === 'corpus.view') {
            act({
                datasetId,
                corpusId: id
            })
        }
    }
}