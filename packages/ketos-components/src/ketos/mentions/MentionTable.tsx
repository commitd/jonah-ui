import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'

export interface OwnProps {
    datasetId: string,
    mentions: {
        value: string
        type: number
        id: string,
        entityId: string
    }[]
    selectedMentions?: string[]
}

export type Props = OwnProps

class DocumentReader extends React.Component<Props> {

    handleMentionAction = (mentionId: string) => (act: (payload?: {}) => void) => {
        act({
            datasetId: this.props.datasetId,
            mentionId
        })
    }

    handleEntityAction = (entityId: string) => (act: (payload?: {}) => void) => {
        act({
            datasetId: this.props.datasetId,
            entityId
        })
    }

    render() {
        const { mentions, selectedMentions } = this.props

        const selected = selectedMentions != null ? selectedMentions : []

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
                            mentions.map(m =>
                                <Table.Row key={m.id} positive={selected.includes(m.id)} >
                                    <Table.Cell>
                                        {m.type}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {m.value}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ActionDropdown
                                            text="View mention"
                                            action="mention.view"
                                            onSelect={this.handleMentionAction(m.id)}
                                        />
                                        <ActionDropdown
                                            text="View entity"
                                            action="entity.view"
                                            onSelect={this.handleEntityAction(m.entityId)}
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
}

export default DocumentReader