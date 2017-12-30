import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Card, PieChart } from 'invest-components'

type MetadataValue = {
    value: string
    count: number
}

type OwnProps = {
    metadataKey: string
    metadataValues: MetadataValue[]
    maxValues: number
}

type Props = OwnProps

type State = {
    selectedKey?: string
}

function countToXY(values: MetadataValue[], maxValues: number): { x: string, y: number }[] {

    const sorted = [...values].sort((a, b) => a.count - b.count)
    const topN = sorted.slice(0, maxValues)

    return topN.map(v => ({
        x: v.value.length > 10 ? v.value.substring(0, 7) + '...' : v.value,
        y: v.count
    }))
}

class View extends React.Component<Props, State> {

    state: State = {
        selectedKey: undefined
    }

    handleMetadataKey = (key?: string) => {
        this.setState({
            selectedKey: key
        })
    }

    render() {
        const { metadataKey, metadataValues, maxValues } = this.props

        if (metadataValues.length === 0) {
            return <p>No values associated with {metadataKey}</p>
        }

        // TODO: This is a bot of a hack.. we might legimately have exactly maxValues number of values
        const isEverything = metadataValues.length < (maxValues - 1)
        const numberToDisplay = isEverything ? metadataValues.length : maxValues - 1

        return (
            <div>
                <Card title="Summary">
                    <PieChart data={countToXY(metadataValues, 16)} />
                </Card>
                <Card
                    title={maxValues === metadataValues.length
                        ? `Top ${numberToDisplay} values` : `${numberToDisplay} values`}
                >
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Value</Table.HeaderCell>
                                <Table.HeaderCell textAlign="right">Count</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {metadataValues.map(v =>

                                <Table.Row key={v.value}>
                                    <Table.Cell>{v.value}</Table.Cell>
                                    <Table.Cell textAlign="right">{v.count}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Card>
            </div>
        )
    }
}

export default View