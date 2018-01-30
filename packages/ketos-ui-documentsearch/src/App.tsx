import * as React from 'react'
import { ChildProps } from 'invest-plugin'

const isEqual = require('lodash.isequal')

import { DocumentSearchResults } from 'ketos-components'
import { SearchQuery, DatasetSelector } from 'invest-components'
import { Container, Divider } from 'semantic-ui-react'

interface SearchPayload {
  query?: { [id: string]: string },
  datasetId?: string
}

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

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as SearchPayload
      this.setState({
        datasetId: payload ? payload.datasetId : this.state.datasetId,
        // TODO: Currently only look for the content field, but in future we could have additional options
        query: payload && payload.query && payload.query.content ? payload.query.content : this.state.query,
      })
    }
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
