import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'

type Variables = {
    datasetId: string
}

export type Response = {
    corpus: {
        id: string
        metadata: {
            keys: {
                bins: {
                    key: string
                    count: number
                }[]

            }
        }
    }
}

const QUERY = gql`
query getMetadataKeys($datasetId: String!) {
    corpus(id: $datasetId) {
      id
      metadata {
        keys(size: 50) {
         bins {
            key: term
            count
          }
        }
      }
    }
  }
`

export default createDataContainer<Variables, Response>(QUERY)
