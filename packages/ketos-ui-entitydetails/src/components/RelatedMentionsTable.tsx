import * as React from 'react'
import { Table } from 'semantic-ui-react'

type OwnProps = {
    mentions: {
        id: string
        begin: number,
        end: number,
        type: string,
        value: string
        properties: {
            key: string,
            value: {}
        }[]
        targetOf: {
            id: string
            relationshipType: string
            relationSubtype: string
            source: {
                value: string
                type: string
            }
        }[]
        sourceOf: {
            id: string
            relationshipType: string
            relationSubtype: string
            type: string
            target: {
                value: string
                type: string
            }
        }[]
    }[]
}

type Props = OwnProps

class RelatedMentionsTable extends React.Component<Props> {
    render() {
        const { mentions } = this.props

        const totalRelations = mentions.reduceRight(
            (a, b) => {
                return a + (b.sourceOf || []).length + (b.targetOf || []).length
            },
            0)

        if (totalRelations === 0) {
            return <p>No related entities</p>
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>From</Table.HeaderCell>
                        <Table.HeaderCell>Relation</Table.HeaderCell>
                        <Table.HeaderCell>To</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        mentions.map(m => {
                            m.sourceOf.map(r => {
                                return <Table.Row key={`${m.id}-${r.id}`}>
                                    <Table.Cell positive={true} content={m.value} />
                                    <Table.Cell content={`${r.relationshipType} ${r.relationSubtype}`} />
                                    <Table.Cell content={`${r.target.value} [${r.target.type}]`} />
                                </Table.Row>
                            })

                            m.targetOf.map(r => {
                                return <Table.Row key={`${m.id}-${r.id}`}>
                                    <Table.Cell content={`${r.source.value} [${r.source.type}]`} />
                                    <Table.Cell content={`${r.relationshipType} ${r.relationSubtype}`} />
                                    <Table.Cell positive={true} content={m.value} />
                                </Table.Row>
                            })
                        })
                    }
                </Table.Body>
            </Table>
        )
    }
}

export default RelatedMentionsTable