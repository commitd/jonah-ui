import * as React from 'react'
import { Button, List, Icon, Table } from 'semantic-ui-react'
import { Ellipsis, Paginated } from 'invest-components'
import { User } from './types'
import UserForm from './UserForm'

export interface Props {
    users: User[]
}

type State = {
    selectedUser?: User
}

class UsersTable extends React.Component<Props> {
    state: State = {}

    renderSafeValue(v: {}): React.ReactElement<{}> {
        if (v == null) {
            return <span />
        } else if (v instanceof Array) {
            const l = v as Array<{}>
            return (
                <List>
                    {l.map((s, i) => <List.Item key={i}>{this.renderSafeValue(s)}</List.Item>)}
                </List>
            )
        } else {
            const s = v.toString()
            return <Ellipsis key={s} text={s} />
        }
    }

    handleAddUser() {
        this.setState({ selectedUser: null })
    }

    render() {
        const { users } = this.props
        const { selectedUser } = this.state

        return (
            <>
                <Table celled={false} size="small" selectable={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Roles</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map((m, i) => (
                            <Table.Row
                                key={m.username + '_' + i}
                                onClick={() => this.setState({ selectedUser: m })}
                            >
                                <Table.Cell>{this.renderSafeValue(m.username)}</Table.Cell>
                                <Table.Cell>{this.renderSafeValue(m.roles)}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer fullWidth={true}>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan="4">
                                <Button
                                    floated="right"
                                    icon={true}
                                    labelPosition="left"
                                    primary={true}
                                    size="small"
                                    onClick={() => this.handleAddUser()}
                                >
                                    <Icon name="user" /> Add User
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <UserForm
                    user={selectedUser}
                    availableRoles={['DEV', 'ADMIN', 'USER']}
                    onSubmit={() => {
                        /*TODO*/
                    }}
                />
            </>
        )
    }
}

export default class PaginatedUsersTable extends React.Component<Props> {
    render() {
        return (
            <Paginated items={this.props.users} itemsKey="users">
                <UsersTable users={[]} />
            </Paginated>
        )
    }
}
