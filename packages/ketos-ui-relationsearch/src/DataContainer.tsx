import gql from 'graphql-tag'
import { RelationFilter } from 'ketos-components'
import { createDataContainer } from 'invest-components'

type Variables = {
  datasetId: string
  relationFilter: RelationFilter,
  size: number,
  offset: number
}

export type Response = {
  corpus?: {
    id: string
    searchRelations: {
      hits: {
        results: {
          id: string,
          type: string,
          subType?: string,
          value: string,
          docId: string
          source: {
            id: string,
            type: string,
            value: string,
            entityId: string
          }
          target: {
            id: string,
            type: string,
            value: string,
            entityId: string
          }
        }[]
      }
    }
  }
}

const QUERY = gql`
query findRelation($datasetId: String!,
     $relationFilter: RelationFilterInput!,
      $offset: Int!, 
      $size: Int!) {
    corpus(id: $datasetId) {
      id
    searchRelations(
      query:$relationFilter      
    ) {
      hits(offset: $offset, size: $size) { 
        results {
          id
          type
          subType
          value
          docId
          source {
            id
            type
            value
            entityId
          }
          target {
            id
            type
            value   
            entityId
          }
        }
      }
    }
  }
}
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
