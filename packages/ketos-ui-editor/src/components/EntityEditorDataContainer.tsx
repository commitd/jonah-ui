import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { PropertiesMap } from 'invest-types'

export type Variables = {
    datasetId: string,
    entityId: string
}

export type Response = {
    corpus: {
        id: string
        entity: {
            id: string
            docId: string
            type: string
            subType?: string
            value: string
            properties: PropertiesMap
        }
    }
}

const QUERY = gql`
query get($datasetId: String!, $entityId: String!) {
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