import * as React from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import { DocumentSnippet } from 'ketos-components'

type OwnProps = {
    content: string
    mention: {
        begin: number
        end: number
        value: string
        type: string
    }
}

type Props = OwnProps

class MentionSnippet extends React.Component<Props> {

    render() {
        const { mention, content } = this.props

        return (
            <Feed.Event key={`{m.begin}-{m.end}`}>
                <Feed.Label>
                    <Icon name="file text outline" />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary content={`${mention.value} [${mention.type}] ${mention.begin} to ${mention.end}`} />
                    <Feed.Extra text={true}>
                        <DocumentSnippet
                            begin={mention.begin}
                            end={mention.end}
                            content={content}
                        />
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
        )
    }
}

export default MentionSnippet