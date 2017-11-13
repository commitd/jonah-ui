import * as React from 'react'
import { Table } from 'semantic-ui-react'

export interface Metadata {
    key: string
    value: string[]
}

export interface OwnProps {
    metadata: Metadata[]
}

export type Props = OwnProps

class DocumentMeta extends React.Component<Props> {

    render() {
        const { metadata } = this.props

        if (metadata.length === 0) {
            return <p>No metadata</p>
        }

        return (
            <Table celled={true} size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Key</Table.HeaderCell>
                        <Table.HeaderCell>Values</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        metadata.map(m => <Table.Row key={m.key}>
                            <Table.Cell>{m.key}</Table.Cell>
                            <Table.Cell>{m.value.map(s => <span key={s}>{s})</span>)}</Table.Cell>
                        </Table.Row>
                        )}
                </Table.Body>
            </Table>
        )
    }
}

export default DocumentMeta