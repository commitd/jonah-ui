import * as React from 'react'
import DataContainer, { Variables, Response, Mention } from './MentionEditorDataContainer'
import EditorForm from './MentionEditorForm'
import EditorView from './common/EditorView'
import { graphql, compose, MutationFunc } from 'react-apollo'
import gql from 'graphql-tag'

type DeleteMutationResult = {
    deleteMention: {
        dataset: string
    }[]
}

type SaveMutationResult = {
    saveMention: {
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
                    dataToItem={(data?: Partial<Response>) => data && data.corpus && data.corpus.mention}
                >
                    <EditorForm />
                </EditorView>
            </DataContainer>
        )
    }

    private handleSave = (item: Mention, allDatasets?: boolean): Promise<boolean> => {
        return this.props.save({
            variables: {

                datasetId: allDatasets ? undefined : this.props.datasetId,
                // Clean up the document so tis got just want is requrid in it
                mention: {
                    id: item.id || '',
                    type: item.type || '',
                    subType: item.subType || '',
                    value: item.value || '',
                    docId: item.docId,
                    properties: (item.properties || {})
                }
            }
        }).then(d => {
            return d.data && d.data.saveMention && d.data.saveMention.length > 0
        })
    }

    private handleDelete = (item: Mention, allDatasets?: boolean): Promise<boolean> => {
        return this.props.delete({
            variables: {
                datasetId: allDatasets ? undefined : this.props.datasetId,
                documentId: item.docId,
                mentionId: item.id
            }
        }).then(d => {
            return d.data && d.data.deleteMention && d.data.deleteMention.length > 0
        })
    }

}

const SAVE_MUTATION = gql`
mutation delete($datasetId: String!, $mention: BaleenMentionInput!) {
    saveEntity(datasetId: $datasetId, mention: $mention) {
        dataset
    }
  }
`

const DELETE_MUTATION = gql`
mutation delete($datasetId: String!, $documentId: String!, $mentionId: String!) {
    deleteDocument(datasetId: $datasetId, reference: {
        documentId: $documentId,
        mentionId: $mentionId,
    }) {
        dataset
    }
  }
`

export default compose(
    graphql(SAVE_MUTATION, { name: 'save' }),
    graphql(DELETE_MUTATION, { name: 'delete' })
)(Container)
