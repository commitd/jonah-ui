import * as React from 'react'
import { Button, List, Icon, Table, Modal, Form, Container } from 'semantic-ui-react'
import { Ellipsis, Paginated } from 'invest-components'
import { User } from './types'

export interface Props {
    users: User[]
    availableRoles: string[]
    onSave(user: User, password: string | null): void
    onDelete(username: string): void
}

type State = {
    username: string
    password: string | null
    roles: string[]
    saveMode: 'NEW' | 'EDIT' | null
    stagedForDeletion: string | null
}

const DEFAULT_STATE: State = {
    saveMode: null,
    username: '',
    password: '',
    roles: [],
    stagedForDeletion: null
}

class UsersTable extends React.Component<Props> {
    state: State = DEFAULT_STATE

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

    updateUserSelection(user: User | null) {
        if (user == null) {
            this.setState(Object.assign({}, DEFAULT_STATE, { saveMode: 'NEW' }))
        } else {
            this.setState(
                Object.assign({}, DEFAULT_STATE, {
                    username: user.username,
                    roles: user.roles,
                    saveMode: 'EDIT'
                })
            )
        }
    }

    handleUsernameChange(username: String) {
        this.setState({ username })
    }

    handlePasswordChange(password: String) {
        this.setState({ password })
    }

    toggleRole(role: string) {
        const { roles } = this.state
        let newRoles
        if (roles.some(r => r === role)) {
            newRoles = roles.filter(r => r !== role)
        } else {
            newRoles = roles.concat([role])
        }
        this.setState({ roles: newRoles })
    }

    handleClose = () => {
        this.setState({ saveMode: null })
    }

    canSave = () => {
        const { username, password, roles, saveMode } = this.state
        if (saveMode === 'NEW' && (password == null || password.length === 0)) {
            return false
        }
        return username != null && username.length > 0 && roles && roles.length > 0
    }

    handleSubmit = () => {
        const { username, roles, password } = this.state
        this.props.onSave({ username, roles }, password)
        this.setState(DEFAULT_STATE)
    }

    renderForm() {
        const { availableRoles } = this.props
        const { username, roles, password, saveMode } = this.state
        return (
            <Modal.Content>
                <Form>
                    <Form.Input
                        name="username"
                        label="Username"
                        onChange={e =>
                            this.handleUsernameChange(Object.assign({ value: '' }, e.target).value)
                        }
                        value={username}
                    />
                    <Form.Group grouped={true}>
                        <label>Roles</label>
                        {availableRoles.map((r: string) => (
                            <Form.Field
                                key={r}
                                label={r}
                                control="input"
                                type="checkbox"
                                checked={roles && roles.some(r2 => r === r2)}
                                onChange={this.toggleRole.bind(this, r)}
                            />
                        ))}
                    </Form.Group>
                    <Form.Input
                        name="password"
                        type="password"
                        label={saveMode === 'NEW' ? 'Password' : 'Change Password'}
                        onChange={e =>
                            this.handlePasswordChange(Object.assign({ value: '' }, e.target).value)
                        }
                        value={password}
                    />
                </Form>
            </Modal.Content>
        )
    }

    tryDelete(username: string) {
        this.setState({ stagedForDeletion: username })
    }

    handleDelete = () => {
        const { stagedForDeletion } = this.state
        if (stagedForDeletion != null) {
            this.props.onDelete(stagedForDeletion)
            this.setState({ stagedForDeletion: null })
        }
    }

    handleCancelDelete = (username: string) => {
        this.setState({ stagedForDeletion: null })
    }

    render() {
        const { users } = this.props
        const { saveMode, stagedForDeletion } = this.state

        return (
            <Container>
                <Table celled={false} size="small" selectable={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>Roles</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users.map((m, i) => (
                            <Table.Row key={m.username + '_' + i}>
                                <Table.Cell>{this.renderSafeValue(m.username)}</Table.Cell>
                                <Table.Cell>{this.renderSafeValue(m.roles)}</Table.Cell>
                                <Table.Cell textAlign="right">
                                    <Button
                                        icon="edit"
                                        primary={true}
                                        onClick={() => this.updateUserSelection(m)}
                                    />
                                    <Button
                                        icon="trash"
                                        color="red"
                                        onClick={this.tryDelete.bind(this, m.username)}
                                    />
                                </Table.Cell>
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
                                    onClick={() => this.updateUserSelection(null)}
                                >
                                    <Icon name="user" /> Add User
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <Modal
                    header={saveMode === 'NEW' ? 'Create User' : 'Edit User'}
                    open={saveMode != null}
                    content={this.renderForm()}
                    actions={[
                        { key: 'save', content: 'Save', primary: true, disabled: !this.canSave() }
                    ]}
                    onClose={() => this.setState({ saveMode: null })}
                    onActionClick={this.handleSubmit}
                />
                <Modal
                    open={stagedForDeletion != null}
                    content={`Are you sure you want to delete user ${stagedForDeletion}?`}
                    actions={[
                        { key: 'cancel', content: 'No', onClick: this.handleCancelDelete },
                        { key: 'delete', content: 'Yes', color: 'red', onClick: this.handleDelete }
                    ]}
                />
            </Container>
        )
    }
}

export default class PaginatedUsersTable extends React.Component<Props> {
    render() {
        return (
            <Paginated items={this.props.users} itemsKey="users">
                <UsersTable
                    users={[]}
                    availableRoles={this.props.availableRoles}
                    onSave={this.props.onSave}
                    onDelete={this.props.onDelete}
                />
            </Paginated>
        )
    }
}
