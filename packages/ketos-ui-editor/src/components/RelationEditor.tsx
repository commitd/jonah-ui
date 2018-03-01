import * as React from 'react'
import { Response } from './RelationEditorDataContainer'

export type Props = {
    data?: Response
    edit: boolean
}

export default class RelationEditor extends React.Component<Props> {

    render() {
        return <p>Relation Editor</p>
    }
}