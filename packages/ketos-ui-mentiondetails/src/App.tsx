import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PrerequisiteContainer } from 'ketos-components'
import { PluginProps } from 'invest-plugin'

import DataContainer from './DataContainer'
import EntityView from './MentionView'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string
  mentionId?: string
}

type MentionViewPayload = {
  datasetId: string
  mentionId: string
}

class App extends React.Component<Props, State> {

  state: State = {
    mentionId: 'd01a2154eb0f988227279858639715d1b8a7a859e3f54b42454fde8b30cf435d',
    datasetId: 're3d'
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { mentionId } = this.state

    return (
      <PrerequisiteContainer
        title="No mention"
        description="This view requires an mention to display"
        check={() => mentionId != null}
      >
        <DataContainer variables={{ datasetId: this.state.datasetId || '', mentionId: this.state.mentionId || '' }}>
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
        mentionId: undefined
      })
    } else if (action === 'mention.view') {
      const p = ((payload || {}) as MentionViewPayload)
      this.setState({
        datasetId: p.datasetId,
        mentionId: p.mentionId
      })
    }
  }
}

export default App
