import gql from 'graphql-tag'

import * as React from 'react'
import { Loader } from 'semantic-ui-react'
import { PluginProps } from 'invest-plugin'
import { graphql, compose, DataProps, MutationFunc } from 'react-apollo'
import { User } from './types'
import UsersView from './UsersView'

interface QueryResponse {
    users: User[]
    user: User
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

type GqlProps = Partial<DataProps<QueryResponse>> & {
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
        user {
            username
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

        if (data != null && data.loading) {
            return <Loader active={true} />
        }

        const users = data == null || data.users == null ? [] : data.users
        const currentUser = data == null || data.user == null ? undefined : data.user

        return (
            <UsersView
                users={users}
                currentUser={currentUser}
                onSave={this.handleSave}
                onDelete={this.handleDelete}
            />
        )
    }
}

export default compose(
    graphql<PluginProps, QueryResponse>(GET_ALL_USERS_QUERY),
    graphql<PluginProps, SaveUserResponse, SaveUserVariables>(SAVE_USER_MUTATION, {
        name: 'saveUser'
    }),
    graphql<PluginProps, DeleteUserResponse, DeleteUserVariables>(DELETE_USER_MUTATION, {
        name: 'deleteUser'
    })
)(Container)
