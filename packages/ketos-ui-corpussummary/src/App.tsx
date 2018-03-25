import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import { DatasetSelector } from 'invest-components'
import { Container } from 'semantic-ui-react'
const isEqual = require('lodash.isequal')
import { CorpusViewPayload } from 'ketos-components'

import DataContainer from './DataContainer'
import View from './View'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
}

class App extends React.Component<Props, State> {

  state: State = {

  }

  componentWillReceiveProps(nextProps: Props) {
    // Process action / payload if its changed
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as CorpusViewPayload
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
        <DatasetSelector
          provider="DocumentProvider"
          selectedDataset={datasetId}
          onDatasetSelected={this.handleDatasetSelected}
        />
        {datasetId &&
          <DataContainer variables={{ datasetId }} showRefresh={true}>
            <View />
          </DataContainer>}
      </Container>
    )
  }
}

export default App
