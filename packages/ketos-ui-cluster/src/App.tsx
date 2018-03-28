import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import { Container, Header } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'
import { DocumentSearchForm, DocumentSearch, DocumentSearchResultsView } from 'ketos-components'
import ClusterSearchResultsContainer from './ClusterSearchResultsContainer'
import { DocumentResult } from './types'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  query: DocumentSearch,
  submittedSearchQuery?: DocumentSearch,
  selectedResults?: DocumentResult[],
  selectedCluster?: string,
  resultsOffset: number
}

class App extends React.Component<Props, State> {

  state: State = {
    query: {},
    resultsOffset: 0
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  handleResultsChange = (results: DocumentResult[], topic: string) => {
    this.setState(Object.assign({}, this.state, { selectedResults: results, selectedCluster: topic, resultsOffset: 0 }))
  }

  handleOffsetNext = () => {
    this.setState(Object.assign({}, this.state, { resultsOffset: this.state.resultsOffset + 5 }))
  }

  render() {
    const { datasetId, query, submittedSearchQuery, selectedResults, selectedCluster, resultsOffset } = this.state
    return (
      <Container fluid={true}>
        <DatasetSelector
          provider="DocumentProvider"
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
        />
        <DocumentSearchForm search={query} onSearch={this.handleSearch} />
        {datasetId && submittedSearchQuery && submittedSearchQuery.documentFilter &&
          <ClusterSearchResultsContainer
            datasetId={datasetId}
            documentFilter={submittedSearchQuery.documentFilter}
            entityFilters={submittedSearchQuery.entityFilters}
            relationFilters={submittedSearchQuery.relationFilters}
            mentionFilters={submittedSearchQuery.mentionFilters}
            size={1000}
            offset={0}
            onClusterSelected={this.handleResultsChange}
          />
        }
        {selectedResults && datasetId &&
          <div>
            <Header>{selectedCluster}</Header>
            <DocumentSearchResultsView
              datasetId={datasetId}
              results={selectedResults.slice(resultsOffset, resultsOffset + 5)}
              offset={resultsOffset}
              size={5}
              total={selectedResults.length}
              onOffsetChange={this.handleOffsetNext}
            />
          </div>
        }
      </Container>
    )
  }

  private handleDatasetSelected = (datasetId: string) => {
    this.setState({ datasetId })
  }

  private handleSearch = (search: DocumentSearch) => {
    this.setState((state: State) => ({
      submittedSearchQuery: search,
      selectedResults: undefined,
      resultsOffset: 0
    }))
  }

  private onAction = (action?: string, payload?: {}) => {
    // Implement to deal with new action requests
    // typically this will setState in order and then pass
    // that state as props to a subcomponent (which will
    // then respond with a )
  }
}

export default App
