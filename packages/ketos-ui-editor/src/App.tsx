import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import { PrerequisiteContainer } from 'invest-components'
import {
  MENTION_EDIT, MENTION_DELETE,
  ENTITY_EDIT, ENTITY_DELETE,
  RELATION_EDIT, RELATION_DELETE,
  DOCUMENT_EDIT, DOCUMENT_DELETE,
  MentionEditPayload, EntityEditPayload, RelationEditPayload, DocumentEditPayload,
  MentionDeletePayload, EntityDeletePayload, RelationDeletePayload, DocumentDeletePayload
} from 'ketos-components'
import DocumentEditor from './components/DocumentEditorContainer'
import RelationEditor from './components/RelationEditorContainer'
import EntityEditor from './components/EntityEditorContainer'
import MentionEditor from './components/MentionEditorContainer'

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  mentionId?: string,
  entityId?: string,
  relationId?: string,
  documentId?: string
  edit: boolean
}

class App extends React.Component<Props, State> {

  state: State = {
    edit: false,
    datasetId: 'news_mongo',
    documentId: '487a8a3e721a6a2842b2973f7a7405a8f4c7151d75aa91c52994185883b18708'
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    const { datasetId, mentionId, entityId, relationId, documentId, edit } = this.state

    return (
      <PrerequisiteContainer
        missingTitle="Item required"
        missingDescription="This view needs an mention, entity, relation or document to display"
        check={() => datasetId != null
          && (mentionId != null || entityId != null || relationId != null || documentId != null)}
      >
        {datasetId && documentId && <DocumentEditor datasetId={datasetId} documentId={documentId} edit={edit} />}
        {datasetId && entityId && <EntityEditor datasetId={datasetId} entityId={entityId} edit={edit} />}
        {datasetId && mentionId && <MentionEditor datasetId={datasetId} mentionId={mentionId} edit={edit} />}
        {datasetId && relationId && <RelationEditor datasetId={datasetId} relationId={relationId} edit={edit} />}

      </PrerequisiteContainer>
    )
  }

  private onAction = (action?: string, payload?: {}) => {
    // Implement to deal with new action requests
    // typically this will setState in order and then pass
    // that state as props to a subcomponent (which will
    // then respond with a )

    const state: State = {
      datasetId: undefined,
      mentionId: undefined,
      entityId: undefined,
      relationId: undefined,
      documentId: undefined,
      edit: true
    }

    if (action == null || payload == null) {
      return
    }

    state.edit = action === MENTION_EDIT || action === ENTITY_EDIT
      || action === RELATION_EDIT || action === DOCUMENT_EDIT

    if (action === MENTION_EDIT || action === MENTION_DELETE) {
      const p = payload as MentionEditPayload | MentionDeletePayload
      state.mentionId = p.mentionId
    } else if (action === RELATION_EDIT || action === RELATION_DELETE) {
      const p = payload as RelationEditPayload | RelationDeletePayload
      state.relationId = p.relationId
    } else if (action === ENTITY_EDIT || action === ENTITY_DELETE) {
      const p = payload as EntityEditPayload | EntityDeletePayload
      state.entityId = p.entityId
    } else if (action === DOCUMENT_EDIT || action === DOCUMENT_DELETE) {
      const p = payload as DocumentEditPayload | DocumentDeletePayload
      state.documentId = p.documentId
    }

  }
}

export default App
