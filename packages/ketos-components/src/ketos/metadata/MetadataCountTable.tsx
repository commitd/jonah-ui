import * as React from 'react'
import { Table } from 'semantic-ui-react'

export type OwnProps = {
    counts: {
        key: string
        count: number
    }[]
    selected?: string,
    onSelect?(key: string): void
}

export type Props = OwnProps

class MetadataCountTable extends React.Component<Props> {

    handleSelect = (key: string) => () => {
        if (this.props.onSelect) {
            this.props.onSelect(key)
        }
    }

    render() {
        const { counts, selected } = this.props

        if (!counts || counts.length === 0) {
            return <p>No metadata count</p>
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Key</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Count</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {counts.map(d => <Table.Row
                        key={d.key}
                        onClick={this.handleSelect(d.key)}
                        active={selected === d.key}
                    >
                        <Table.Cell>{d.key}</Table.Cell>
                        <Table.Cell textAlign="right">{d.count}</Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table >
        )
    }
}

export default MetadataCountTable