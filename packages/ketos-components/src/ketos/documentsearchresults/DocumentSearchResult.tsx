import * as React from 'react'
import { Label, Icon, Item } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'

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
    datasetId: string,
    document: DocumentResult,
}

class DocumentSearchResult extends React.Component<Props> {

    handleAction = (act: (payload?: {}) => void) => {
        act({
            datasetId: this.props.datasetId,
            documentId: this.props.document.id
        })
    }

    render() {
        const { document } = this.props
        const { id, length, title, summary, info } = document
        return (
            <Item>
                {/* TODO: By doctype or something?
                 <Item.Image size='tiny' src='/assets/images/wireframe/image.png' /> */}
                <Item.Content>
                    <Item.Header>
                        {title}
                    </Item.Header>
                    <Item.Meta><small>id: {id} | {length} bytes </small></Item.Meta>
                    <Item.Description>
                        {summary}
                    </Item.Description>
                    <Item.Extra>
                        <Label><Icon name="calendar" />{info.timestamp}</Label>
                        <Label><Icon name="file outline" />Type: {info.type}</Label>
                        <Label><Icon name="talk outline" />Language: {info.language}</Label>
                        <Label><Icon name="lock" />Classification: {info.classification}</Label>
                        <ActionDropdown text="View" action="document.view" onSelect={this.handleAction} />
                    </Item.Extra>
                </Item.Content>
            </Item >
        )
    }
}

export default DocumentSearchResult