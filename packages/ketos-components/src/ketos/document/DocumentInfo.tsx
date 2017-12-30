import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Ellipsis } from 'invest-components'

export interface OwnProps {
    documentId: string
    datasetId: string
    length: number
    language: string
    source: string
    type: string
}

export type Props = OwnProps

class DocumentInfo extends React.Component<Props> {

    render() {

        const { documentId, datasetId, length, language, source, type } = this.props
        return (
            <Table size="small" definition={true}>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Id</Table.Cell>
                        <Table.Cell><Ellipsis text={documentId} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Dataset</Table.Cell>
                        <Table.Cell>{datasetId}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Length</Table.Cell>
                        <Table.Cell>{length} characters</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Language</Table.Cell>
                        <Table.Cell>{language}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Source</Table.Cell>
                        <Table.Cell><Ellipsis text={source} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Type</Table.Cell>
                        <Table.Cell>{type}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }
}

export default DocumentInfo