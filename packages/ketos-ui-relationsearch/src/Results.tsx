import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { Response } from './DataContainer'

type Props = {
    data?: Response
}

class Results extends React.Component<Props> {
    render() {

        const { data } = this.props

        if (!data || !data.corpus.relations || data.corpus.relations.length === 0) {
            return <p>No results found</p>
        }

        const relations = data.corpus.relations

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Source</Table.HeaderCell>
                        <Table.HeaderCell>Relation</Table.HeaderCell>
                        <Table.HeaderCell>Target</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        relations.map(r => {
                            return <Table.Row key={r.id}>
                                <Table.Cell>{r.source.value} [{r.source.type}]</Table.Cell>
                                <Table.Cell>{r.relationshipType}
                                    {r.relationSubtype != null ? ': ' + r.relationSubtype : ''}</Table.Cell>
                                <Table.Cell>{r.target.value} [{r.target.type}]</Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table >
        )

    }
}

export default Results