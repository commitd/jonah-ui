import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { TimeBin } from 'invest-types'
import { DocumentFilter } from 'ketos-components'

type Variables = {
  datasetId: string
  documentFilter: DocumentFilter
}

export type Response = {
  corpus: {
    documentTimeline: {
      bins: TimeBin[]
      interval: string
    }

  }
}

const QUERY = gql`
query Do($documentFilter:DocumentFilterInput!, $datasetId: String!) {
    corpus(id:$datasetId) {
      documentTimeline(query:$documentFilter, interval: MONTH) {
        bins {
          ts
          count
        }
        interval
      }
    }
  }
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
