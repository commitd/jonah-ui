import gql from 'graphql-tag'
import * as React from 'react'
import { MutationFunc, compose, graphql } from 'react-apollo'
import { EntityItem } from './EditableTypes'
import DataContainer, { Response, Variables } from './EntityEditorDataContainer'
import EditorForm from './EntityEditorForm'
import { addPropertiesList, propertiesListToMap } from './Utils'
import EditorView from './common/EditorView'

type DeleteMutationResult = {
  deleteEntity: {
    dataset: string
  }[]
}

type SaveMutationResult = {
  saveEntity: {
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
          key={this.props.variables.entityId}
          edit={this.props.edit}
          onSave={this.handleSave}
          onDelete={this.handleDelete}
          dataToItem={(data?: Partial<Response>) => data && data.corpus && addPropertiesList(data.corpus.entity)}
        >
          <EditorForm />
        </EditorView>
      </DataContainer>
    )
  }

  private handleSave = (item: EntityItem): Promise<boolean> => {
    return this.props
      .save({
        variables: {
          datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
          // Clean up the document so tis got just want is requrid in it
          entity: {
            id: item.id || '',
            type: item.type || '',
            subType: item.subType || '',
            value: item.value || '',
            docId: item.docId,
            properties: propertiesListToMap(item.propertiesList)
          }
        }
      })
      .then(d => {
        return d.data && d.data.saveEntity && d.data.saveEntity.length > 0
      })
  }

  private handleDelete = (item: EntityItem): Promise<boolean> => {
    return this.props
      .delete({
        variables: {
          datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
          documentId: item.docId,
          entityId: item.id
        }
      })
      .then(d => {
        return d.data && d.data.deleteEntity && d.data.deleteEntity.length > 0
      })
  }
}

const SAVE_MUTATION = gql`
  mutation save($datasetId: String, $entity: BaleenEntityInput!) {
    saveEntity(datasetId: $datasetId, entity: $entity) {
      dataset
    }
  }
`

const DELETE_MUTATION = gql`
  mutation delete($datasetId: String, $documentId: String!, $entityId: String!) {
    deleteEntity(datasetId: $datasetId, reference: { documentId: $documentId, entityId: $entityId }) {
      dataset
    }
  }
`

export default compose(graphql(SAVE_MUTATION, { name: 'save' }), graphql(DELETE_MUTATION, { name: 'delete' }))(
  Container
)
