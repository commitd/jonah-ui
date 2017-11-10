import * as React from 'react'
import { graphql, gql, QueryProps } from 'react-apollo'
import DocumentSearchResults from './DocumentSearchResults'

export interface OwnProps {
    datasetId: string,
    query: string
}

interface Response {
    corpus: {
        id: string
        searchDocuments: {
            hits: {
                results: {
                    id: string
                    length: number
                    info: {
                        language: string
                        source: string
                        type: string
                        classification: string
                        timestamp: string
                    }
                }[]
            }
        }
    }
}

interface GqlProps {
    data?: QueryProps & Partial<Response>
}

type Props = OwnProps & GqlProps

const container = (props: Props) => {
    const { data } = props

    if (!data || data.loading || !data.corpus) {
        return <div />
    }

    return (
        <DocumentSearchResults results={data.corpus.searchDocuments.hits.results} />
    )
}

const DOCUMENT_SEARCH_QUERY = gql`
query search($datasetId: String!, $query: String!, $limit: Int) {
  corpus(id: $datasetId) {
    searchDocuments(search: $query, limit: $limit) {
        hits {
            results {
              id
              length
              info {
                language
                source
                type
                classification
                timestamp
              } 
            }
        }
    }
  }
}
`

export default graphql<Response, OwnProps, Props>(DOCUMENT_SEARCH_QUERY, {
    options: (props: Props) => ({ variables: { datasetId: props.datasetId, query: props.query, limit: 50 } })
})(container)
