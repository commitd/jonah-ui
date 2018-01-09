import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    entityId: string
}

export type Response = {
    corpus: {
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
                    }
                }[]
            }[]
        }
    }
}

const QUERY = gql`
query GetRelationsForEntity($datasetId: String!, $entityId: ID) {
    corpus(id: $datasetId) {
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
            }
          }
        }
      }
    }
  }
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
