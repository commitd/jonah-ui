import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Response } from './DataContainer'
import { Pagination, ActionDropdown } from 'invest-components'
import { MENTION_VIEW, ENTITY_VIEW, DOCUMENT_VIEW, RELATION_VIEW } from 'ketos-components'

type Props = {
    data?: Response
    offset: number,
    size: number,
    onOffsetChange(offset: number): void
}

class Results extends React.Component<Props> {
    render() {

        const { data, offset, size } = this.props

        if (!data || !data.corpus || !data.corpus.relations || data.corpus.relations.length === 0) {
            return <p>No results found</p>
        }

        const relations = data.corpus.relations

        // TODO: This can be replaced with ketos-components RelationTable
        return (
            <div>
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
                                        {r.source.value} [{r.source.type}]
                                    </Table.Cell>

                                    <Table.Cell>{r.type}
                                        {r.subType != null && r.subType !== ''
                                            ? ': ' + r.subType : ''}</Table.Cell>
                                    <Table.Cell>{r.target.value} [{r.target.type}]</Table.Cell>
                                    <Table.Cell>
                                        <ActionDropdown
                                            text="Source"
                                            actions={[MENTION_VIEW, ENTITY_VIEW]}
                                            onSelect={this.handleMentionSelect(r.source.id, r.source.entityId)}
                                        />
                                        <ActionDropdown
                                            text="Relation"
                                            actions={[RELATION_VIEW]}
                                            onSelect={this.handleRelationSelect(r.id)}
                                        />
                                        <ActionDropdown
                                            text="Target"
                                            actions={[MENTION_VIEW, ENTITY_VIEW]}
                                            onSelect={this.handleMentionSelect(r.target.id, r.target.entityId)}
                                        />
                                        <ActionDropdown
                                            text="Document"
                                            actions={[DOCUMENT_VIEW]}
                                            onSelect={this.handleDocumentSelect(r.docId)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            })
                        }
                    </Table.Body>
                </Table>
                <Pagination
                    offset={offset}
                    size={size}
                    resultsOnPage={data.corpus.relations.length}
                    onOffsetChange={this.props.onOffsetChange}
                />
            </div>
        )
    }

    private handleMentionSelect = (mentionId: string, entityId: string) =>
        (act: (payload?: {}) => void, action: string) => {

            const datasetId = this.props.data && this.props.data.corpus && this.props.data.corpus.id

            if (datasetId == null) {
                return
            }

            if (action === MENTION_VIEW) {
                act({
                    datasetId,
                    mentionId
                })
            } else if (action === ENTITY_VIEW) {
                act({
                    datasetId,
                    entityId
                })
            }
        }

    private handleRelationSelect = (relationId: string) =>
        (act: (payload?: {}) => void, action: string) => {

            const datasetId = this.props.data && this.props.data.corpus && this.props.data.corpus.id

            if (datasetId == null) {
                return
            }

            if (action === RELATION_VIEW) {
                act({
                    datasetId,
                    relationId
                })
            }
        }

    private handleDocumentSelect = (documentId: string) =>
        (act: (payload?: {}) => void, action: string) => {

            const datasetId = this.props.data && this.props.data.corpus && this.props.data.corpus.id

            if (datasetId == null) {
                return
            }

            if (action === DOCUMENT_VIEW) {
                act({
                    datasetId,
                    documentId
                })
            }
        }
}

export default Results