import * as React from 'react'
import { Form } from 'semantic-ui-react'
import { User } from './types'

export interface Props {
    user?: User
    availableRoles: string[]
    onSubmit: Function
}

type State = {
    username: string
    roles: string[]
}

export default class UserForm extends React.Component<Props> {
    state: State = {
        username: '',
        roles: []
    }

    componentWillMount() {
        this.updateUserSelection(this.props.user)
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.user !== this.props.user) {
            this.updateUserSelection(newProps.user)
        }
    }

    updateUserSelection(user?: User) {
        if (user == null) {
            this.setState({ username: '', roles: [] })
        } else {
            this.setState({ username: user.username, roles: user.roles })
        }
    }

    handleSubmit() {
        this.props.onSubmit()
    }

    handleUsernameChange() {
        // TODO
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

    render() {
        const { availableRoles } = this.props
        const { username, roles } = this.state

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    name="username"
                    label="Username"
                    onChange={this.handleUsernameChange}
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
            </Form>
        )
    }
}
