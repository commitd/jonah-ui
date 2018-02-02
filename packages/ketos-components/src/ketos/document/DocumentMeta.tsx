import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Ellipsis } from 'invest-components'

export interface Metadata {
    key: string
    value: string[]
}

export interface OwnProps {
    metadata: Metadata[]
}

export type Props = OwnProps

class DocumentMeta extends React.Component<Props> {

    renderSafeValue(v: {}): React.ReactElement<{}> {
        if (v == null) {
            return <span />
        } else if (v instanceof Array) {
            const l = v as Array<{}>
            return <div>{l.map(this.renderSafeValue)}</div>
        } else {
            const s = v.toString()
            return <Ellipsis key={s} text={s} />
        }
    }

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
                            <Table.Cell>{this.renderSafeValue(m.value)}</Table.Cell>
                        </Table.Row>
                        )}
                </Table.Body>
            </Table>
        )
    }
}

export default DocumentMeta