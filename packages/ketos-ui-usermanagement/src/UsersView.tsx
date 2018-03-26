import * as React from 'react'
import * as PropTypes from 'prop-types'
import { PluginContext } from 'invest-plugin'
import Users from './Users'
import { User } from './types'

type Props = {
    users: User[]
    onSave(user: User, password: string | null): void
    onDelete(username: string): void
}

type Context = PluginContext

class UsersView extends React.Component<Props> {
    static contextTypes = {
        pluginApi: PropTypes.object
    }

    context: Context

    render() {
        const { users, onSave, onDelete } = this.props

        return (
            <Users
                users={users}
                availableRoles={['DEV', 'ADMIN', 'USER']}
                onSave={onSave}
                onDelete={onDelete}
            />
        )
    }
}

export default UsersView
