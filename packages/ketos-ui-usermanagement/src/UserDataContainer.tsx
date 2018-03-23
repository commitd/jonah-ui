import gql from 'graphql-tag'

import { createDataContainer } from 'invest-components'
import { User } from './types'

type Variables = {
}

export type Response = {
    users: User[]
}

export const GET_ALL_USERS_QUERY = `
query getAllUsers {
    users {
        username
        roles
    }
  }
`

export const QUERY = gql(GET_ALL_USERS_QUERY)

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
