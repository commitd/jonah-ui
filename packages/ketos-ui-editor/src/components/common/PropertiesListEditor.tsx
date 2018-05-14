import update from 'immutability-helper'
import { PropertiesList, Property } from 'invest-types'
import * as React from 'react'
import { Form, Input, TextArea } from 'semantic-ui-react'

export type Props = {
  properties: PropertiesList
  edit: boolean
  ignore?: string[]
  onChange(metadata: ReadonlyArray<Property>): void
}

export default class PropertiesEditor extends React.Component<Props> {
  render() {
    const { edit, properties } = this.props
    const readOnly = !edit

    return (
      <React.Fragment>
        {properties.map((v, i) => !this.isIgnored(v.key) && this.renderProperty(i, v.key || '', v.value || '', edit))}
        {edit && <Form.Button icon="add" content="Add" onClick={this.handleAdd} disabled={readOnly} positive={true} />}
      </React.Fragment>
    )
  }

  private isIgnored(key: string) {
    return (this.props.ignore || []).includes(key)
  }

  private handleAdd = () => {
    this.props.onChange(update(this.props.properties || [], { $push: [{ key: '', value: '' }] }))
  }

  private handleRemove = (index: number) => {
    this.props.onChange(update(this.props.properties || [], { $splice: [[index, 1]] }))
  }

  private handleKeyChanged = (index: number, key: string) => {
    const m = update(this.props.properties[index], { $merge: { key: key } })
    this.props.onChange(update(this.props.properties || [], { $merge: { [index]: m } }))
  }

  private handleValueChanged = (index: number, newValue: {}, type: string) => {
    let value: {}
    switch (type) {
      case 'json':
        try {
          value = JSON.parse(newValue as string)
        } catch (e) {
          console.warn('Only copy and paste is supported')
          return
        }
        break
      case 'datetime':
        value = new Date(newValue as string).getTime()
        break
      default:
        value = newValue
        break
    }

    const m = update(this.props.properties[index], { $merge: { value: value } })
    this.props.onChange(update(this.props.properties || [], { $merge: { [index]: m } }))
  }

  private renderProperty = (index: number, key: string, value: {}, edit: boolean) => {
    return (
      <Form.Group key={`${index}`} inline={true}>
        <Form.Input
          label="Key"
          value={key || ''}
          onChange={(e, data) => this.handleKeyChanged(index, data.value)}
          readOnly={!edit}
          width={6}
        />
        {this.renderValue(index, key, value, edit)}
        {edit && (
          <Form.Button
            width={2}
            negative={true}
            icon="remove"
            content="Remove"
            onClick={() => this.handleRemove(index)}
            disabled={!edit}
          />
        )}
      </Form.Group>
    )
  }

  private renderValue = (index: number, key: string, value: {}, edit: boolean) => {
    let control: {} = Input
    let formValue: {}
    let formType = 'text'
    let type = 'string'
    if (value instanceof Array || value instanceof Object) {
      control = TextArea
      type = 'json'
      formValue = JSON.stringify(value)
    } else if (
      typeof value === 'number' &&
      (key === 'documentDate' || key === 'timestamp' || key === 'timestampStart' || key === 'timestampStop')
    ) {
      const s = new Date(value as number).toISOString()
      formValue = s.substring(0, s.length - 1)
      formType = 'datetime-local'
      type = 'datetime'
    } else if (typeof value === 'number') {
      formType = 'number'
      formValue = value
      type = 'number'
    } else {
      formValue = value || ''
    }

    return (
      <Form.Field
        type={formType}
        control={control}
        label={
          type === 'json' ? (
            <span>
              Value<br />
              <small>(Paste only)</small>
            </span>
          ) : (
            'Value'
          )
        }
        value={formValue}
        onChange={(e: {}, data: { value: {} }) => this.handleValueChanged(index, data.value, type)}
        readOnly={!edit}
        width={8}
      />
    )
  }
}
