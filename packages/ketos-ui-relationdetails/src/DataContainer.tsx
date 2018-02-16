import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    relationId: string
}

export type Response = {

    corpus?: {
        id: string,
        name: string,
        relation: {
            id: string
            begin: number
            end: number
            type: string
            subtype: string
            source: {
                type: string
                id: string
                value: string
            }
            target: {
                type: string
                id: string
                value: string
            }
            document: {
                id: string
                content: string
                info: {
                    title: string
                }
            }
        }
    }
}

export const GET_RELATIONS_FOR_ENTITY_QUERY = `
query GetRelations($datasetId: String!, $relationId: String!) {
    corpus(id: $datasetId) {
        id
        name
        relation(id:$relationId) {
            id
            begin
            end
            type
            subType
            source {
                type
                value
                id
            }
            target {
                type
                value
                id
            }
            document {
                id
                content
                info {
                    title
                }
            }
        }
    }
  }
`

export const QUERY = gql(GET_RELATIONS_FOR_ENTITY_QUERY)

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
