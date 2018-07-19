import { DatasetSelector } from 'invest-components'
import { PluginProps } from 'invest-plugin'
import { GeoRadius } from 'invest-types'
import { DocumentSearch, DocumentSearchForm } from 'ketos-components'
import * as React from 'react'
import { Container, Divider } from 'semantic-ui-react'
import DataContainer from './DataContainer'
import Results from './Results'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string
  query?: string
  offset: number
  size: number
  bounds?: GeoRadius

  submittedQuery?: DocumentSearch
}

// TODO: Handle action

class App extends React.Component<Props, State> {
  state: State = {
    datasetId: undefined,
    query: undefined,
    offset: 0,
    size: 10
  }

  handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId: datasetId,
      offset: 0
    })
  }

  handleSearch = (search: DocumentSearch) => {
    this.setState(state => ({
      submittedQuery: search,
      offset: 0
    }))
  }

  render() {
    const { datasetId, submittedQuery, offset, size, bounds } = this.state

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
        {datasetId != null &&
          submittedQuery != null && (
            <DataContainer
              variables={{
                datasetId,
                documentFilter: submittedQuery.documentFilter,
                entityFilters: submittedQuery.entityFilters || [],
                mentionFilters: submittedQuery.mentionFilters || [],
                relationFilters: submittedQuery.relationFilters || [],
                bounds,
                offset,
                size
              }}
            >
              <Results onOffsetChanged={this.handleOffsetChanged} onBoundsChanged={this.handleBoundsChanged} />
            </DataContainer>
          )}
      </Container>
    )
  }

  private handleOffsetChanged = (offset: number) => {
    this.setState({
      offset
    })
  }

  private handleBoundsChanged = (bounds?: GeoRadius) => {
    this.setState({
      bounds
    })
  }
}

export default App
