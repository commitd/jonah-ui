import { PrerequisiteContainer } from 'invest-components'
import { PluginProps } from 'invest-plugin'
import {
  DOCUMENT_VIEW,
  DocumentViewPayload,
  ENTITY_SEARCH,
  ENTITY_VIEW,
  EntityViewPayload,
  MENTION_VIEW,
  MentionViewPayload,
  RELATION_VIEW,
  RelationViewPayload
} from 'ketos-components'
import * as React from 'react'
import NetworkExpander from './NetworkModel'
const isEqual = require('lodash.isequal')

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string
  entityId?: string
  relationId?: string
  documentId?: string
  mentionId?: string
}

class App extends React.Component<Props, State> {
  state: State = {
    datasetId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { entityId, mentionId, relationId, documentId, datasetId } = this.state

    return (
      <PrerequisiteContainer
        fluid={true}
        missingTitle="Mention required"
        missingDescription={
          'This view needs an mention, entity, document or relation to display. ' +
          'An entity is a good start point to explore its graph.'
        }
        check={() =>
          datasetId != null && (entityId != null || mentionId != null || relationId != null || documentId != null)
        }
        fulfillingAction={ENTITY_SEARCH}
      >
        {datasetId != null && (
          <NetworkExpander
            datasetId={datasetId}
            entityId={entityId}
            mentionId={mentionId}
            relationId={relationId}
            documentId={documentId}
          />
        )}
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
        documentId: undefined
      })
    } else if (action === ENTITY_VIEW) {
      const p = payload as EntityViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: undefined,
        entityId: p.entityId,
        relationId: undefined,
        documentId: undefined
      })
    } else if (action === MENTION_VIEW) {
      const p = payload as MentionViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: p.mentionId,
        entityId: undefined,
        relationId: undefined,
        documentId: undefined
      })
    } else if (action === DOCUMENT_VIEW) {
      const p = payload as DocumentViewPayload
      this.setState({
        datasetId: p.datasetId,
        mentionId: undefined,
        entityId: undefined,
        relationId: undefined,
        documentId: p.documentId
      })
    }
  }
}

export default App
