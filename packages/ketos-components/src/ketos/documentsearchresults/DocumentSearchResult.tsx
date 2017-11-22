import * as React from 'react'
import { Label, Icon, Item } from 'semantic-ui-react'

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
            <Item>
                {/* TODO: By doctype or something?
                 <Item.Image size='tiny' src='/assets/images/wireframe/image.png' /> */}
                <Item.Content>
                    <Item.Header as="a" onClick={this.handleDocumentSelect}>{title}</Item.Header>
                    <Item.Meta><small>id: {id} | {length} bytes </small></Item.Meta>
                    <Item.Description>
                        {summary}
                    </Item.Description>
                    <Item.Extra>
                        <Label><Icon name="calendar" />{info.timestamp}</Label>
                        <Label><Icon name="file outline" />Type: {info.type}</Label>
                        <Label><Icon name="talk outline" />Language: {info.language}</Label>
                        <Label><Icon name="lock" />Classification: {info.classification}</Label>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    }
}

export default DocumentSearchResult