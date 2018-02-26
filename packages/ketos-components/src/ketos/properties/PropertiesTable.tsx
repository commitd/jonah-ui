import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Ellipsis } from 'invest-components'
import { PropertiesMap } from 'invest-types'

export type Props = {
    properties: PropertiesMap

}

class PropertiesTable extends React.Component<Props> {

    render() {
        const { properties } = this.props
        const totalProperties = properties.length

        if (totalProperties === 0) {
            return <p>No properties</p>
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Key</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        Object.keys(properties)
                            .map(k => ({ key: k, value: properties[k] }))
                            .filter(p => p.value !== null && p.key !== null)
                            // discard this internal Blaeen thing
                            .filter(p => p.key !== 'isNormalised')
                            .map((p, i) => {
                                return <Table.Row key={`${p.key}-${i}`}>
                                    <Table.Cell>{p.key}</Table.Cell>
                                    <Table.Cell><Ellipsis text={JSON.stringify(p.value)} /> </Table.Cell>
                                </Table.Row>
                            })
                    }
                </Table.Body>
            </Table>
        )
    }
}

export default PropertiesTable