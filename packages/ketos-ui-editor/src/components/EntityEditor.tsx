import * as React from 'react'
import { Response } from './EntityEditorDataContainer'

export type Props = {
    data?: Response
    edit: boolean
}

export default class EntityEditor extends React.Component<Props> {

    render() {
        return <p>EntityEditor</p>
    }
}