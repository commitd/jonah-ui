import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    value?: string,
    type?: string,
    offset?: number,
    size?: number
}

export type Response = {
    corpus: {
        id: string,
        mentions: {
            id: string
            type: string
            value: string
            entityId: string
            document?: {
                id: string
                summary: string
                info: {
                    title: string
                }
            }
        }[]
    }
}

const QUERY = gql`
query GetEntityView($datasetId: String!, $value: String, $type: String, $offset: Int, $size: Int) {
    corpus(id: $datasetId) {
      id,
      mentions(probe:{type: $type, value:$value}, offset: $offset, limit: $size) {
        id
        type 
        value
        entityId
        document {
            id
            summary
            info {
                title
            }
        }
      }
    }
}
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
