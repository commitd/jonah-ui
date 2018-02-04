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
            relationshipType: string
            relationSubtype: string
            type: string
            sourceType: string
            sourceId: string
            sourceValue: string
            targetType: string
            targetId: string
            targetValue: string
            docId: string
            document: {
                id: string
                title: string
                content: string
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
            relationshipType
            relationSubtype
            type
            sourceType
            sourceId
            sourceValue
            targetType
            targetId
            targetValue
            docId
            document {
                id
                title
                content
            }
        }
    }
  }
`

export const QUERY = gql(GET_RELATIONS_FOR_ENTITY_QUERY)

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
