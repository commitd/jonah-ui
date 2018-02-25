import * as React from 'react'
const isEqual = require('lodash.isequal')
import { PluginProps } from 'invest-plugin'
import DataContainer from './DataContainer'
import RelationView from './RelationView'
import { MessageBox, PrerequisiteContainer } from 'invest-components'
import { RELATION_VIEW, RelationViewPayload, RELATION_SEARCH } from 'ketos-components'
type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  entityId?: string,
  relationId?: string
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
    return (
      <PrerequisiteContainer
        missingTitle="Mention required"
        missingDescription="This view needs a relation to display, you can use another plugin to provide that"
        check={() => datasetId != null && relationId != null}
        fulfillingAction={RELATION_SEARCH}
      >
        <DataContainer variables={{ datasetId: datasetId || '', relationId: relationId || '' }} >
          <RelationView />
        </DataContainer >
      </PrerequisiteContainer>

    )
  }

  private onAction = (action?: string, payload?: {}) => {

    if (action === RELATION_VIEW) {
      const p = payload as RelationViewPayload
      this.setState({
        datasetId: p.datasetId,
        relationId: p.relationId,
      })
    }

  }
}

export default App
