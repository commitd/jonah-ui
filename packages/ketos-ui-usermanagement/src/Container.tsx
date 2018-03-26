import gql from 'graphql-tag'

import * as React from 'react'
import { Loader } from 'semantic-ui-react'
import { PluginProps } from 'invest-plugin'
import { graphql, compose, QueryProps, MutationFunc } from 'react-apollo'
import { User } from './types'
import UsersView from './UsersView'

interface QueryResponse {
    users: User[]
}

interface DeleteUserVariables {
    username: string
}
interface DeleteUserResponse {
    username: string
}

interface SaveUserResponse {
    username: string
}

interface SaveUserVariables {
    username: string
    name: string
    roles: string[]
    password: string | null
}

type OwnProps = {}

interface GqlProps {
    data?: QueryProps & Partial<QueryResponse>
    saveUser: MutationFunc<SaveUserResponse, SaveUserVariables>
    deleteUser: MutationFunc<DeleteUserResponse, DeleteUserVariables>
}

export type Props = OwnProps & GqlProps & PluginProps

export const GET_ALL_USERS_QUERY = gql`
    query getAllUsers {
        users {
            username
            roles
        }
    }
`

export const SAVE_USER_MUTATION = gql`
    mutation saveUser($username: String!, $name: String!, $roles: [String], $password: String) {
        saveUser(user: { username: $username, name: $name, roles: $roles }, password: $password) {
            username
        }
    }
`

export const DELETE_USER_MUTATION = gql`
    mutation deleteUser($username: String!) {
        deleteUser(username: $username)
    }
`

class Container extends React.Component<Props> {
    handleSave = (user: User, password: string | null) => {
        this.props
            .saveUser({
                variables: {
                    username: user.username,
                    name: user.username,
                    roles: user.roles,
                    password
                }
            })
            .then(() => {
                console.log('saved')
                if (this.props.data != null) {
                    this.props.data.refetch()
                }
            })
    }
    handleDelete = (username: string) => {
        this.props
            .deleteUser({
                variables: {
                    username: username
                }
            })
            .then(() => {
                console.log('deleted')
                if (this.props.data != null) {
                    this.props.data.refetch()
                }
            })
    }

    render() {
        const { data } = this.props

        if (!data || data.loading || !data.users) {
            return <Loader active={true} />
        }

        return (
            <UsersView users={data.users} onSave={this.handleSave} onDelete={this.handleDelete} />
        )
    }
}

export default compose(
    graphql<Response, OwnProps & PluginProps, Props>(GET_ALL_USERS_QUERY),
    graphql<Response, OwnProps & PluginProps, Props>(SAVE_USER_MUTATION, { name: 'saveUser' }),
    graphql<Response, OwnProps & PluginProps, Props>(DELETE_USER_MUTATION, { name: 'deleteUser' })
)(Container)
