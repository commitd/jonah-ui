import * as React from 'react'
import { Response } from './MentionEditorDataContainer'

export type Props = {
    data?: Response
    edit: boolean
}

export default class MentionEditor extends React.Component<Props> {

    render() {
        return <p>MentionEditor</p>
    }
}