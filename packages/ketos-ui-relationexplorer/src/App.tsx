import * as React from 'react'
const isEqual = require('lodash.isequal')
import { ChildProps } from 'invest-plugin'
import DataContainer from './DataContainer'
import RelationView from './RelationView'

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string,
  entityId?: string,
  relationId?: string
}

type RelationViewPayload = {
  dataset: string
  relationId: string
}

type EntityViewPayload = {
  dataset: string
  entityId: string
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: 're3d',
    entityId: '59ccc637f8b8e45f0a9dfcf7'
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { entityId, datasetId } = this.state

    if (datasetId == null || entityId == null) {
      return <p>No data yet</p>
    }

    return (
      <DataContainer variables={{ datasetId: datasetId, entityId: entityId }}>
        <RelationView />
      </DataContainer>

    )
  }

  private onAction = (action?: string, payload?: {}) => {

    if (action === 'relation.view') {
      const p = payload as RelationViewPayload
      this.setState({
        datasetId: p.dataset,
        relationId: p.relationId,
        entityId: undefined
      })
    } else if (action === 'entity.view') {
      const p = payload as EntityViewPayload
      this.setState({
        datasetId: p.dataset,
        entityId: p.entityId,
        relationId: undefined
      })
    }

  }
}

export default App
