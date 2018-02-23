import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import { Container, Form, InputOnChangeData, Divider } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'
import { SearchButton } from 'ketos-components'

import DataContainer from './DataContainer'
import Results from './Results'

type RelationSearchPayload = {
  datasetId?: string,
  sourceType?: string,
  sourceValue?: string,
  targetType?: string,
  targetValue?: string,
  relationshipType?: string
}

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  sourceType?: string,
  sourceValue?: string,
  targetType?: string,
  targetValue?: string,
  relationshipType?: string

  submittedSourceType?: string,
  submittedSourceValue?: string,
  submittedTargetType?: string,
  submittedTargetValue?: string,
  submittedRelationshipType?: string

  offset: number,
  size: number
}

class App extends React.Component<Props, State> {

  state: State = {
    offset: 0,
    size: 25
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
      [data.name]: data.value === '' ? undefined : data.value
    })
  }

  handleSubmit = () => {
    this.setState(state => ({
      submittedSourceType: state.sourceType !== '' ? state.sourceType : undefined,
      submittedSourceValue: state.sourceValue !== '' ? state.sourceValue : undefined,
      submittedTargetType: state.targetType !== '' ? state.targetType : undefined,
      submittedTargetValue: state.targetValue !== '' ? state.targetValue : undefined,
      submittedRelationshipType: state.relationshipType !== '' ? state.relationshipType : undefined,

      offset: 0
    }))
  }

  handleOffsetChange = (offset: number) => {
    this.setState({
      offset
    })
  }

  render() {

    const { datasetId, sourceValue, sourceType, relationshipType, targetType, targetValue,
      submittedSourceValue, submittedSourceType, submittedRelationshipType, submittedTargetType,
      submittedTargetValue, offset, size } = this.state

    return (
      <Container>
        <DatasetSelector selectedDataset={datasetId} onDatasetSelected={this.handleDatasetSelected} />
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              name="sourceValue"
              label="From Entity"
              value={sourceValue || ''}
              placeholder="Value for entity"
              onChange={this.handleFormChange}
            />
            <Form.Input
              name="sourceType"
              label="of type"
              value={sourceType || ''}
              placeholder="Type (optional)"
              onChange={this.handleFormChange}
            />
          </Form.Group>
          <Form.Group widths="equal">

            <Form.Input
              name="relationshipType"
              label="Relation"
              value={relationshipType || ''}
              placeholder="Relationship type"
              onChange={this.handleFormChange}
            />
          </Form.Group>

          <Form.Group widths="equal">

            <Form.Input
              name="targetValue"
              label="To Entity"
              value={targetValue || ''}
              placeholder="Value for entity"
              onChange={this.handleFormChange}
            />
            <Form.Input
              name="targetType"
              label="of Type"
              value={targetType || ''}
              placeholder="Type (optional)"
              onChange={this.handleFormChange}
            />
          </Form.Group>
          <SearchButton onSubmit={this.handleSubmit} />
        </Form>
        <Divider hidden={true} />
        {
          datasetId != null
          && (submittedSourceValue != null || submittedSourceType != null ||
            submittedRelationshipType != null ||
            submittedTargetValue != null || submittedTargetType != null) &&
          < DataContainer
            variables={{
              datasetId, sourceValue: submittedSourceValue,
              sourceType: submittedSourceType, relationshipType: submittedRelationshipType,
              targetType: submittedTargetType, targetValue: submittedTargetValue,
              size: size, offset: offset
            }}
          >
            <Results onOffsetChange={this.handleOffsetChange} offset={offset} size={size} />
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
    if (action === 'relation.search') {
      const rsp = payload as RelationSearchPayload
      this.setState({
        datasetId: rsp.datasetId,
        sourceType: rsp.sourceType,
        sourceValue: rsp.sourceValue,
        targetType: rsp.targetType,
        targetValue: rsp.targetValue,
        relationshipType: rsp.relationshipType
      })
    }
  }
}

export default App
