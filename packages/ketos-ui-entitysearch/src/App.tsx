import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import { Container, Form, InputOnChangeData } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'
import { SearchButton } from 'invest-components'

import DataContainer from './DataContainer'
import Results from './Results'

type MentionSearchPayload = {
  datasetId?: string,
  type?: string
  subType?: string
  value?: string
}

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  type: string,
  value: string
  subType: string,
  submittedType?: string,
  submittedValue?: string,
  submittedSubType?: string,

  offset: number,
  size: number
}

class App extends React.Component<Props, State> {

  state: State = {
    type: '',
    value: '',
    subType: '',
    submittedType: undefined,
    submittedValue: undefined,

    offset: 0,
    size: 10
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId: datasetId,
      offset: 0
    })
  }

  handleFormChange = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.setState({
      [data.name]: data.value
    })
  }

  handleOffsetChange = (offset: number) => {
    this.setState({
      offset
    })
  }

  handleSubmit = () => {
    this.setState(state => ({
      submittedType: state.type !== '' ? state.type : undefined,
      submittedValue: state.value !== '' ? state.value : undefined,
      submittedSubType: state.subType !== '' ? state.subType : undefined,
      offset: 0
    }))
  }

  render() {
    const { datasetId,
      submittedType, submittedValue, submittedSubType,
      type, value, subType,
      offset, size } = this.state

    return (
      <Container>
        <DatasetSelector
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
          provider="MentionProvider"
        />
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              name="value"
              label="Value"
              value={value}
              placeholder="Value"
              onChange={this.handleFormChange}
            />
            <Form.Input name="type" label="Type" placeholder="Type" value={type} onChange={this.handleFormChange} />
            <Form.Input
              name="subType"
              label="SubType"
              placeholder="Sub-type"
              value={subType}
              onChange={this.handleFormChange}
            />

            <SearchButton onSubmit={this.handleSubmit} disabled={this.isDisabled()} />
          </Form.Group>
        </Form>
        {datasetId != null && (submittedType != null || submittedValue != null) &&
          <DataContainer
            variables={{
              datasetId,
              type: submittedType,
              subType: submittedSubType,
              value: submittedValue,
              offset: offset,
              size
            }}
          >
            <Results onOffsetChange={this.handleOffsetChange} offset={offset} size={size} />
          </DataContainer>
        }

      </Container >
    )
  }

  private isDisabled = () => {
    const { datasetId,
      type, value,
    } = this.state
    return datasetId == null || (type === '' && value === '')
  }

  private onAction = (action?: string, payload?: {}) => {
    if (action === 'mention.search') {
      const msp = payload as MentionSearchPayload
      this.setState({
        datasetId: msp.datasetId,
        type: msp.type || '',
        value: msp.value || '',
        subType: msp.subType || '',
        offset: 0
      })
    }
  }
}

export default App
