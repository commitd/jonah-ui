import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'

type Variables = {
  datasetId: string
}

export type Response = {
  corpus: {
    id: string
    name: string
    countDocuments?: number
    countEntities?: number
    countMentions?: number
    countRelations?: number
    documentTypes: {
      bins: {
        count: number
        term: string
      }[]
    }
    documentLanguages: {
      bins: {
        count: number
        term: string
      }[]
    }
    documentClassifications: {
      bins: {
        count: number
        term: string
      }[]
    }
    mentionTypes: {
      bins: {
        count: number
        term: string
      }[]
    }
    documentTimeline: {
      bins: {
        ts: string
        count: number
      }[]
    }
  }
}

const QUERY = gql`
  query CorpusInfo($datasetId: String!) {
    corpus(id: $datasetId) {
      id
      name
      countDocuments
      countEntities
      countRelations
      countMentions
      documentTypes: countByDocumentField(field: "properties.type") {
        bins {
          count
          term
        }
      }
      documentLanguages: countByDocumentField(field: "properties.language") {
        bins {
          count
          term
        }
      }
      documentClassifications: countByDocumentField(field: "properties.classification") {
        bins {
          count
          term
        }
      }
      mentionTypes: countByMentionField(field: "properties.type") {
        bins {
          count
          term
        }
      }
      documentTimeline: documentTimeline {
        bins {
          ts
          count
        }
      }
    }
  }
`

export default createDataContainer<Variables, Response>(QUERY)
