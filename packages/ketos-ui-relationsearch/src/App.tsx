import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import { Container, Divider } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'
import { RELATION_SEARCH, RelationSearchPayload, RelationSearch, RelationSearchForm } from 'ketos-components'
import DataContainer from './DataContainer'
import Results from './Results'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,

  query: RelationSearch,
  submittedQuery?: RelationSearch

  offset: number,
  size: number
}

class App extends React.Component<Props, State> {

  state: State = {
    offset: 0,
    size: 25,
    query: {
      relationFilter: {}
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {

    const { datasetId, query, submittedQuery, offset, size } = this.state

    return (
      <Container>
        <DatasetSelector selectedDataset={datasetId} onDatasetSelected={this.handleDatasetSelected} />
        <RelationSearchForm search={query} onSearch={this.handleSearch} />
        <Divider hidden={true} />
        {
          datasetId != null
          && submittedQuery != null &&
          < DataContainer
            variables={{
              datasetId,
              relationFilter: submittedQuery.relationFilter,
              size: size,
              offset: offset
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
    if (action === RELATION_SEARCH) {
      const rsp = payload as RelationSearchPayload
      this.setState({
        datasetId: rsp.datasetId,
        query: rsp.relationFilter ? { relationFilter: rsp.relationFilter } : { relationFilter: {} },
        submittedQuery: undefined,
        offset: 0
      })
    }
  }

  private handleSearch = (search: RelationSearch) => {
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

}

export default App
