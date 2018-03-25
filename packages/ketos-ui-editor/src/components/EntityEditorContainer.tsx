import * as React from 'react'
import DataContainer, { Variables, Response, Entity } from './EntityEditorDataContainer'
import EditorForm from './EntityEditorForm'
import EditorView from './common/EditorView'
import { graphql, compose, MutationFunc } from 'react-apollo'
import gql from 'graphql-tag'

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
}

class Container extends React.Component<Variables & OwnProps> {

    render() {
        return (
            <DataContainer variables={this.props}>
                <EditorView
                    key={this.props.entityId}
                    edit={this.props.edit}
                    onSave={this.handleSave}
                    onDelete={this.handleDelete}
                    dataToItem={(data?: Partial<Response>) => data && data.corpus && data.corpus.entity}
                >
                    <EditorForm />
                </EditorView>
            </DataContainer>
        )
    }

    private handleSave = (item: Entity, allDatasets?: boolean): Promise<boolean> => {
        return this.props.save({
            variables: {

                datasetId: allDatasets ? undefined : this.props.datasetId,
                // Clean up the document so tis got just want is requrid in it
                entity: {
                    id: item.id || '',
                    type: item.type || '',
                    subType: item.subType || '',
                    value: item.value || '',
                    docId: item.docId,
                    properties: (item.properties || {})
                }
            }
        }).then(d => {
            return d.data && d.data.saveEntity && d.data.saveEntity.length > 0
        })
    }

    private handleDelete = (item: Entity, allDatasets?: boolean): Promise<boolean> => {
        return this.props.delete({
            variables: {
                datasetId: allDatasets ? undefined : this.props.datasetId,
                documentId: item.docId,
                entityId: item.id
            }
        }).then(d => {
            return d.data && d.data.deleteEntity && d.data.deleteEntity.length > 0
        })
    }

}

const SAVE_MUTATION = gql`
mutation save($datasetId: String!, $entity: BaleenEntityInput!) {
    saveEntity(datasetId: $datasetId, entity: $entity) {
        dataset
    }
  }
`

const DELETE_MUTATION = gql`
mutation delete($datasetId: String!, $documentId: String!, $entityId: String!) {
    deleteEntity(datasetId: $datasetId, reference: {
        documentId: $documentId,
        entityId: $entityId,
    }) {
        dataset
    }
  }
`

export default compose(
    graphql(SAVE_MUTATION, { name: 'save' }),
    graphql(DELETE_MUTATION, { name: 'delete' })
)(Container)
