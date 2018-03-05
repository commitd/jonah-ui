import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import DataContainer from './DataContainer'
import Results from './Results'
import { Container, InputOnChangeData, Divider } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'
import { DocumentSearch, DocumentSearchForm } from 'ketos-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  query?: string,
  offset: number,
  limit: number

  submittedQuery?: DocumentSearch
}

// TODO: Handle action 

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: undefined,
    query: undefined,
    offset: 0,
    limit: 10
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

  handleSearch = (search: DocumentSearch) => {
    this.setState((state) => ({
      submittedQuery: search,
      offset: 0
    }))
  }

  render() {
    const { datasetId, submittedQuery, offset, limit } = this.state

    console.log(submittedQuery)

    return (
      <Container>
        <DatasetSelector
          // As we are dealing with documents, we know we need at least this!
          provider="DocumentProvider"
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
        />

        <DocumentSearchForm onSearch={this.handleSearch} />
        <Divider hidden={true} />
        {
          datasetId != null && submittedQuery != null && <DataContainer
            variables={{
              datasetId,
              documentFilter: submittedQuery.documentFilter,
              entityFilters: submittedQuery.entityFilters || [],
              mentionFilters: submittedQuery.mentionFilters || [],
              relationFilters: submittedQuery.relationFilters || [],
              offset, limit
            }}
          >
            <Results onOffsetChanged={this.handleOffsetChanged} />
          </DataContainer>
        }

      </Container >
    )
  }

  private handleOffsetChanged = (offset: number) => {
    this.setState({
      offset
    })
  }
}

export default App
