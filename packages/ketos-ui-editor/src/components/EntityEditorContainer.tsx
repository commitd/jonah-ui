import * as React from 'react'
import DataContainer, { Variables } from './EntityEditorDataContainer'
import Editor from './EntityEditor'

export default class Container extends React.Component<Variables & { edit: boolean }> {

    render() {
        return (
            <DataContainer variables={this.props}>
                <Editor edit={this.props.edit} />
            </DataContainer>
        )
    }

}