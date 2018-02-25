import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { BasicEntityNode, BasicDocumentNode, EntityFilter } from 'ketos-components'

type Variables = {
    datasetId: string
    entityFilter: EntityFilter
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
query GetEntity($datasetId: String!, $entityFilter: EntityFilter!, $offset: Int, $size: Int) {
    corpus(id: $datasetId) {
      id,
      entities: searchEntities(filter:$entityFilter, offset: $offset, limit: $size) {
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
