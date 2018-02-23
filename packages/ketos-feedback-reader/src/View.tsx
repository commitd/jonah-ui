import * as React from 'react'
import { Table, Button, Header, Divider } from 'semantic-ui-react'

type OwnProps = {
    feedback: {
        id: string
        user: string
        pluginName?: string
        type: string
        subject: string
        comment: string
    }[]
    onDelete(feedbackId: string): void,
    onRefresh?(): void
}

type Props = OwnProps

class View extends React.Component<Props> {

    handleAction = (feedbackId: string) => () => {
        this.props.onDelete(feedbackId)
    }

    render() {
        const { feedback, onRefresh } = this.props

        const refreshButton = onRefresh &&
            <Button floated="right" content="Refresh" icon="refresh" onClick={onRefresh} />

        if (feedback.length === 0) {
            return (
                <div>
                    {refreshButton}
                    <p>No feedback provided.</p>
                </div>
            )
        }

        return (
            <div>
                {refreshButton}
                <Divider clearing={true} hidden={true} />
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>User</Table.HeaderCell>
                            <Table.HeaderCell>Plugin</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>Comment</Table.HeaderCell>
                            <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {feedback.map(d => <Table.Row key={d.id}>
                            <Table.Cell>{d.id}</Table.Cell>
                            <Table.Cell>{d.user}</Table.Cell>
                            <Table.Cell>{d.pluginName ? d.pluginName : 'None'}</Table.Cell>
                            <Table.Cell>{d.type}</Table.Cell>
                            <Table.Cell>
                                <Header size="small">{d.subject}</Header>
                                <div>
                                    {d.comment}
                                </div>
                            </Table.Cell>
                            <Table.Cell textAlign="right">
                                <Button icon="trash" content="Delete" onClick={this.handleAction(d.id)} />
                            </Table.Cell>
                        </Table.Row>)}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default View