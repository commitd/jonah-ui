import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Ellipsis } from 'invest-components'
import { PropertiesMap } from 'invest-types'
import { Paginated } from 'invest-components'

export type Props = {
    mentions: {
        id: string,
        value: string,
        properties: PropertiesMap
    }[]
}

class MentionProperties extends React.Component<Props> {

    render() {
        const { mentions } = this.props

        const totalProperties = mentions.reduceRight((a, b) => a + (Object.keys(b.properties || {}).length), 0)

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
                                return Object.keys(properties).map((k, i) => {
                                    return <Table.Row key={`${m.id}-${k}`}>
                                        {i === 0 && <Table.Cell rowSpan={numProperties}>{m.value}</Table.Cell>}
                                        <Table.Cell>{k}</Table.Cell>
                                        <Table.Cell><Ellipsis text={JSON.stringify(properties[k])} /> </Table.Cell>
                                    </Table.Row>
                                })

                            })

                    }
                </Table.Body>
            </Table>
        )
    }
}

export default class PaginatedMentionProperties extends React.Component<Props> {
    render() {
        // NOTE this is paginated per mention not per relation
        return (
            <Paginated items={this.props.mentions} itemsKey="mentions">
                <MentionProperties
                    {...this.props}
                />
            </Paginated>
        )
    }
}