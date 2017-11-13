import * as React from 'react'
import { Segment } from 'semantic-ui-react'

export interface OwnProps {
    title: string
    content: string
}

export type Props = OwnProps

class DocumentReader extends React.Component<Props> {

    re = new RegExp('\n', 'g')

    render() {
        const { title, content } = this.props

        const lines = content.split('\n')

        return (
            <div>
                <h1>{title}</h1>
                <Segment>
                    {lines.map((l, i) => <p key={i + '_' + l}>{l}</p>)}
                </Segment>
            </div>
        )
    }
}

export default DocumentReader