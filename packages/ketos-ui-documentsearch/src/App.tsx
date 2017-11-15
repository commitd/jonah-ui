import * as React from 'react'
import { ChildProps } from 'vessel-plugin'
import { compose, graphql, gql, QueryProps } from 'react-apollo'

import { DocumentSearchResults, SearchQuery, DatasetSelector } from 'ketos-components'
import { Container, Divider } from 'semantic-ui-react'

type OwnProps = {}

interface Response {
  vesselUi: {
    actions: {
      definitions: {
        pluginId: string
        action: string
        title: string
        description: string
      }
    }
  }
}

interface GqlProps {
  data?: QueryProps & Partial<Response>
  navigate(input: { variables: { pluginId: string, action?: string, payload?: string } }): Promise<{ success: boolean }>
}

type Props = OwnProps & ChildProps & GqlProps

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

  navigate(pluginId: string, action?: string, payload?: {}) {
    this.props.navigate({
      variables: {
        pluginId,
        action,
        payload: payload && JSON.stringify(payload)
      }
    })
  }

  handleDocumentSelect = (datasetId: string, documentId: string) => {
    // TODO: This is just selecting the first... not the best etc
    const pluginId = this.props.data
      && this.props.data.vesselUi
      && this.props.data.vesselUi.actions.definitions[0].pluginId
    if (pluginId != null) {
      this.navigate(pluginId, 'document.view', {
        datasetId,
        documentId
      })
    } else {
      console.error('no plugin to do that')
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
            onDocumentSelect={this.handleDocumentSelect}
          />}
      </Container>
    )
  }
}

const DOCUMENT_VIEW_ACTIONS = gql`
query {
  vesselUi {
    actions(input: { action: "document.view" }) {
      definitions {
        pluginId
        action
        title
        description
      }
    }
  }
}
`

const NAVIGATE_MUTATION = gql`
mutation navigate($pluginId: String!, $action: String, $payload: String) {
  vesselUi {
    navigate(input: {pluginId: $pluginId, action: $action, payload: $payload}) {
      success
    }
  }
}
`

export default compose(
  graphql<Response, OwnProps, Props>(NAVIGATE_MUTATION, { name: 'navigate' }),
  graphql<Response, OwnProps, Props>(DOCUMENT_VIEW_ACTIONS)
)(App)
