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
  sourceType?: string,
  sourceValue?: string,
  targetType?: string,
  targetValue?: string,
  relationshipType?: string
}

class App extends React.Component<Props, State> {

  state: State = {

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
      [data.name]: data.value === '' ? undefined : data.value
    })
  }

  render() {

    const { datasetId, sourceValue, sourceType, relationshipType, targetType, targetValue } = this.state

    return (
      <Container>
        <DatasetSelector selectedDataset={datasetId} onDatasetSelected={this.handleDatasetSelected} />
        <Form>
          <Form.Input
            name="sourceValue"
            label="From Entity"
            placeholder="Value for entity"
            onChange={this.handleFormChange}
          />
          <Form.Input
            name="sourceType"
            label="of type"
            placeholder="Type (optional)"
          />
          <Form.Input
            name="relationshipType"
            label="Relation"
            placeholder="Relationship type"
            onChange={this.handleFormChange}
          />
          <Form.Input
            name="targetValue"
            label="To Entity"
            placeholder="Value for entity"
            onChange={this.handleFormChange}
          />
          <Form.Input name="targetType" label="of Type" placeholder="Type (optional)" />
        </Form>
        {datasetId != null
          && (sourceValue != null || sourceType != null ||
            relationshipType != null ||
            targetValue != null || targetType != null) &&
          < DataContainer
            variables={{ datasetId, sourceValue, sourceType, relationshipType, targetType, targetValue }}
          >
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
