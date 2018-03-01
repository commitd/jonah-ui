import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { PropertiesMap } from 'invest-types'

export type Variables = {
    datasetId: string,
    mentionId: string
}

export type Mention = {
    id: string
    docId: string
    entityId: string
    type: string
    subType?: string
    value: string
    begin: number
    end: number
    properties: PropertiesMap
}

export type Response = {
    corpus: {
        id: string
        mention: Mention
    }
}

const QUERY = gql`
query get($datasetId: String!, $mentionId: ID!) {
  corpus(id: $datasetId) {
    id
    mention(id: $mentionId) {
        id
        docId
        entityId
        type
        subType
        value
        begin
        end
        properties
    }
  }
}
`

export default createDataContainer<Variables, Response>(QUERY)