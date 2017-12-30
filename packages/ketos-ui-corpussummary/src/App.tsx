import * as React from 'react'
import { ChildProps } from 'invest-plugin'
import { graphql, QueryProps } from 'react-apollo'
import gql from 'graphql-tag'
import View from './ViewContainer'
import { DatasetSelector } from 'invest-components'
import { Container } from 'semantic-ui-react'
const isEqual = require('lodash.isequal')

interface ViewPayload {
  datasetId?: string
}

interface Response {
  corpora: {
    id: string
    name: string
  }[]
}

interface GqlProps {
  data?: QueryProps & Partial<Response>
}

type OwnProps = {}

type Props = OwnProps & GqlProps & ChildProps

type State = {
  datasetId?: string,
}

class App extends React.Component<Props, State> {

  state: State = {

  }

  componentWillReceiveProps(nextProps: Props) {
    // Process action / payload if its changed
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as ViewPayload
      this.setState({
        datasetId: payload ? payload.datasetId : undefined,
      })
    }
  }

  handleDatasetSelected = (datasetId: string) => {
    this.setState({
      datasetId
    })
  }

  render() {
    const { datasetId } = this.state

    return (
      <Container fluid={false}>
        <DatasetSelector selectedDataset={datasetId} onDatasetSelected={this.handleDatasetSelected} />
        {datasetId && <View dataset={datasetId} />}
      </Container>
    )
  }
}

const CORPUS_SUMMARY_QUERY = gql`
query Corpora {
  corpora {
    id
    name
  }
}
`

export default graphql<Response, OwnProps & ChildProps, Props>(CORPUS_SUMMARY_QUERY)(App)
