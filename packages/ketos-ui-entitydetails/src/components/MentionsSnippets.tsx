import * as React from 'react'
import { Feed } from 'semantic-ui-react'
import MentionSnippet from './MentionSnippet'

type OwnProps = {
    content: string
    mentions: {
        id: string
        begin: number
        end: number
        value: string
        type: string
    }[]
}

type Props = OwnProps

class MentionsSnippet extends React.Component<Props> {

    render() {
        const { mentions, content } = this.props

        return (
            < Feed >
                {
                    mentions
                        .map(m => <MentionSnippet key={m.id} mention={m} content={content} />)
                }
            </Feed >
        )
    }
}

export default MentionsSnippet