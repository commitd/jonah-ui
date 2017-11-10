import * as React from 'react'
import { Segment, Label, Header, Icon } from 'semantic-ui-react'

export interface DocumentResult {
    id: string
    length: number
    info: {
        language: string
        source: string
        type: string
        classification: string
        timestamp: string
    }
}

export type Props = {
    document: DocumentResult
}

class DocumentSearchResult extends React.Component<Props> {
    render() {
        const { document } = this.props
        const { id, length, info } = document
        return (
            <Segment>
                <Header>{info.source}</Header>
                <div>
                    <Label><Icon name="calendar" />{info.timestamp}</Label>
                    <Label><Icon name="file outline" />Type: {info.type}</Label>
                    <Label><Icon name="talk outline" />Language: {info.language}</Label>
                    <Label><Icon name="lock" />Classification: {info.classification}</Label>
                </div>
                <p><small>id: {id} | {length} bytes </small></p>
            </Segment>
        )
    }
}

export default DocumentSearchResult