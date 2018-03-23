import * as React from 'react'
import { Table, List } from 'semantic-ui-react'
import { Ellipsis, Paginated } from 'invest-components'
import { Metadata } from '../../types'
import { stringOrder } from '../../utils/CompareUtils'

export interface Props {
    metadata: Metadata[]
}

class DocumentMeta extends React.Component<Props> {

    renderSafeValue(v: {}): React.ReactElement<{}> {
        if (v == null) {
            return <span />
        } else if (v instanceof Array) {
            const l = v as Array<{}>
            return <List>{l.map((s, i) => <List.Item key={i}>{this.renderSafeValue(s)}</List.Item>)}</List>
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

        const sorted = [...metadata].sort((a, b) => stringOrder(a.key, b.value))

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
                        sorted.map((m, i) => <Table.Row key={m.key + '_' + i}>
                            <Table.Cell>{m.key}</Table.Cell>
                            <Table.Cell>{this.renderSafeValue(m.value)}</Table.Cell>
                        </Table.Row>
                        )}
                </Table.Body>
            </Table>
        )
    }
}

export default class PaginatedDocumentMeta extends React.Component<Props> {
    render() {
        return (
            <Paginated items={this.props.metadata} itemsKey="metadata">
                <DocumentMeta metadata={[]} />
            </Paginated>
        )
    }
}