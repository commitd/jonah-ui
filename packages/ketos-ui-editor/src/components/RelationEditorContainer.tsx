import * as React from 'react'
import DataContainer, { Variables, Response, Relation } from './RelationEditorDataContainer'
import EditorForm from './RelationEditorForm'
import EditorView from './common/EditorView'
import { graphql, compose, MutationFunc } from 'react-apollo'
import gql from 'graphql-tag'
import { cleanMention } from './Utils'

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
}

class Container extends React.Component<Variables & OwnProps> {

    render() {
        return (
            <DataContainer variables={this.props}>
                <EditorView
                    edit={this.props.edit}
                    onSave={this.handleSave}
                    onDelete={this.handleDelete}
                    dataToItem={(data?: Partial<Response>) => data && data.corpus && data.corpus.relation}
                >
                    <EditorForm />
                </EditorView>
            </DataContainer>
        )
    }

    private handleSave = (item: Relation, allDatasets?: boolean): Promise<boolean> => {
        return this.props.save({
            variables: {

                datasetId: allDatasets ? undefined : this.props.datasetId,
                // Clean up the document so tis got just want is requrid in it
                relation: {
                    id: item.id || '',
                    begin: item.begin || 0,
                    end: item.end || 0,
                    type: item.type || '',
                    subType: item.subType || '',
                    value: item.value || '',
                    docId: item.docId,
                    properties: (item.properties || {}),
                    source: cleanMention(item.source),
                    target: cleanMention(item.target)
                }
            }
        }).then(d => {
            return d.data && d.data.saveRelation && d.data.saveRelation.length > 0
        })
    }

    private handleDelete = (item: Relation, allDatasets?: boolean): Promise<boolean> => {
        return this.props.delete({
            variables: {
                datasetId: allDatasets ? undefined : this.props.datasetId,
                documentId: item.docId,
                relationId: item.id
            }
        }).then(d => {
            return d.data && d.data.deleteRelation && d.data.deleteRelation.length > 0
        })
    }

}

const SAVE_MUTATION = gql`
mutation save($datasetId: String!, $relation: BaleenRelationInput!) {
    saveRelation(datasetId: $datasetId, relation: $relation) {
        dataset
    }
  }
`

const DELETE_MUTATION = gql`
mutation delete($datasetId: String!, $documentId: String!, $relationId: String!) {
    deleteRelation(datasetId: $datasetId, reference: {
        documentId: $documentId,
        relationId: $relationId,
    }) {
        dataset
    }
  }
`

export default compose(
    graphql(SAVE_MUTATION, { name: 'save' }),
    graphql(DELETE_MUTATION, { name: 'delete' })
)(Container)
