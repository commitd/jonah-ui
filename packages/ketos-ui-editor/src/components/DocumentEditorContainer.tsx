import * as React from 'react'
import DataContainer, { Variables, Response, Document } from './DocumentEditorDataContainer'
import EditorForm from './DocumentEditorForm'
import EditorView from './common/EditorView'
import { graphql, compose, MutationFunc } from 'react-apollo'
import gql from 'graphql-tag'

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
}

class Container extends React.Component<Variables & OwnProps> {

    render() {
        return (
            <DataContainer variables={this.props}>
                <EditorView
                    key={this.props.documentId}
                    edit={this.props.edit}
                    onSave={this.handleSave}
                    onDelete={this.handleDelete}
                    dataToItem={(data?: Partial<Response>) => data && data.corpus && data.corpus.document}
                >
                    <EditorForm />
                </EditorView>
            </DataContainer>
        )
    }

    private handleSave = (item: Document, allDatasets?: boolean): Promise<boolean> => {
        return this.props.save({
            variables: {

                datasetId: allDatasets ? undefined : this.props.datasetId,
                // Clean up the document so tis got just want is requrid in it
                document: {
                    id: item.id || '',
                    content: item.content || '',
                    metadata: (item.metadata || []).map(m => ({ key: m.key, value: m.value })),
                    properties: (item.properties || {})
                }
            }
        }).then(d => {
            return d.data && d.data.saveDocument && d.data.saveDocument.length > 0
        })
    }

    private handleDelete = (item: Document, allDatasets?: boolean): Promise<boolean> => {
        return this.props.delete({
            variables: {
                datasetId: allDatasets ? undefined : this.props.datasetId,
                documentId: item.id
            }
        }).then(d => {
            return d.data && d.data.deleteDocument && d.data.deleteDocument.length > 0
        })
    }

}

const SAVE_MUTATION = gql`
mutation savee($datasetId: String!, $document: BaleenDocumentInput!) {
    saveDocument(datasetId: $datasetId, document: $document) {
        dataset
    }
  }
`

const DELETE_MUTATION = gql`
mutation delete($datasetId: String!, $documentId: String!) {
    deleteDocument(datasetId: $datasetId, reference: {
        documentId: $documentId
    }) {
        dataset
    }
  }
`

export default compose(
    graphql(SAVE_MUTATION, { name: 'save' }),
    graphql(DELETE_MUTATION, { name: 'delete' })
)(Container)
