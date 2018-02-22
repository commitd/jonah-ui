import gql from 'graphql-tag'

import { createDataContainer, BasicEntityNode, BasicDocumentNode } from 'ketos-components'

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
        entities: (BasicEntityNode & {
            document: BasicDocumentNode & {
                summary: string
            }
        })[]
    }
}

const QUERY = gql`
query GetEntity($datasetId: String!, $value: String, $type: String, $subType: String, $offset: Int, $size: Int) {
    corpus(id: $datasetId) {
      id,
      entities(probe:{type: $type, value:$value,  subType: $subType}, offset: $offset, limit: $size) {
        id
        type 
        subType
        value
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
