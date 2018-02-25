import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PrerequisiteContainer } from 'invest-components'
import { PluginProps } from 'invest-plugin'

import DataContainer from './DataContainer'
import EntityView from './EntityView'
import { ENTITY_VIEW, EntityViewPayload, ENTITY_SEARCH } from 'ketos-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string
  entityId?: string
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
    const { datasetId, entityId } = this.state

    return (
      <PrerequisiteContainer
        missingTitle="Entity required"
        missingDescription="This view needs an entity to display, you can use another plugin to provide that"
        check={() => datasetId != null && entityId != null}
        fulfillingAction={ENTITY_SEARCH}
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
    } else if (action === ENTITY_VIEW) {
      const p = ((payload || {}) as EntityViewPayload)
      this.setState({
        datasetId: p.datasetId,
        entityId: p.entityId
      })
    }
  }
}

export default App
