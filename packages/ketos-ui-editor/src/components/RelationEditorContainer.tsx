import gql from 'graphql-tag'
import * as React from 'react'
import { MutationFunc, compose, graphql } from 'react-apollo'
import { RelationItem } from './EditableTypes'
import DataContainer, { Response, Variables } from './RelationEditorDataContainer'
import EditorForm from './RelationEditorForm'
import { addPropertiesList, cleanMention } from './Utils'
import EditorView from './common/EditorView'

type DeleteMutationResult = {
  deleteRelation: {
    dataset: string
  }[]
}

type SaveMutationResult = {
  saveRelation: {
    dataset: string
  }[]
}

type OwnProps = {
  edit: boolean
  save: MutationFunc<SaveMutationResult>
  delete: MutationFunc<DeleteMutationResult>
  variables: Variables
  allDatasets: boolean
}

class Container extends React.Component<OwnProps> {
  render() {
    return (
      <DataContainer variables={this.props.variables}>
        <EditorView
          key={this.props.variables.relationId}
          edit={this.props.edit}
          onSave={this.handleSave}
          onDelete={this.handleDelete}
          dataToItem={(data?: Partial<Response>) => data && data.corpus && addPropertiesList(data.corpus.relation)}
        >
          <EditorForm />
        </EditorView>
      </DataContainer>
    )
  }

  private handleSave = (item: RelationItem): Promise<boolean> => {
    return this.props
      .save({
        variables: {
          datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
          // Clean up the document so tis got just want is requrid in it
          relation: {
            id: item.id || '',
            begin: item.begin || 0,
            end: item.end || 0,
            type: item.type || '',
            subType: item.subType || '',
            value: item.value || '',
            docId: item.docId,
            properties: item.properties || {},
            source: cleanMention(item.source),
            target: cleanMention(item.target)
          }
        }
      })
      .then(d => {
        return d.data && d.data.saveRelation && d.data.saveRelation.length > 0
      })
  }

  private handleDelete = (item: RelationItem): Promise<boolean> => {
    return this.props
      .delete({
        variables: {
          datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
          documentId: item.docId,
          relationId: item.id
        }
      })
      .then(d => {
        return d.data && d.data.deleteRelation && d.data.deleteRelation.length > 0
      })
  }
}

const SAVE_MUTATION = gql`
  mutation save($datasetId: String, $relation: BaleenRelationInput!) {
    saveRelation(datasetId: $datasetId, relation: $relation) {
      dataset
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete($datasetId: String, $documentId: String!, $relationId: String!) {
    deleteRelation(datasetId: $datasetId, reference: { documentId: $documentId, relationId: $relationId }) {
      dataset
    }
  }
`

export default compose(graphql(SAVE_MUTATION, { name: 'save' }), graphql(DELETE_MUTATION, { name: 'delete' }))(
  Container
)
