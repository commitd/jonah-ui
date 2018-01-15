import gql from 'graphql-tag'

import { createDataContainer } from 'ketos-components'

type Variables = {
    datasetId: string
    fromType?: string,
    fromValue?: string,
    toType?: string,
    toValue?: string,
    relationshipType?: string,
    relationshipSubType?: string

}

export type Response = {
    corpus: {
        relations: {
            id: string,
            relationshipType: string,
            relationSubtype?: string,
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
      $targetValue: String) {
    corpus(id: $datasetId) {
    relations(
      relationshipType:$relationshipType,
      relationshipSubType:$relationshipSubType,
      targetValue:$targetValue,
      targetType:$targetType,
      sourceType:$sourceType,
      sourceValue:$sourceValue,
    ) {
      id
      relationshipType
      relationSubtype
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
