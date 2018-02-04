import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
  datasetId: string
  sourceType?: string,
  sourceValue?: string,
  targetType?: string,
  targetValue?: string,
  relationshipType?: string,
  relationshipSubType?: string
  size: number,
  offset: number
}

export type Response = {
  corpus?: {
    id: string
    relations: {
      id: string,
      relationshipType: string,
      relationSubtype?: string,
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
     $relationshipType:String,
      $relationshipSubType:String, 
      $sourceValue: String, 
      $sourceType: String, 
      $targetType:String, 
      $targetValue: String,
      $offset: Int!, 
      $size: Int!) {
    corpus(id: $datasetId) {
      id
    relations(
      probe:{
        relationshipType:$relationshipType,
        relationSubtype:$relationshipSubType,
        targetValue:$targetValue,
        targetType:$targetType,
        sourceType:$sourceType,
        sourceValue:$sourceValue
      },
      offset: $offset,
      limit: $size
    ) {
      id
      relationshipType
      relationSubtype
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
