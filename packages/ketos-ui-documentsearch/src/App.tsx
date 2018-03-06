import * as React from 'react'
import { PluginProps } from 'invest-plugin'

const isEqual = require('lodash.isequal')

import { DocumentSearchResults, DocumentSearchPayload, DocumentSearch, DocumentSearchForm } from 'ketos-components'
import { DatasetSelector } from 'invest-components'
import { Container, Divider } from 'semantic-ui-react'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  query: DocumentSearch,
  submittedSearchQuery?: DocumentSearch
  offset: number
}

class App extends React.Component<Props, State> {

  state: State = {
    query: {},
    offset: 0
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as DocumentSearchPayload
      this.setState({
        datasetId: payload ? payload.datasetId : this.state.datasetId,
        query: payload ? { documentFilter: payload.documentFilter || {} } : {},
      })
    }
  }

  render() {
    const { datasetId, query, submittedSearchQuery, offset } = this.state

    return (
      <Container fluid={false} >
        <DatasetSelector
          provider="DocumentProvider"
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
        />
        <DocumentSearchForm search={query} onSearch={this.handleSearch} />
        <Divider hidden={true} />
        {datasetId && submittedSearchQuery && submittedSearchQuery.documentFilter &&
          <DocumentSearchResults
            datasetId={datasetId}
            documentFilter={submittedSearchQuery.documentFilter}
            entityFilters={submittedSearchQuery.entityFilters}
            relationFilters={submittedSearchQuery.relationFilters}
            mentionFilters={submittedSearchQuery.mentionFilters}
            size={5}
            offset={offset}
            onOffsetChange={this.handleOffsetChange}
          />}
      </Container>
    )
  }

  private handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId,
      offset: 0
    })
  }

  private handleSearch = (search: DocumentSearch) => {
    console.log(search)
    this.setState((state: State) => ({
      submittedSearchQuery: search,
      offset: 0
    }))
  }

  private handleOffsetChange = (offset: number) => {
    this.setState({
      offset: offset
    })
  }
}

export default App
