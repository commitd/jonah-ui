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
  offset: number
}

class App extends React.Component<Props, State> {

  state: State = {
    query: '',
    offset: 0
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
      currentSearchQuery: this.state.query,
      offset: 0
    }))
  }

  handleOffsetChange = (offset: number) => {
    this.setState({
      offset: offset
    })
  }

  render() {
    const { datasetId, query, currentSearchQuery, offset } = this.state

    return (
      <Container fluid={false} >
        <DatasetSelector selectedDataset={datasetId} onDatasetSelected={this.handleDatasetSelected} />
        <SearchQuery query={query} onQueryChange={this.handleQueryChange} onSearch={this.handleSearch} />
        <Divider hidden={true} />
        {datasetId && currentSearchQuery &&
          <DocumentSearchResults
            datasetId={datasetId}
            query={currentSearchQuery}
            size={5}
            offset={offset}
            onOffsetChange={this.handleOffsetChange}
          />}
      </Container>
    )
  }
}

export default App
