import * as React from 'react'
import { Segment, Label, Header, Icon } from 'semantic-ui-react'

export interface DocumentResult {
    id: string
    length: number
    title: string
    summary: string
    info: {
        language: string
        source: string
        type: string
        classification: string
        timestamp: string
    }
}

export type Props = {
    document: DocumentResult,
    onDocumentSelect?(document: DocumentResult): void
}

class DocumentSearchResult extends React.Component<Props> {

    handleDocumentSelect = () => {
        if (this.props.onDocumentSelect) {
            this.props.onDocumentSelect(this.props.document)
        }
    }
    render() {
        const { document } = this.props
        const { id, length, title, summary, info } = document
        return (
            <Segment>
                <Header onClick={this.handleDocumentSelect}>{title}</Header>
                <div>{summary}</div>
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