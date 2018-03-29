import * as React from 'react'
import DataContainer, { Variables, Response, Mention } from './MentionEditorDataContainer'
import EditorForm from './MentionEditorForm'
import EditorView from './common/EditorView'
import { graphql, compose, MutationFunc } from 'react-apollo'
import gql from 'graphql-tag'
import { cleanMention } from './Utils'

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
    variables: Variables
    allDatasets: boolean

}

class Container extends React.Component<OwnProps> {

    render() {
        return (
            <DataContainer variables={this.props.variables}>
                <EditorView
                    key={this.props.variables.mentionId}
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

    private handleSave = (item: Mention): Promise<boolean> => {
        return this.props.save({
            variables: {

                datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
                // Clean up the document so tis got just want is requrid in it
                mention: cleanMention(item)
            }
        }).then(d => {
            return d.data && d.data.saveMention && d.data.saveMention.length > 0
        })
    }

    private handleDelete = (item: Mention): Promise<boolean> => {
        return this.props.delete({
            variables: {
                datasetId: this.props.allDatasets ? undefined : this.props.variables.datasetId,
                documentId: item.docId,
                mentionId: item.id
            }
        }).then(d => {
            return d.data && d.data.deleteMention && d.data.deleteMention.length > 0
        })
    }

}

const SAVE_MUTATION = gql`
mutation save($datasetId: String, $mention: BaleenMentionInput!) {
    saveMention(datasetId: $datasetId, mention: $mention) {
        dataset
    }
  }
`

const DELETE_MUTATION = gql`
mutation delete($datasetId: String, $documentId: String!, $mentionId: String!) {
    deleteMention(datasetId: $datasetId, reference: {
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
