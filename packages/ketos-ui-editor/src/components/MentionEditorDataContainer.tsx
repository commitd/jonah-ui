import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { PropertiesMap } from 'invest-types'

export type Variables = {
    datasetId: string,
    mentionId: string
}

export type Response = {
    corpus: {
        id: string
        mention: {
            id: string
            docId: string
            entityId: string
            type: string
            subType?: string
            value: string
            properties: PropertiesMap
        }
    }
}

const QUERY = gql`
query get($datasetId: String!, $mentionId: String!) {
  corpus(id: $datasetId) {
    id
    mention(id: $mentionId) {
        id
        docId
        entityId
        type
        subType
        value
        properties
    }
  }
}
`

export default createDataContainer<Variables, Response>(QUERY)