import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { PropertiesMap } from 'invest-types'

export type Variables = {
    datasetId: string,
    relationId: string
}

export type Response = {
    corpus: {
        id: string
        relation: {
            id: string
            docId: string
            type: string
            subType?: string
            value: string
            properties: PropertiesMap
            source: {
                id: string
                entityId: string
                type: string
                value: string
            }
            target: {
                id: string
                entityId: string
                type: string
                value: string
            }
        }
    }
}

const QUERY = gql`
query get($datasetId: String!, $relationId: String!) {
  corpus(id: $datasetId) {
    id
    document(id: $relationId) {
        id
        docId
        type
        subType
        value
        properties
        source {
            id
            entityId
            type
            value
        }
        target {
            id
            entityId
            type
            value
        }
    }
  }
}
`

export default createDataContainer<Variables, Response>(QUERY)