import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import { PropertiesMap } from 'invest-types'
import { RELATION_VIEW, MENTION_VIEW } from '../../Actions'
import { Paginated } from 'invest-components'

export type OwnProps = {
    datasetId: string
    mentions: {
        id: string
        begin: number,
        end: number,
        type: string,
        value: string
        properties: PropertiesMap
        targetOf: {
            id: string
            type: string
            subType: string
            source: {
                value: string
                type: string
            }
        }[]
        sourceOf: {
            id: string
            type: string
            subType: string
            target: {
                value: string
                type: string
            }
        }[]
    }[]
}

export type Props = OwnProps

class RelatedMentionsTable extends React.Component<Props> {
    render() {
        const { mentions } = this.props

        const totalRelations = mentions.reduceRight(
            (a, b) => {
                return a + (b.sourceOf || []).length + (b.targetOf || []).length
            },
            0)

        if (totalRelations === 0) {
            return <p>No related mentions</p>
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>From</Table.HeaderCell>
                        <Table.HeaderCell>Relation</Table.HeaderCell>
                        <Table.HeaderCell>To</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        mentions.map(m => {
                            return m.sourceOf.map(r => {
                                return <Table.Row key={`${m.id}-${r.id}`}>
                                    <Table.Cell positive={true} content={m.value} />
                                    <Table.Cell content={`${r.type} ${r.subType}`} />
                                    <Table.Cell content={`${r.target.value} [${r.target.type}]`} />
                                    <Table.Cell>
                                        <ActionDropdown
                                            text="View"
                                            actions={[RELATION_VIEW, MENTION_VIEW]}
                                            onSelect={this.handleRelationAction(m.id, r.id)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            })
                        })
                    }
                    {
                        mentions.map(m => {
                            return m.targetOf.map(r => {
                                return <Table.Row key={`${m.id}-${r.id}`}>
                                    <Table.Cell content={`${r.source.value} [${r.source.type}]`} />
                                    <Table.Cell content={`${r.type} ${r.subType}`} />
                                    <Table.Cell positive={true} content={m.value} />
                                    <Table.Cell>
                                        <ActionDropdown
                                            text="View"
                                            actions={[RELATION_VIEW, MENTION_VIEW]}
                                            onSelect={this.handleRelationAction(m.id, r.id)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            })
                        })
                    }
                </Table.Body>
            </Table>
        )
    }

    private handleRelationAction = (mentionId: string, relationId: string) =>
        (act: (payload: {}) => void, action: string) => {
            if (action === MENTION_VIEW) {
                act({
                    datasetId: this.props.datasetId,
                    mentionId: mentionId
                })
            } else if (action === RELATION_VIEW) {
                act({
                    datasetId: this.props.datasetId,
                    relationId: relationId
                })
            }
        }
}

export default class PaginatedRelatedMentionsTable extends React.Component<Props> {
    render() {
        // NOTE this is paginated per mention not per relation
        return (
            <Paginated items={this.props.mentions} itemsKey="mentions">
                <RelatedMentionsTable
                    {...this.props}
                />
            </Paginated>
        )
    }
}