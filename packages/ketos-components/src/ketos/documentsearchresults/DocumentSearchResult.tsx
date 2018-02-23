import * as React from 'react'
import { Label, Icon, Item, Segment } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'
import { DOCUMENT_VIEW } from '../../Actions';

export interface DocumentResult {
    id: string
    length: number
    summary: string
    info: {
        title: string
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
        const { id, length, summary, info } = document
        return (
            <Item>
                <Item.Content>
                    <Segment basic={true} floated="right">
                        <ActionDropdown text="View" action={DOCUMENT_VIEW} onSelect={this.handleAction} />
                    </Segment>
                    <Item.Header>
                        {info.title}
                    </Item.Header>
                    <Item.Meta><small>id: {id} | {length} characters </small></Item.Meta>
                    <Item.Description>
                        {summary}
                    </Item.Description>
                    <Item.Extra>
                        {info.timestamp != null && < Label > <Icon name="calendar" />{info.timestamp}</Label>}
                        {info.type != null && info.type !== '' &&
                            <   Label><Icon name="file outline" />Type: {info.type}</Label>}
                        {info.language != null && info.language !== '' &&
                            <Label> <Icon name="talk outline" />Language: {info.language}</Label>}
                        {info.classification != null && info.classification !== '' &&
                            <Label><Icon name="lock" />Classification: {info.classification}</Label>}
                    </Item.Extra>
                </Item.Content >
            </Item >
        )
    }
}

export default DocumentSearchResult