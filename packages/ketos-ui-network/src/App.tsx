import * as React from 'react'
const isEqual = require('lodash.isequal')
import { PluginProps } from 'invest-plugin'
import { MessageBox } from 'invest-components'
import NetworkExpander from './NetworkModel'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  entityId?: string,
  relationId?: string,
  documentId?: string,
  mentionId?: string
}

type RelationViewPayload = {
  datasetId: string
  relationId: string
}

type EntityViewPayload = {
  datasetId: string
  entityId: string
}

type MentionViewPayload = {
  datasetId: string
  mentionId: string
}

type DocumentViewPayload = {
  datasetId: string
  documentId: string
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: 're3d',
    entityId: '1a84b291f8220eb83fd79fa24b2b3088799016f3950f64da64fbe87d926d66b0'
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { entityId, mentionId, relationId, documentId, datasetId } = this.state

    if (datasetId == null) {
      return (
        <MessageBox
          title="No entity or dataset"
          description="Please use another plugin to select an entity of dataset"
        />
      )
    }

    return (
      <div>
        <NetworkExpander
          datasetId={datasetId}
          entityId={entityId}
          mentionId={mentionId}
          relationId={relationId}
          documentId={documentId}
        />
      </div>
    )
  }

  private onAction = (action?: string, payload?: {}) => {

    if (action === 'relation.view') {
      const p = payload as RelationViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: undefined,
        entityId: undefined,
        relationId: p.relationId,
        documentId: undefined,
      })
    } else if (action === 'entity.view') {
      const p = payload as EntityViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: undefined,
        entityId: p.entityId,
        relationId: undefined,
        documentId: undefined,
      })
    } else if (action === 'mention.view') {
      const p = payload as MentionViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: p.mentionId,
        entityId: undefined,
        relationId: undefined,
        documentId: undefined,
      })
    } else if (action === 'document.view') {
      const p = payload as DocumentViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: undefined,
        entityId: undefined,
        relationId: undefined,
        documentId: p.documentId,
      })
    }

  }
}

export default App
