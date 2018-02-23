import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import DataContainer from './DataContainer'
import Results from './Results'
import { Container, Form, InputOnChangeData } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  query?: string,
  offset: number,
  limit: number

  submittedQuery?: string
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: undefined,
    query: undefined,
    offset: 0,
    limit: 10
  }

  handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId: datasetId
    })
  }

  handleFormChange = (event: React.SyntheticEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.setState({
      [data.name]: data.value
    })
  }

  handleSubmit = () => {
    this.setState((state) => ({
      submittedQuery: state.query
    }))
  }

  render() {
    const { datasetId, submittedQuery, offset, limit } = this.state

    return (
      <Container>
        <DatasetSelector
          // As we are dealing with documents, we know we need at least this!
          provider="DocumentProvider"
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
        />

        <Form onSubmit={this.handleSubmit} >
          <Form.Input name="query" placeholder="Document search query" onChange={this.handleFormChange} />
        </Form>

        {
          datasetId != null && submittedQuery != null && <DataContainer
            variables={{ datasetId, query: submittedQuery, offset, limit }}
          >
            <Results />
          </DataContainer>
        }

      </Container >
    )
  }
}

export default App
