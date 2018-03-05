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

export type LocatedDocument = {

    id: string
    length: number
    info: {
        title: string
        language: string
        source: string
        type: string
        classification: string
        timestamp: string
    }
    summary: string
    entities: LocationEntity[]
}

export type LocationEntity = {
    id: string
    value: string
    properties: {
        geoJson?: {}
    }
}

export type Response = {
    corpus: {
        id: string
        searchDocuments: {
            hits: {
                size: number
                offset: number
                total?: number
                results: LocatedDocument[]
            }
        }
    }
}

const QUERY = gql`
query searchForLocation($datasetId: String!, $documentFilter:DocumentFilterInput!,
    $offset: Int, $limit: Int) {
    corpus(id: $datasetId) {
      id
      searchDocuments(query: $documentFilter, entities:[{
        type: "Location"
      }]) {
        hits(size:$limit, offset:$offset) {
          size
          offset
          total
          results {
            id
            length
            summary
            info {
                title
                language
                source
                type
                classification
                timestamp
            }
            entities(probe: {type: "Location"}, limit:100) {
               id
               type
               value
               properties
            }
          }
        }
      }
    }
  }   
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
