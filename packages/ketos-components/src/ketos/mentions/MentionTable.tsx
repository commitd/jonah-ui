import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'

export type Mention = {
    value: string
    type: number
    id: string,
    entityId: string
}

export interface OwnProps {
    datasetId: string,
    mentions: Mention[]
    selectedMentions?: string[]
}

export type Props = OwnProps

class MentionTable extends React.Component<Props> {

    handleMentionAction = (m: Mention) => (act: (payload?: {}) => void, action: string) => {
        if (action === 'mention.view') {
            act({
                datasetId: this.props.datasetId,
                mentionId: m.id
            })
        } else if (action === 'entity.view') {
            act({
                datasetId: this.props.datasetId,
                entityId: m.entityId
            })
        } else if (action === 'mention.search') {
            act({
                datasetId: this.props.datasetId,
                type: m.type,
                value: m.value
            })
        } else if (action === 'relation.search') {
            // TODO... this is only source... how would we do target too? (its the same action). 
            act({
                datasetId: this.props.datasetId,
                sourceType: m.type,
                sourceValue: m.value
            })
        }
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
                                            text="View"
                                            actions={['mention.view', 'entity.view',
                                                'mention.search', 'relation.search']}
                                            onSelect={this.handleMentionAction(m)}
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

export default MentionTable