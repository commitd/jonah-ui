import gql from 'graphql-tag'
import { PropertiesMap } from 'invest-types'
import { createDataContainer } from 'invest-components'

type Variables = {
  datasetId: string
  mentionId: string
}

export type Response = {
  corpus: {
    id: string
    mention: {
      id: string
      entityId: string
      begin: number,
      end: number,
      type: string,
      value: string
      properties: PropertiesMap
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
      document: {
        id: string,
        content: string
      }
    }
  }
}

const QUERY = gql`
query GetEntityView($datasetId: String!, $mentionId: ID) {
    corpus(id: $datasetId) {
      id
      mention(id: $mentionId) {
        id
        begin
        end
        type
        subType
        value
        properties 
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
