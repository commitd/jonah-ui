import * as React from 'react'
const isEqual = require('lodash.isequal')

import { ChildProps } from 'vessel-plugin'

import View from './ViewContainer'
import { Container } from 'semantic-ui-react'

import { DatasetSelector } from 'ketos-components'

type Payload = {
  datasetId?: string
  // TODO: support jumping straight to a key: string
}

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as Payload
      this.setState({
        datasetId: payload ? payload.datasetId : this.state.datasetId,
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
      <Container>
        <DatasetSelector selectedDataset={datasetId} onDatasetSelected={this.handleDatasetSelected} />
        {datasetId && <View datasetId={datasetId} />}
      </Container>
    )
  }
}

export default App
