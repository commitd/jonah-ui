import * as React from 'react'
import { ChildProps } from 'invest-plugin'
const isEqual = require('lodash.isequal')
import { SearchQuery, DatasetSelector } from 'invest-components'
import { Container, Divider } from 'semantic-ui-react'
import DataContainer from './DataContainer'
import Results from './components/Results'

interface SearchPayload {
  query?: { [id: string]: string },
  datasetId?: string
}

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string,
  query: string,
  submittedSearchQuery?: string
}

class App extends React.Component<Props, State> {

  state: State = {
    query: '',
  }

  handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId,
    })
  }

  handleQueryChange = (query: string) => {
    this.setState({
      query
    })
  }

  handleSearch = () => {
    this.setState((state: State) => ({
      submittedSearchQuery: this.state.query
    }))
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
    const { datasetId, query, submittedSearchQuery } = this.state

    return (
      <Container fluid={false} >
        <DatasetSelector
          provider="DocumentProvider"
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
        />
        <SearchQuery query={query} onQueryChange={this.handleQueryChange} onSearch={this.handleSearch} />
        <Divider hidden={true} />
        {datasetId && submittedSearchQuery &&
          <DataContainer
            variables={{ datasetId, query: submittedSearchQuery }}
          >
            <Results />
          </DataContainer>
        }
      </Container>
    )
  }
}

export default App
