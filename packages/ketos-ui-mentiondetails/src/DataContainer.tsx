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
      value: string,
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
          type: string
          subType: string
          source: {
            value: string
            type: string
          }
        }[]
        sourceOf: {
          id: string
          type: string
          subType: string
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
        value
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
            type
            subType 
            source {
              value
              type
            }
          }
          sourceOf {
            id
            type 
            subType
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
