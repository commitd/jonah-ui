import { PrerequisiteContainer } from 'invest-components'
import { PluginProps } from 'invest-plugin'
import {
  DOCUMENT_DELETE,
  DOCUMENT_EDIT,
  DocumentDeletePayload,
  DocumentEditPayload,
  ENTITY_DELETE,
  ENTITY_EDIT,
  EntityDeletePayload,
  EntityEditPayload,
  MENTION_DELETE,
  MENTION_EDIT,
  MentionDeletePayload,
  MentionEditPayload,
  RELATION_DELETE,
  RELATION_EDIT,
  RelationDeletePayload,
  RelationEditPayload
} from 'ketos-components'
import * as React from 'react'
import DocumentEditor from './components/DocumentEditorContainer'
import EntityEditor from './components/EntityEditorContainer'
import MentionEditor from './components/MentionEditorContainer'
import RelationEditor from './components/RelationEditorContainer'
const isEqual = require('lodash.isequal')

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string
  mentionId?: string
  entityId?: string
  relationId?: string
  documentId?: string
  edit: boolean
}

class App extends React.Component<Props, State> {
  state: State = {
    edit: false,
    datasetId: undefined,
    documentId: undefined,
    mentionId: undefined,
    entityId: undefined,
    relationId: undefined
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
        check={() =>
          datasetId != null && (mentionId != null || entityId != null || relationId != null || documentId != null)
        }
      >
        {datasetId &&
          documentId && <DocumentEditor variables={{ datasetId, documentId }} edit={edit} allDatasets={true} />}
        {datasetId && entityId && <EntityEditor variables={{ datasetId, entityId }} edit={edit} allDatasets={true} />}
        {datasetId &&
          mentionId && <MentionEditor variables={{ datasetId, mentionId }} edit={edit} allDatasets={true} />}
        {datasetId &&
          relationId && <RelationEditor variables={{ datasetId, relationId }} edit={edit} allDatasets={true} />}
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

    state.edit =
      action === MENTION_EDIT || action === ENTITY_EDIT || action === RELATION_EDIT || action === DOCUMENT_EDIT

    if (action === MENTION_EDIT || action === MENTION_DELETE) {
      const p = payload as MentionEditPayload | MentionDeletePayload
      state.datasetId = p.datasetId
      state.mentionId = p.mentionId
    } else if (action === RELATION_EDIT || action === RELATION_DELETE) {
      const p = payload as RelationEditPayload | RelationDeletePayload
      state.datasetId = p.datasetId
      state.relationId = p.relationId
    } else if (action === ENTITY_EDIT || action === ENTITY_DELETE) {
      const p = payload as EntityEditPayload | EntityDeletePayload
      state.datasetId = p.datasetId
      state.entityId = p.entityId
    } else if (action === DOCUMENT_EDIT || action === DOCUMENT_DELETE) {
      const p = payload as DocumentEditPayload | DocumentDeletePayload
      state.datasetId = p.datasetId
      state.documentId = p.documentId
    }

    this.setState(state)
  }
}

export default App
