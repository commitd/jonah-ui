import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'

export type Relation = {
    sourceId: string
    sourceValue: string
    sourceType: string
    sourceEntityId?: string
    targetId: string
    targetValue: string
    targetType: string
    targetEntityId?: string
    id: string,
    relationshipType: string
    relationSubtype?: string
    docId?: string
    type: string
}

export interface OwnProps {
    datasetId: string,
    relations: Relation[]
    selectedRelations?: string[]
}

export type Props = OwnProps

class RelationTable extends React.Component<Props> {

    render() {
        const { relations } = this.props

        const MENTION_ENTITY_ACTIONS = ['mention.view', 'entity.view']
        const MENTION_ACTIONS = ['mention.view']

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Source</Table.HeaderCell>
                        <Table.HeaderCell>Relation</Table.HeaderCell>
                        <Table.HeaderCell>Target</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        relations.map(r => {
                            return <Table.Row key={r.id}>
                                <Table.Cell>
                                    {r.sourceValue} [{r.sourceType}]
                            </Table.Cell>

                                <Table.Cell>{r.relationshipType}
                                    {r.relationSubtype != null && r.relationSubtype !== ''
                                        ? ': ' + r.relationSubtype : ''}</Table.Cell>
                                <Table.Cell>{r.targetValue} [{r.targetType}]</Table.Cell>
                                <Table.Cell>
                                    <ActionDropdown
                                        text="Source"
                                        actions={r.targetEntityId != null ? MENTION_ENTITY_ACTIONS : MENTION_ACTIONS}
                                        onSelect={this.handleMentionSelect(r.sourceId, r.sourceEntityId)}
                                    />
                                    <ActionDropdown
                                        text="Relation"
                                        actions={['relation.view']}
                                        onSelect={this.handleRelationSelect(r.id)}
                                    />
                                    <ActionDropdown
                                        text="Target"
                                        actions={r.targetEntityId != null ? MENTION_ENTITY_ACTIONS : MENTION_ACTIONS}
                                        onSelect={this.handleMentionSelect(r.targetId, r.targetEntityId)}
                                    />
                                    {r.docId && <ActionDropdown
                                        text="Document"
                                        actions={['document.view']}
                                        onSelect={this.handleDocumentSelect(r.docId)}
                                    />}
                                </Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table>
        )
    }

    private handleMentionSelect = (mentionId: string, entityId?: string) =>
        (act: (payload?: {}) => void, action: string) => {

            if (action === 'mention.view') {
                act({
                    datasetId: this.props.datasetId,
                    mentionId
                })
            } else if (action === 'entity.view') {
                act({
                    datasetId: this.props.datasetId,
                    entityId
                })
            }
        }

    private handleRelationSelect = (relationId: string) =>
        (act: (payload?: {}) => void, action: string) => {

            if (action === 'relation.view') {
                act({
                    datasetId: this.props.datasetId,
                    relationId
                })
            }
        }

    private handleDocumentSelect = (documentId: string) =>
        (act: (payload?: {}) => void, action: string) => {

            if (action === 'document.view') {
                act({
                    datasetId: this.props.datasetId,
                    documentId
                })
            }
        }
}

export default RelationTable