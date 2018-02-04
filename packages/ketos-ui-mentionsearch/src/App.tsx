import * as React from 'react'
const isEqual = require('lodash.isequal')

import { ChildProps } from 'invest-plugin'
import { Container, Form, InputOnChangeData } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'
import DataContainer from './DataContainer'
import Results from './Results'

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string,
  type?: string,
  value?: string
}

class App extends React.Component<Props, State> {

  state: State = {
    type: undefined,
    value: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId: datasetId
    })
  }

  handleFormChange = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.setState({
      [data.name]: data.value !== '' ? data.value : null
    })
  }

  render() {
    const { datasetId, type, value } = this.state

    return (
      <Container>
        <DatasetSelector
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
          provider="EntityProvider"
        />
        <Form>
          <Form.Input name="value" label="Value" placeholder="Value" onChange={this.handleFormChange} />
          <Form.Input name="type" label="Type" placeholder="Type" onChange={this.handleFormChange} />
        </Form>
        {datasetId != null && value != null &&
          < DataContainer variables={{ datasetId, type, value }} >
            <Results />
          </DataContainer>
        }

      </Container >
    )
  }

  private onAction = (action?: string, payload?: {}) => {
    // Implement to deal with new action requests
    // typically this will setState in order and then pass
    // that state as props to a subcomponent (which will
    // then respond with a )

  }
}

export default App
