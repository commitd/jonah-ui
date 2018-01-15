import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    value: string,
    type?: string
}

export type Response = {
    corpus: {
        entities: {
            id: string
            type: string
            values: string[]
            longestValue: string
            document: {
                id: string
                title: string
                summary: string
            }
        }[]
    }
}

const QUERY = gql`
query GetEntityView($datasetId: String!, $value: String!, $type: String) {
    corpus(id: $datasetId) {
      entities(type: $type, value:$value) {
        id
        type 
        values
        longestValue
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
