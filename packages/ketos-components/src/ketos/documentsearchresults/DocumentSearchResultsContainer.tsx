import * as React from 'react'
import { graphql, QueryProps } from 'react-apollo'
import gql from 'graphql-tag'
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
                total?: number
                results: {
                    id: string
                    length: number
                    summary: string
                    info: {
                        title: string
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
    const { datasetId, data, offset, size, onOffsetChange } = props

    if (!data || data.loading || !data.corpus) {
        return <div />
    }

    const hits = data.corpus.searchDocuments.hits

    return (
        <DocumentSearchResults
            datasetId={datasetId}
            offset={offset}
            size={size}
            onOffsetChange={onOffsetChange}
            total={hits.total}
            results={data.corpus.searchDocuments.hits.results}
        />
    )
}

const DOCUMENT_SEARCH_QUERY = gql`
query search($datasetId: String!, $query: String!, $offset: Int, $size: Int) {
  corpus(id: $datasetId) {
    searchDocuments(query: { content: $query }) {
        hits(offset: $offset, size: $size) {
            total
            results {
              id
              length
              summary
              info {
                title
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
