import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    value: string,
    type?: string
}

export type Response = {
    corpus: {
        mentions: {
            id: string
            type: string
            value: string
            entityId: string
            document?: {
                id: string
                title: string
                summary: string
            }
        }[]
    }
}

const QUERY = gql`
query GetEntityView($datasetId: String!, $value: String, $type: String) {
    corpus(id: $datasetId) {
      mentions(probe:{type: $type, value:$value}) {
        id
        type 
        value
        entityId
        document {
            id
            title
            summary
        }
      }
    }
}
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
