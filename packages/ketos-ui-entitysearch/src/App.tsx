import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import { Container } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'

import DataContainer from './DataContainer'
import Results from './Results'
import { ENTITY_SEARCH, EntitySearchPayload, EntitySearch, EntitySearchForm } from 'ketos-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,

  query: EntitySearch,
  submittedQuery?: EntitySearch

  offset: number,
  size: number
}

class App extends React.Component<Props, State> {

  state: State = {
    query: {
      entityFilter: {}
    },

    offset: 0,
    size: 10
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { datasetId,
      query, submittedQuery,
      offset, size } = this.state

    return (
      <Container>
        <DatasetSelector
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
          provider="EntityProvider"
        />
        <EntitySearchForm onSearch={this.handleSearch} search={query} />
        {datasetId != null && submittedQuery &&
          <DataContainer
            variables={{
              datasetId,
              entityFilter: submittedQuery.entityFilter,
              offset: offset,
              size
            }}
          >
            <Results onOffsetChange={this.handleOffsetChange} offset={offset} size={size} />
          </DataContainer>
        }

      </Container >
    )
  }

  private handleSearch = (search: EntitySearch) => {
    this.setState(state => ({
      submittedQuery: search,
      offset: 0
    }))
  }

  private handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId: datasetId,
      offset: 0
    })
  }

  private handleOffsetChange = (offset: number) => {
    this.setState({
      offset
    })
  }

  private onAction = (action?: string, payload?: {}) => {
    if (action === ENTITY_SEARCH) {
      const msp = payload as EntitySearchPayload
      this.setState({
        datasetId: msp.datasetId,
        query: msp.entityFilter ? { entityFilter: msp.entityFilter } : { entityFilter: {} },
        submittedQuery: undefined,
        offset: 0
      })
    }
  }
}

export default App
