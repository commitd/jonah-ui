import { PrerequisiteContainer } from 'invest-components'
import { PluginProps } from 'invest-plugin'
import { MENTION_SEARCH, MENTION_VIEW, MentionViewPayload } from 'ketos-components'
import * as React from 'react'
import DataContainer from './DataContainer'
import EntityView from './MentionView'
const isEqual = require('lodash.isequal')

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string
  mentionId?: string
}

class App extends React.Component<Props, State> {
  state: State = {
    mentionId: undefined,
    datasetId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { datasetId, mentionId } = this.state

    return (
      <PrerequisiteContainer
        missingTitle="Mention required"
        missingDescription="This view needs an mention to display, you can use another plugin to provide that"
        check={() => datasetId != null && mentionId != null}
        fulfillingAction={MENTION_SEARCH}
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
    } else if (action === MENTION_VIEW) {
      const p = (payload || {}) as MentionViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: p.mentionId
      })
    }
  }
}

export default App
