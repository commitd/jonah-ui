import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    value?: string,
    type?: string,
    subType?: string,
    offset?: number,
    size?: number
}

export type Response = {
    corpus: {
        id: string,
        mentions: {
            id: string
            type: string
            subType?: string
            value: string
            entityId: string
            begin: number
            end: number
            document?: {
                id: string
                content: string
                info: {
                    title: string
                }
            }
        }[]
    }
}

const QUERY = gql`
query GetMention($datasetId: String!, $value: String, $type: String, $subType: String, $offset: Int, $size: Int) {
    corpus(id: $datasetId) {
      id,
      mentions(probe:{type: $type, value:$value, subType: $subType}, offset: $offset, limit: $size) {
        id
        type 
        subType
        value
        entityId
        begin
        end
        document {
            id
            content
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
