import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import { BasicEntityNode } from '../../types'

export interface Props {
    datasetId: string,
    entities: BasicEntityNode[],
    selectedIds?: string[]
}

export default class EntityTable extends React.Component<Props> {

    render() {
        const { entities, selectedIds } = this.props

        const selected = selectedIds != null ? selectedIds : []

        return (
            <div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Type
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Value
                            </Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            entities.map(m =>
                                <Table.Row key={m.id} positive={selected.includes(m.id)} >
                                    <Table.Cell>
                                        {m.type}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {m.value}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ActionDropdown
                                            text="View"
                                            actions={['entity.view', 'entity.search',
                                                'mention.search']}
                                            onSelect={this.handleAction(m)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
            </div>
        )
    }

    private handleAction = (m: BasicEntityNode) => (act: (payload?: {}) => void, action: string) => {
        if (action === 'entity.view') {
            act({
                datasetId: this.props.datasetId,
                entityId: m.id
            })
        } else if (action === 'mention.search') {
            act({
                datasetId: this.props.datasetId,
                type: m.type,
                value: m.value
            })
        } else if (action === 'entity.search') {
            act({
                datasetId: this.props.datasetId,
                type: m.type,
                value: m.value
            })
        }
    }
}