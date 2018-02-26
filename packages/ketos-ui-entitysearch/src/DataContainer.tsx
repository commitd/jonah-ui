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
        searchEntities: {
            hits: {
                results: (BasicEntityNode & {
                    document: BasicDocumentNode & {
                        summary: string
                    }
                })[]
            }
        }
    }
}

const QUERY = gql`
query GetEntity($datasetId: String!, $entityFilter: EntityFilterInput!, $offset: Int, $size: Int) {
    corpus(id: $datasetId) {
      id,
      searchEntities(query:$entityFilter) {
          hits(offset: $offset, size: $size) {
              results {
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
    }
}
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
