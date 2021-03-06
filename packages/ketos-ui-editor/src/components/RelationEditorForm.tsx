import update from 'immutability-helper'
import { Ellipsis } from 'invest-components'
import { PropertiesList } from 'invest-types'
import * as React from 'react'
import { Divider, Form, InputOnChangeData, Table } from 'semantic-ui-react'
import { RelationItem } from './EditableTypes'
import { Relation, Response } from './RelationEditorDataContainer'
import { updateValueInPropertiesList } from './Utils'
import PropertiesListEditor from './common/PropertiesListEditor'

export type Props = {
  item?: RelationItem
  response?: Response
  edit?: boolean
  onChange?(item: Relation): void
}

export default class RelationEditorForm extends React.Component<Props> {
  render() {
    const { item, response } = this.props

    if (!item) {
      return <p>Not found</p>
    }

    const relation = response && response.corpus && response.corpus.relation

    const edit = this.props.edit || false

    return (
      <Form>
        <Table definition={true}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Mention id</Table.Cell>
              <Table.Cell>{item.id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Document id</Table.Cell>
              <Table.Cell>{item.docId}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {relation &&
          relation.source &&
          relation.target && (
            <Table attached="bottom" definition={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Source</Table.HeaderCell>
                  <Table.HeaderCell>Target</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Mention id</Table.Cell>
                  <Table.Cell>
                    <Ellipsis text={relation.source.id} />
                  </Table.Cell>
                  <Table.Cell>
                    <Ellipsis text={relation.target.id} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Entity id</Table.Cell>
                  <Table.Cell>
                    <Ellipsis text={relation.source.entityId} />
                  </Table.Cell>
                  <Table.Cell>
                    <Ellipsis text={relation.target.entityId} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Type</Table.Cell>
                  <Table.Cell>{relation.source.type}</Table.Cell>
                  <Table.Cell>{relation.target.type}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Value</Table.Cell>
                  <Table.Cell>{relation.source.value}</Table.Cell>
                  <Table.Cell>{relation.target.value}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )}
        <Divider horizontal={true} section={true} />
        <Form.Input name="type" label="Type" value={item.type || ''} onChange={this.handleChange} readOnly={!edit} />
        <Form.Input
          name="subType"
          label="Sub type"
          value={item.subType || ''}
          onChange={this.handleChange}
          readOnly={!edit}
        />
        <Form.Input name="value" label="Value" value={item.value || ''} onChange={this.handleChange} readOnly={!edit} />
        <Form.Input name="begin" label="Begin" value={item.begin} onChange={this.handleChange} readOnly={!edit} />
        <Form.Input name="end" label="End" value={item.end} onChange={this.handleChange} readOnly={!edit} />
        <Divider horizontal={true} content="Properties" section={true} />
        <PropertiesListEditor
          properties={item.propertiesList}
          edit={edit}
          ignore={['subType', 'type', 'value', 'begin', 'end']}
          onChange={this.handlePropertiesChanged}
        />
      </Form>
    )
  }

  private handleChange = (e: {}, data: InputOnChangeData) => {
    if (this.props.item && this.props.onChange) {
      const value = data.value
      const name = data.name

      let updated = update(this.props.item || {}, { $merge: { [name]: value } })

      // If these have changed also change the property
      if (name === 'type' || name === 'subType' || name === 'value' || name === 'begin' || name === 'end') {
        const properties = updateValueInPropertiesList(updated.propertiesList, name, value)
        updated = update(updated, { $merge: { propertiesList: properties } })
      }

      this.props.onChange(updated)
    }
  }

  private handlePropertiesChanged = (properties: PropertiesList) => {
    if (this.props.item && this.props.onChange) {
      this.props.onChange(update(this.props.item || {}, { $merge: { propertiesList: properties } }))
    }
  }
}
