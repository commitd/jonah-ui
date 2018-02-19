import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PrerequisiteContainer } from 'ketos-components'
import { ChildProps } from 'invest-plugin'

import DataContainer from './DataContainer'
import EntityView from './EntityView'

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string
  entityId?: string
}

type EntityViewPayload = {
  datasetId: string
  entityId: string
}

class App extends React.Component<Props, State> {

  state: State = {
    entityId: undefined,
    datasetId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { entityId } = this.state

    return (
      <PrerequisiteContainer
        title="No entity"
        description="This view requires an entity to display"
        check={() => entityId != null}
      >
        <DataContainer variables={{ datasetId: this.state.datasetId || '', entityId: this.state.entityId || '' }}>
          <EntityView />
        </DataContainer>
      </PrerequisiteContainer>

    )
  }

  private onAction = (action?: string, payload?: {}) => {
    // Implement to deal with new action requests
    // typically this will setState in order and then pass
    // that state as props to a subcomponent (which will
    // then respond with a )

    if (action == null) {
      this.setState({
        entityId: undefined
      })
    } else if (action === 'entity.view') {
      const p = ((payload || {}) as EntityViewPayload)
      this.setState({
        datasetId: p.datasetId,
        entityId: p.entityId
      })
    }
  }
}

export default App
