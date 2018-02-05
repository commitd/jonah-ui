import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    entityId: string
}

export type Response = {
    corpus: {
        id: string
        entity: {
            id: string,
            docId: string,
            type: string,
            longestValue: string,
            mentions: {
                id: string
                type: string,
                value: string,
                targetOf: {
                    id: string
                    relationshipType: string
                    relationSubtype: string
                    source: {
                        id: string
                        value: string
                        type: string
                        entityId: string
                    }
                }[]
                sourceOf: {
                    id: string
                    relationshipType: string
                    relationSubtype: string
                    type: string
                    target: {
                        id: string
                        value: string
                        type: string
                        entityId: string
                    }
                }[]
            }[]
        }
    }
}

export const GET_RELATIONS_FOR_ENTITY_QUERY = `
query GetRelationsForEntity($datasetId: String!, $entityId: ID) {
    corpus(id: $datasetId) {
      id: string
      entity(id: $entityId) {
        id
        docId
        type
        longestValue
        mentions {
          id
          type
          value
          targetOf {
            id
            relationshipType
            relationSubtype 
            source {
              id
              value
              type
              entityId
            }
          }
          sourceOf {
            id
            relationshipType
            relationSubtype
            type 
            target {
              id
              value
              type
              entityId
            }
          }
        }
      }
    }
  }
`

export const QUERY = gql(GET_RELATIONS_FOR_ENTITY_QUERY)

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
