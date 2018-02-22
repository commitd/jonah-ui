import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PrerequisiteContainer, DocumentViewPayload } from 'ketos-components'
import { ChildProps } from 'invest-plugin'

import DataContainer from './DataContainer'
import View from './View'

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string
  documentId?: string
}

class App extends React.Component<Props, State> {

  state: State = {
    documentId: undefined,
    datasetId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { documentId } = this.state

    return (
      <PrerequisiteContainer
        title="No document"
        description="This view requires an document view"
        check={() => documentId != null}
      >
        <DataContainer variables={{ datasetId: this.state.datasetId || '', documentId: this.state.documentId || '' }}>
          <View />
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
        documentId: undefined
      })
    } else if (action === 'document.view') {
      const p = ((payload || {}) as DocumentViewPayload)
      this.setState({
        datasetId: p.datasetId,
        documentId: p.documentId
      })
    }
  }
}

export default App
