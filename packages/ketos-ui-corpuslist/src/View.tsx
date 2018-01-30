import * as React from 'react'
import { Table } from 'semantic-ui-react'
import { ActionDropdown } from 'invest-components'

type OwnProps = {
    datasets: {
        id: string
        name: string
        description: string
        entities?: number
        documents?: number
        relations?: number
        mentions?: number
    }[]
}

type Props = OwnProps

class View extends React.Component<Props> {

    handleAction = (datasetId: string) => (act: (payload?: {}) => void) => {
        act({
            datasetId
        })
    }

    render() {
        const { datasets } = this.props

        if (datasets.length === 0) {
            return <p>No datasets configured</p>
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Documents</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Mentions</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Entities</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Relations</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {datasets.map(d => <Table.Row key={d.id}>
                        <Table.Cell>{d.id}</Table.Cell>
                        <Table.Cell>{d.name}</Table.Cell>
                        <Table.Cell>{d.description}</Table.Cell>
                        <Table.Cell textAlign="right">{d.documents != null ? d.documents : 'NA'}</Table.Cell>
                        <Table.Cell textAlign="right">{d.mentions != null ? d.mentions : 'NA'}</Table.Cell>
                        <Table.Cell textAlign="right">{d.entities != null ? d.entities : 'NA'}</Table.Cell>
                        <Table.Cell textAlign="right">{d.relations != null ? d.relations : 'NA'}</Table.Cell>
                        <Table.Cell textAlign="right">
                            <ActionDropdown text="View" action="corpus.view" onSelect={this.handleAction(d.id)} />
                        </Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table>
        )
    }
}

export default View