import gql from 'graphql-tag'

import { createDataContainer } from 'invest-components'
import { DocumentFilter, EntityFilter, RelationFilter, MentionFilter } from 'ketos-components'

type Variables = {
    datasetId: string
    documentFilter?: DocumentFilter
    entityFilters?: EntityFilter[]
    relationFilters?: RelationFilter[]
    mentionFilters?: MentionFilter[]
    offset: number
    limit: number
}

export type Response = {
    corpus: {
        searchDocuments: {
            hits: {
                results: {
                    id: string
                    summary: string
                    locations: {
                        name: string
                        lat: number
                        lon: number
                        geohash: string
                    }[]
                }[]
            }
        }
    }
}
//  
// 
const QUERY = gql`
query searchForLocation($datasetId: String!, $documentFilter:DocumentFilterInput!, 
    $mentionFilters:[MentionFilterInput], $entityFilters:[EntityFilterInput], $relationFilters:[RelationFilterInput],
    $offset: Int, $limit: Int) {
    corpus(id: $datasetId) {
      searchDocuments(query: $documentFilter
        mentions:$mentionFilters, entities:$entityFilters, relations:$relationFilters) {
        hits(size:$limit, offset:$offset) {
          results {
            id
            summary
            locations {
              name
              lat
              lon
              geohash(precision:5)
            }
          }
        }
      }
    }
  }  
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
