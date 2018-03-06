import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { PropertiesMap } from 'invest-types'
import { Mention } from './MentionEditorDataContainer'

export type Variables = {
    datasetId: string,
    relationId: string
}

export type Relation = {
    id: string
    docId: string
    type: string
    subType?: string
    value: string
    begin: number
    end: number
    properties: PropertiesMap
    source: Mention
    target: Mention
}

export type Response = {
    corpus: {
        id: string
        relation: Relation
    }
}

const QUERY = gql`
query get($datasetId: String!, $relationId: String!) {
  corpus(id: $datasetId) {
    id
    relation(id: $relationId) {
        id
        docId
        type
        subType
        value
        properties
        begin
        end        
        source {
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
        target {
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
}
`

export default createDataContainer<Variables, Response>(QUERY)