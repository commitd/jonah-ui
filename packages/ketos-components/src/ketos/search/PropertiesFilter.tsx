import update from 'immutability-helper'
import { PropertiesMap } from 'invest-types'
import * as React from 'react'
import { Button, Form, InputOnChangeData } from 'semantic-ui-react'

export type Props = {
  filter?: PropertiesMap
  onChange(filter: PropertiesMap): void
}

export type State = {
  newKey: string
  newValue: string
}

export default class PropertiesFilterForm extends React.Component<Props, State> {
  state: State = {
    newKey: '',
    newValue: ''
  }

  render() {
    const { filter } = this.props
    const { newKey, newValue } = this.state

    const safeFilter = filter || {}
    const keys = Object.keys(safeFilter)
    return (
      <React.Fragment>
        {keys.map(k => {
          return (
            <Form.Group widths="equal" key={k}>
              <Form.Input fluid={true} placeholder="Key" name="newKey" value={k} readOnly={true} />
              <Form.Input fluid={true} placeholder="Value" name="newValue" value={safeFilter[k]} readOnly={true} />
              <Button icon="remove" content="Remove" negative={true} onClick={this.handleRemove(k)} />
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

  private handleRemove = (k: string) => (e: React.SyntheticEvent<{}>) => {
    e.preventDefault()

    const properties = update(this.props.filter || {}, { $unset: [k] })
    this.props.onChange(properties)
  }

  private handleAdd = (e: React.SyntheticEvent<{}>) => {
    e.preventDefault()

    const properties = update(this.props.filter || {}, { $merge: { [this.state.newKey]: this.state.newValue } })
    this.props.onChange(properties)

    this.setState({
      newKey: '',
      newValue: ''
    })
  }
}
