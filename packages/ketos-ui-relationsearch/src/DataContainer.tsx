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
    relations: {
      id: string,
      type: string,
      subType?: string,
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

const QUERY = gql`
query findRelation($datasetId: String!,
     $relationFilter: RelationFilterInput!,
      $offset: Int!, 
      $size: Int!) {
    corpus(id: $datasetId) {
      id
    relations: searchRelations(
      query:$relationFilter,
      offset: $offset,
      limit: $size
    ) {
      id
      type
      subType
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
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
