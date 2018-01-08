import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    entityId: string
}

type Response = {
    corpus: {
        entity: {
            id: string,
            type: string,
            longestValue: string,
            mentions: {
                begin: number,
                end: number,
                type: string,
                value: string
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
      entity(id: $entityId) {
        id
        docId
        type
        longestValue
        mentions {
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
