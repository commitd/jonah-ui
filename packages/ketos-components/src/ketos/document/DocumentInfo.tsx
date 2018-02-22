import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Ellipsis } from 'invest-components'
import { ActionDropdown } from 'invest-components'
import { BasicDocumentInfo, FullDocumentInfo } from '../../types'

export type Props = {
    documentId: string
    datasetId: string
    info: BasicDocumentInfo | FullDocumentInfo
    length?: number
}

class DocumentInfo extends React.Component<Props> {

    handleAction = (act: (payload?: {}) => void) => {
        act({
            documentId: this.props.documentId,
            datasetId: this.props.datasetId
        })
    }

    render() {

        const { documentId, length, datasetId, info } = this.props

        // We upcast to FullDocumentInfo and then check everything
        const i = info as FullDocumentInfo

        return (
            <Table size="small" definition={true}>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell colSpan="2">
                            <ActionDropdown
                                text="View"
                                action="document.view"
                                onSelect={this.handleAction}
                            />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Id</Table.Cell>
                        <Table.Cell><Ellipsis text={documentId} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Dataset</Table.Cell>
                        <Table.Cell>{datasetId}</Table.Cell>
                    </Table.Row>
                    {length && <Table.Row>
                        <Table.Cell>Length</Table.Cell>
                        <Table.Cell>{length} characters</Table.Cell>
                    </Table.Row>}
                    {i.language && <Table.Row>
                        <Table.Cell>Language</Table.Cell>
                        <Table.Cell>{i.language}</Table.Cell>
                    </Table.Row>}
                    {i.source && <Table.Row>
                        <Table.Cell>Source</Table.Cell>
                        <Table.Cell><Ellipsis text={i.source} /></Table.Cell>
                    </Table.Row>}
                    {i.type && <Table.Row>
                        <Table.Cell>Type</Table.Cell>
                        <Table.Cell>{info.type}</Table.Cell>
                    </Table.Row>}
                    {i.date && <Table.Row>
                        <Table.Cell>Date</Table.Cell>
                        <Table.Cell>{info.date}</Table.Cell>
                    </Table.Row>}
                    {i.timestamp && <Table.Row>
                        <Table.Cell>Timestamp</Table.Cell>
                        <Table.Cell>{i.timestamp}</Table.Cell>
                    </Table.Row>}
                    {i.classification && <Table.Row>
                        <Table.Cell>Classification</Table.Cell>
                        <Table.Cell>{i.classification}</Table.Cell>
                    </Table.Row>}
                    {i.caveats && i.caveats.length > 0 && <Table.Row>
                        <Table.Cell>Caveats</Table.Cell>
                        <Table.Cell>{i.caveats.join('; ')}</Table.Cell>
                    </Table.Row>}
                    {i.releasability && i.releasability.length > 0 && <Table.Row>
                        <Table.Cell>Releasibility</Table.Cell>
                        <Table.Cell>{i.releasability.join('; ')}</Table.Cell>
                    </Table.Row>}
                    {i.publishedIds && i.publishedIds.length > 0 && <Table.Row>
                        <Table.Cell>Published IDs</Table.Cell>
                        <Table.Cell>{i.publishedIds.join('; ')}</Table.Cell>
                    </Table.Row>}
                </Table.Body>
            </Table>
        )
    }
}

export default DocumentInfo