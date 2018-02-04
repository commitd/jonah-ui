import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
  datasetId: string
  entityId: string
}

export type Response = {
  corpus: {
    id: string
    entity?: {
      id: string,
      type: string,
      longestValue: string,
      mentions: {
        id: string
        begin: number,
        end: number,
        type: string,
        value: string
        properties: {
          key: string,
          value: {}
        }[]
        targetOf: {
          id: string
          relationshipType: string
          relationSubtype: string
          source: {
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
            value: string
            type: string
          }
        }[]
      }[]
      document: {
        id: string,
        content: string
      }
    }
  }
}

const QUERY = gql`
query GetEntityView($datasetId: String!, $entityId: ID) {
    corpus(id: $datasetId) {
      id
      entity(id: $entityId) {
        id
        docId
        type
        longestValue
        mentions {
          id
          begin
          end
          type
          value
          properties {
              key
              value
          }
          targetOf {
            id
            relationshipType
            relationSubtype 
            source {
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
              value
              type
            }
          }
        }
        document {
          id
          content
        }
      }
    }
  }
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
