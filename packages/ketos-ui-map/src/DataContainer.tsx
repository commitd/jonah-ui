import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    query: string
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

const QUERY = gql`
query searchForLocation($datasetId: String!, $query: String!, $offset: Int, $limit: Int) {
    corpus(id: $datasetId) {
      searchDocuments(query: {content:$query}, ) {
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
