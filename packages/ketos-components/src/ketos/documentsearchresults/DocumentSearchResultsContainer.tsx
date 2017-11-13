import * as React from 'react'
import { graphql, gql, QueryProps } from 'react-apollo'
import DocumentSearchResults from './DocumentSearchResults'

export interface OwnProps {
    datasetId: string,
    query: string,
    offset: number,
    size: number,
    onOffsetChange(offset: number): void
}

interface Response {
    corpus: {
        id: string
        searchDocuments: {
            hits: {
                totalCount: number
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
    const { data, offset, size, onOffsetChange } = props

    if (!data || data.loading || !data.corpus) {
        return <div />
    }

    const hits = data.corpus.searchDocuments.hits

    return (
        <DocumentSearchResults
            offset={offset}
            size={size}
            onOffsetChange={onOffsetChange}
            totalResults={hits.totalCount}
            results={data.corpus.searchDocuments.hits.results}
        />
    )
}

const DOCUMENT_SEARCH_QUERY = gql`
query search($datasetId: String!, $query: String!, $offset: Int, $size: Int) {
  corpus(id: $datasetId) {
    searchDocuments(search: $query, offset: $offset, size: $size) {
        hits {
            totalCount
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
    options: (props: Props) => ({
        variables: {
            datasetId: props.datasetId,
            query: props.query,
            offset: props.offset,
            size: props.size
        }
    })
})(container)
