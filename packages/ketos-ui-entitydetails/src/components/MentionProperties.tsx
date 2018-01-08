import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Ellipsis } from 'invest-components'

type Props = {
    mentions: {
        id: string,
        value: string,
        properties: {
            key: string,
            value: {}
        }[]
    }[]
}

class MentionProperties extends React.Component<Props> {

    render() {
        const { mentions } = this.props

        const totalProperties = mentions.reduceRight((a, b) => a + (b.properties || []).length, 0)

        if (totalProperties === 0) {
            return <p>No properties</p>
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Mention</Table.HeaderCell>
                        <Table.HeaderCell>Key</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>

                </Table.Header>
                <Table.Body>
                    {
                        mentions
                            .filter(m => m.properties != null && m.properties.length > 0)
                            .map(m => {
                                const properties = m.properties
                                const numProperties = m.properties.length
                                return properties.map((p, i) => {
                                    return <Table.Row key={`${m.id}-${p.key}`}>
                                        {i === 0 && <Table.Cell rowSpan={numProperties}>{m.value}</Table.Cell>}
                                        <Table.Cell>{p.key}</Table.Cell>
                                        <Table.Cell><Ellipsis text={JSON.stringify(p.value)} /> </Table.Cell>
                                    </Table.Row>
                                })

                            })

                    }
                </Table.Body>
            </Table>
        )
    }
}

export default MentionProperties