import * as React from 'react'
const isEqual = require('lodash.isequal')
import { ChildProps } from 'invest-plugin'
import DataContainer from './DataContainer'
import RelationView from './RelationView'
import { MessageBox } from 'ketos-components'
type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string,
  entityId?: string,
  relationId?: string
}

type RelationViewPayload = {
  datasetId: string
  relationId: string
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: undefined,
    relationId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { relationId, datasetId } = this.state

    if (datasetId == null || relationId == null) {
      return (
        <MessageBox
          title="No entity or dataset"
          description="Please use another plugin to select an entity of dataset"
        />
      )
    }

    return (
      <DataContainer variables={{ datasetId: datasetId, relationId: relationId }} >
        <RelationView />
      </DataContainer >

    )
  }

  private onAction = (action?: string, payload?: {}) => {

    if (action === 'relation.view') {
      const p = payload as RelationViewPayload
      this.setState({
        datasetId: p.datasetId,
        relationId: p.relationId,
      })
    }

  }
}

export default App
