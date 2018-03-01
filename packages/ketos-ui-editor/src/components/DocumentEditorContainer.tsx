import * as React from 'react'
import DataContainer, { Variables, Response, Document } from './DocumentEditorDataContainer'
import DocumentEditorForm from './DocumentEditorForm'
import EditorView from './EditorView'
export default class Container extends React.Component<Variables & { edit: boolean }> {

    render() {
        return (
            <DataContainer variables={this.props}>
                <EditorView
                    edit={this.props.edit}
                    onSave={this.handleSave}
                    onDelete={this.handleDelete}
                    dataToItem={(data?: Partial<Response>) => data && data.corpus && data.corpus.document}
                >
                    <DocumentEditorForm />
                </EditorView>
            </DataContainer>
        )
    }

    private handleSave = (item: Document) => {
        console.log('save')
    }

    private handleDelete = (item: Document) => {
        console.log('delete')
    }

}
