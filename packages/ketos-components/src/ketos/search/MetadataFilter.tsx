import update from 'immutability-helper'
import { PropertiesList } from 'invest-types'
import * as React from 'react'
import { Button, Form, InputOnChangeData } from 'semantic-ui-react'

export type Props = {
  filter?: PropertiesList
  onChange(filter: PropertiesList): void
}

export type State = {
  newKey: string
  newValue: string
}

export default class MetadataFilterForm extends React.Component<Props, State> {
  state: State = {
    newKey: '',
    newValue: ''
  }

  render() {
    const { filter } = this.props
    const { newKey, newValue } = this.state

    const safeFilter = filter || []
    return (
      <React.Fragment>
        {safeFilter.map((p, i) => {
          return (
            <Form.Group widths="equal" key={`{${p.value}}_${p.value}`}>
              <Form.Input fluid={true} placeholder="Key" name="newKey" value={p.key} readOnly={true} />
              <Form.Input fluid={true} placeholder="Value" name="newValue" value={p.value} readOnly={true} />
              <Button icon="remove" content="Remove" negative={true} onClick={this.handleRemove(i)} />
            </Form.Group>
          )
        })}
        <Form.Group widths="equal">
          <Form.Input
            fluid={true}
            placeholder="Key"
            name="newKey"
            value={newKey || ''}
            onChange={this.handleKeyChange}
          />
          <Form.Input
            fluid={true}
            placeholder="Value"
            name="newValue"
            value={newValue || ''}
            onChange={this.handleValueChange}
          />
          <Button
            icon="plus"
            content="Add"
            positive={true}
            disabled={newValue === '' || newKey === ''}
            onClick={this.handleAdd}
          />
        </Form.Group>
      </React.Fragment>
    )
  }

  private handleKeyChange = (e: React.SyntheticEvent<{}>, data: InputOnChangeData) => {
    this.setState({
      newKey: data.value
    })
  }

  private handleValueChange = (e: React.SyntheticEvent<{}>, data: InputOnChangeData) => {
    this.setState({
      newValue: data.value
    })
  }
  private handleRemove = (i: number) => (e: React.SyntheticEvent<{}>) => {
    e.preventDefault()

    const properties = update(this.props.filter || [], { $splice: [[i, 1]] })
    this.props.onChange([...properties])
  }

  private handleAdd = (e: React.SyntheticEvent<{}>) => {
    e.preventDefault()

    const properties = update(this.props.filter || [], {
      $push: [{ key: this.state.newKey, value: this.state.newValue }]
    })
    this.props.onChange([...properties])

    this.setState({
      newKey: '',
      newValue: ''
    })
  }
}
