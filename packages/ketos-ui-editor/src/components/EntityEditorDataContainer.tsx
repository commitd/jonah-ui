import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { PropertiesMap } from 'invest-types'

export type Variables = {
    datasetId: string,
    entityId: string
}

export type Entity = {
    id: string
    docId: string
    type: string
    subType?: string
    value: string
    properties: PropertiesMap
}

export type Response = {
    corpus: {
        id: string
        entity: Entity
    }
}

const QUERY = gql`
query get($datasetId: String!, $entityId: ID!) {
  corpus(id: $datasetId) {
    id
    entity(id: $entityId) {
        id
        docId
        type
        subType
        value
        properties
    }
  }
}
`

export default createDataContainer<Variables, Response>(QUERY)