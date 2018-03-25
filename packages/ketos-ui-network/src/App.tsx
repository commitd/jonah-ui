import * as React from 'react'
const isEqual = require('lodash.isequal')
import { PluginProps } from 'invest-plugin'
import { MessageBox, PrerequisiteContainer } from 'invest-components'
import NetworkExpander from './NetworkModel'
import {
  RELATION_VIEW, ENTITY_VIEW, MENTION_VIEW, DocumentViewPayload,
  MentionViewPayload, EntityViewPayload, RelationViewPayload, DOCUMENT_VIEW, ENTITY_SEARCH
} from 'ketos-components'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  entityId?: string,
  relationId?: string,
  documentId?: string,
  mentionId?: string
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: 'news_es',
    entityId: '05e50a85-3b3e-4e66-bd68-bb09e0ac39e2'
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
      <PrerequisiteContainer
        fluid={true}
        missingTitle="Mention required"
        missingDescription={
          'This view needs an mention, entity, document or relation to display. ' +
          'An entity is a good start point to explore its graph.'
        }
        check={() => datasetId != null
          && (entityId != null || mentionId != null || relationId != null || documentId != null)}
        fulfillingAction={ENTITY_SEARCH}
      >
        <NetworkExpander
          datasetId={datasetId}
          entityId={entityId}
          mentionId={mentionId}
          relationId={relationId}
          documentId={documentId}
        />
      </PrerequisiteContainer>
    )
  }

  private onAction = (action?: string, payload?: {}) => {

    if (action === RELATION_VIEW) {
      const p = payload as RelationViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: undefined,
        entityId: undefined,
        relationId: p.relationId,
        documentId: undefined,
      })
    } else if (action === ENTITY_VIEW) {
      const p = payload as EntityViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: undefined,
        entityId: p.entityId,
        relationId: undefined,
        documentId: undefined,
      })
    } else if (action === MENTION_VIEW) {
      const p = payload as MentionViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: p.mentionId,
        entityId: undefined,
        relationId: undefined,
        documentId: undefined,
      })
    } else if (action === DOCUMENT_VIEW) {
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
