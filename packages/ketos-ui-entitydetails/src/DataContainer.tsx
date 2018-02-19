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
      subType?: string,
      value: string,
      properties: {
        key: string,
        value: {}
      }[]
      mentions: {
        id: string
        begin: number,
        end: number,
        value: string,
        type: string
      }[]
      document: {
        id: string,
        content: string
      }
    }
  }
}

const QUERY = gql`
query GetEntityById($datasetId: String!, $entityId: ID) {
    corpus(id: $datasetId) {
      id
      entity(id: $entityId) {
        id
        type
        subType
        value
        properties {
          key
          value
        }
        mentions {
          id
          begin
          end
          type
          value
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
