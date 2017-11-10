import * as React from 'react'
import { ChildProps } from 'vessel-plugin'

import { DocumentSearchResults, SearchQuery, DatasetSelector } from 'ketos-components'
import { Container, Divider } from 'semantic-ui-react'

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string,
  query: string,
  currentSearchQuery?: string

}

class App extends React.Component<Props, State> {

  state: State = {
    query: ''
  }

  handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId
    })
  }

  handleQueryChange = (query: string) => {
    this.setState({
      query
    })
  }

  handleSearch = () => {
    this.setState((state: State) => ({
      currentSearchQuery: this.state.query
    }))
  }

  render() {
    const { datasetId, query, currentSearchQuery } = this.state

    return (
      <Container fluid={false} >
        <DatasetSelector selectedDataset={datasetId} onDatasetSelected={this.handleDatasetSelected} />
        <SearchQuery query={query} onQueryChange={this.handleQueryChange} onSearch={this.handleSearch} />
        <Divider hidden={true} />
        {datasetId && currentSearchQuery && <DocumentSearchResults datasetId={datasetId} query={currentSearchQuery} />}
      </Container>
    )
  }
}

export default App
