import { ActionDropdown, Paginated } from 'invest-components'
import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ENTITY_VIEW, MENTION_SEARCH, MENTION_VIEW, RELATION_SEARCH } from '../../Actions'
import { Mention } from '../../types'

export interface OwnProps {
  datasetId: string
  mentions: Mention[]
  selectedMentions?: string[]
}

export type Props = OwnProps

class MentionTable extends React.Component<Props> {
  render() {
    const { mentions, selectedMentions } = this.props

    const selected = selectedMentions != null ? selectedMentions : []

    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mentions.map(m => (
              <Table.Row key={m.id} positive={selected.includes(m.id)}>
                <Table.Cell>{m.type}</Table.Cell>
                <Table.Cell>{m.value}</Table.Cell>
                <Table.Cell>
                  <ActionDropdown
                    text="View"
                    actions={[MENTION_VIEW, ENTITY_VIEW, MENTION_SEARCH, RELATION_SEARCH]}
                    onSelect={this.handleMentionAction(m)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }

  private handleMentionAction = (m: Mention) => (act: (payload?: {}) => void, action: string) => {
    if (action === MENTION_VIEW) {
      act({
        datasetId: this.props.datasetId,
        mentionId: m.id
      })
    } else if (action === ENTITY_VIEW && m.entityId) {
      act({
        datasetId: this.props.datasetId,
        entityId: m.entityId
      })
    } else if (action === MENTION_SEARCH) {
      act({
        datasetId: this.props.datasetId,
        mentionFilter: {
          type: m.type,
          value: m.value
        }
      })
    } else if (action === RELATION_SEARCH) {
      act({
        datasetId: this.props.datasetId,
        source: {
          type: m.type,
          value: m.value
        }
      })
    }
  }
}

export default class PaginatedMentionTable extends React.Component<Props> {
  render() {
    return (
      <Paginated items={this.props.mentions} itemsKey="mentions">
        <MentionTable {...this.props} />
      </Paginated>
    )
  }
}
