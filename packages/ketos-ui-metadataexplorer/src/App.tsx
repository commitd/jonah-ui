import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'

import View from './ViewContainer'
import { Container } from 'semantic-ui-react'

import { DatasetSelector } from 'invest-components'
import { CorpusViewPayload } from 'ketos-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as CorpusViewPayload
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
        <DatasetSelector
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
          provider="DocumentProvider"
        />
        {datasetId && <View datasetId={datasetId} />}
      </Container>
    )
  }
}

export default App
