import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import {
    Metadata
} from 'ketos-components'
import { PropertiesMap } from 'invest-types'

export type Variables = {
    datasetId: string,
    documentId: string
}

export type Document = {
    id: string
    content: string
    properties: PropertiesMap
    metadata: Metadata[]
}

export type Response = {
    corpus: {
        id: string
        document: Document & {
            info: {
                title: string
                date: number
            }
            summary: string
            length: number
        }
    }
}

const QUERY = gql`
query get($datasetId: String!, $documentId: String!) {
  corpus(id: $datasetId) {
    id
    document(id: $documentId) {
        id
        info {
            title
            date
        }
        length
        content
        summary
        properties
        metadata {
          key
          value
        }
    }
  }
}
`

export default createDataContainer<Variables, Response>(QUERY)