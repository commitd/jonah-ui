import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import { Container, Form, InputOnChangeData } from 'semantic-ui-react'
import { DatasetSelector } from 'invest-components'
import { SearchButton } from 'invest-components'

import DataContainer from './DataContainer'
import Results from './Results'
import { MENTION_SEARCH, MentionSearchPayload, MentionFilter, MentionSearchForm, MentionSearch } from 'ketos-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,

  query: MentionSearch,
  submittedQuery?: MentionSearch

  offset: number,
  size: number
}

class App extends React.Component<Props, State> {

  state: State = {
    query: {
      mentionFilter: {}
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
    const { datasetId, query, submittedQuery,
      offset, size } = this.state

    return (
      <Container>
        <DatasetSelector
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
          provider="MentionProvider"
        />
        <MentionSearchForm onSearch={this.handleSearch} search={query} />
        {datasetId != null && submittedQuery &&
          <DataContainer
            variables={{
              datasetId,
              mentionFilter: submittedQuery.mentionFilter,
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

  private handleSearch = (search: MentionSearch) => {
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
    if (action === MENTION_SEARCH) {
      const msp = payload as MentionSearchPayload
      this.setState({
        datasetId: msp.datasetId,
        submittedQuery: undefined,
        query: msp.mentionFilter ? { mentionFilter: msp.mentionFilter } : { mentionFilter: {} },
        offset: 0
      })
    }
  }
}

export default App
