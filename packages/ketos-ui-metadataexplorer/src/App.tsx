import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'

import { Container } from 'semantic-ui-react'

import { DatasetSelector } from 'invest-components'
import { CorpusViewPayload } from 'ketos-components'

import DatasetContainer from './DataContainer'

import View from './View'

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
        {datasetId &&
          <DatasetContainer variables={{ datasetId }} showRefresh={true}>
            <View />
          </DatasetContainer>
        }
      </Container>
    )
  }
}

export default App
