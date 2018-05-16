import { ActionDropdown, Paginated } from 'invest-components'
import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ENTITY_SEARCH, ENTITY_VIEW, MENTION_SEARCH } from '../../Actions'
import { BasicEntityNode } from '../../types'

export interface Props {
  datasetId: string
  entities: BasicEntityNode[]
  selectedIds?: string[]
}

class EntityTable extends React.Component<Props> {
  render() {
    const { entities, selectedIds } = this.props

    const selected = selectedIds != null ? selectedIds : []

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
            {entities.map(m => (
              <Table.Row key={m.id} positive={selected.includes(m.id)}>
                <Table.Cell>{m.type}</Table.Cell>
                <Table.Cell>{m.value}</Table.Cell>
                <Table.Cell>
                  <ActionDropdown
                    text="View"
                    actions={[ENTITY_VIEW, ENTITY_SEARCH, MENTION_SEARCH]}
                    onSelect={this.handleAction(m)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }

  private handleAction = (m: BasicEntityNode) => (act: (payload?: {}) => void, action: string) => {
    if (action === ENTITY_VIEW) {
      act({
        datasetId: this.props.datasetId,
        entityId: m.id
      })
    } else if (action === MENTION_SEARCH) {
      act({
        datasetId: this.props.datasetId,
        mentionFilter: {
          type: m.type,
          value: m.value
        }
      })
    } else if (action === ENTITY_SEARCH) {
      act({
        datasetId: this.props.datasetId,
        entityFilter: {
          type: m.type,
          value: m.value
        }
      })
    }
  }
}

export default class PaginatedPropertiesTable extends React.Component<Props> {
  render() {
    return (
      <Paginated items={this.props.entities} itemsKey="entities">
        <EntityTable {...this.props} />
      </Paginated>
    )
  }
}
