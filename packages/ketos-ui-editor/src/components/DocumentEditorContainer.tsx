import gql from 'graphql-tag'
import * as React from 'react'
import { MutationFunc, compose, graphql } from 'react-apollo'
import DataContainer, { Response, Variables } from './DocumentEditorDataContainer'
import EditorForm from './DocumentEditorForm'
import { DocumentItem } from './EditableTypes'
import { addPropertiesList, propertiesListToMap } from './Utils'
import EditorView from './common/EditorView'

type DeleteMutationResult = {
  deleteDocument: {
    dataset: string
  }[]
}

type SaveMutationResult = {
  saveDocument: {
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
          key={this.props.variables.documentId}
          edit={this.props.edit}
          onSave={this.handleSave}
          onDelete={this.handleDelete}
          dataToItem={(data?: Partial<Response>) => data && data.corpus && addPropertiesList(data.corpus.document)}
        >
          <EditorForm />
        </EditorView>
      </DataContainer>
    )
  }

  private handleSave = (item: DocumentItem): Promise<boolean> => {
    return this.props
      .save({
        variables: {
          datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
          // Clean up the document so tis got just want is requrid in it
          document: {
            id: item.id || '',
            content: item.content || '',
            metadata: (item.metadata || []).map(m => ({ key: m.key, value: m.value })),
            properties: propertiesListToMap(item.propertiesList || [])
          }
        }
      })
      .then(d => {
        return d.data && d.data.saveDocument && d.data.saveDocument.length > 0
      })
  }

  private handleDelete = (item: DocumentItem): Promise<boolean> => {
    return this.props
      .delete({
        variables: {
          datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
          documentId: item.id
        }
      })
      .then(d => {
        return d.data && d.data.deleteDocument && d.data.deleteDocument.length > 0
      })
  }
}

const SAVE_MUTATION = gql`
  mutation save($datasetId: String, $document: BaleenDocumentInput!) {
    saveDocument(datasetId: $datasetId, document: $document) {
      dataset
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete($datasetId: String, $documentId: String!) {
    deleteDocument(datasetId: $datasetId, reference: { documentId: $documentId }) {
      dataset
    }
  }
`

export default compose(graphql(SAVE_MUTATION, { name: 'save' }), graphql(DELETE_MUTATION, { name: 'delete' }))(
  Container
)
