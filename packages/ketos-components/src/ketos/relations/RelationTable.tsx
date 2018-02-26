import * as React from 'react'
import { Segment, Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import { RelationWithMentionsNode } from '../../types'
import { MENTION_VIEW, ENTITY_VIEW, RELATION_VIEW, DOCUMENT_VIEW } from '../../Actions'

export interface OwnProps {
    datasetId: string,
    relations: RelationWithMentionsNode[]
    selectedRelations?: string[]
}

export type Props = OwnProps

export default class RelationTable extends React.Component<Props> {

    render() {
        const { relations } = this.props

        const MENTION_ENTITY_ACTIONS = [MENTION_VIEW, ENTITY_VIEW]
        const MENTION_ACTIONS = [MENTION_VIEW]

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
                                <Table.Cell width={4}>
                                    {r.source.value} [{r.source.type}]

                                </Table.Cell>

                                <Table.Cell width={4}>{r.type}
                                    {r.subType != null && r.subType !== ''
                                        ? '[ ' + r.subType + ']' : ''}
                                    {r.value != null ? ': ' + r.value : ''}
                                </Table.Cell>
                                <Table.Cell width={4}>{r.target.value} [{r.target.type}]

                                </Table.Cell>
                                <Table.Cell width={4}>
                                    <ActionDropdown
                                        text="Source"
                                        actions={r.target.entityId != null ? MENTION_ENTITY_ACTIONS : MENTION_ACTIONS}
                                        onSelect={this.handleMentionSelect(r.source.id, r.source.entityId)}
                                    />
                                    <ActionDropdown
                                        text="Target"
                                        actions={r.target.entityId != null ? MENTION_ENTITY_ACTIONS : MENTION_ACTIONS}
                                        onSelect={this.handleMentionSelect(r.target.id, r.target.entityId)}
                                    />
                                    <ActionDropdown
                                        text="Relation"
                                        actions={[RELATION_VIEW]}
                                        onSelect={this.handleRelationSelect(r.id)}
                                    />
                                    {r.docId && <ActionDropdown
                                        text="Document"
                                        actions={[DOCUMENT_VIEW]}
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

            if (action === MENTION_VIEW) {
                act({
                    datasetId: this.props.datasetId,
                    mentionId
                })
            } else if (action === ENTITY_VIEW) {
                act({
                    datasetId: this.props.datasetId,
                    entityId
                })
            }
        }

    private handleRelationSelect = (relationId: string) =>
        (act: (payload?: {}) => void, action: string) => {

            if (action === RELATION_VIEW) {
                act({
                    datasetId: this.props.datasetId,
                    relationId
                })
            }
        }

    private handleDocumentSelect = (documentId: string) =>
        (act: (payload?: {}) => void, action: string) => {

            if (action === DOCUMENT_VIEW) {
                act({
                    datasetId: this.props.datasetId,
                    documentId
                })
            }
        }
}
