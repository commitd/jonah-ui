import * as React from 'react'
import { PluginProps } from 'invest-plugin'
const isEqual = require('lodash.isequal')
import { DatasetSelector } from 'invest-components'
import { Container, Divider } from 'semantic-ui-react'
import DataContainer from './DataContainer'
import Results from './components/DocumentResults'
import { DocumentSearchPayload, DocumentSearch, DocumentSearchForm } from 'ketos-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  query?: DocumentSearch
  submittedQuery?: DocumentSearch
}

class App extends React.Component<Props, State> {

  state: State = {
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as DocumentSearchPayload
      this.setState({
        datasetId: payload ? payload.datasetId : this.state.datasetId,
        query: payload ? { documentFilter: payload.documentFilter } : {}
      })
    }
  }

  render() {
    const { datasetId, query, submittedQuery } = this.state

    return (
      <Container fluid={false} >
        <DatasetSelector
          provider="DocumentProvider"
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
        />
        <DocumentSearchForm onSearch={this.handleSearch} search={query} />
        <Divider hidden={true} />
        {datasetId && submittedQuery && submittedQuery.documentFilter &&
          <DataContainer
            variables={{
              datasetId,
              documentFilter: submittedQuery.documentFilter,
            }}
          >
            <Results datasetId={datasetId} query={submittedQuery} />
          </DataContainer>
        }
      </Container>
    )
  }

  private handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId,
    })
  }

  private handleSearch = (search: DocumentSearch) => {
    this.setState((state: State) => ({
      submittedQuery: search
    }))
  }

}

export default App
