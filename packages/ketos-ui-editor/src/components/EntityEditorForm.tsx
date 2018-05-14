import update from 'immutability-helper'
import { PropertiesList } from 'invest-types'
import * as React from 'react'
import { Divider, Form, InputOnChangeData, Table } from 'semantic-ui-react'
import { EntityItem } from './EditableTypes'
import { Entity } from './EntityEditorDataContainer'
import { updateValueInPropertiesList } from './Utils'
import PropertiesListEditor from './common/PropertiesListEditor'

export type Props = {
  item?: EntityItem
  edit?: boolean
  onChange?(item: Entity): void
}

export default class EntityEditorForm extends React.Component<Props> {
  render() {
    const { item } = this.props

    if (!item) {
      return <p>Not found</p>
    }

    const edit = this.props.edit || false

    return (
      <Form>
        <Table definition={true}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Entity id</Table.Cell>
              <Table.Cell>{item.id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Document id</Table.Cell>
              <Table.Cell>{item.docId}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
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
        <Divider horizontal={true} content="Properties" section={true} />
        <PropertiesListEditor
          properties={item.propertiesList}
          ignore={['subType', 'type', 'value']}
          edit={edit}
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
      if (name === 'type' || name === 'subType' || name === 'value') {
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
