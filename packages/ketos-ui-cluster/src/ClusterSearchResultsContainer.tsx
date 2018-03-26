import * as React from 'react'
import { DocumentFilter, EntityFilter, RelationFilter, MentionFilter } from 'ketos-components'
import { graphql, DataProps } from 'react-apollo'
import gql from 'graphql-tag'
import ClusterSearchResultsView from './ClusterSearchResultsView'
import { DocumentResult } from './types'

type Variables = {
    datasetId: string,
    documentFilter: DocumentFilter,
    entityFilters?: EntityFilter[]
    relationFilters?: RelationFilter[]
    mentionFilters?: MentionFilter[]
    offset: number,
    size: number
}

type OwnProps = {
    onClusterSelected: (results: DocumentResult[]) => void
}

interface Response {
    corpus: {
        searchDocuments: {
            hits: {
                cluster: {
                    count: number
                    topics: Array<{
                        documents: Array<DocumentResult>
                        count: number
                        label: string
                        keywords: Array<string>
                    }>
                }
            }
        }
    }
}

type Props = Variables & OwnProps & Partial<DataProps<Response, Variables>>

class ClusterSearchResultsContainer extends React.Component<Props> {

    render() {
        const { data } = this.props

        if (!data || data.loading || !data.corpus) {
            return <div />
        }

        const hits = data.corpus.searchDocuments.hits

        return (
            <ClusterSearchResultsView
                count={hits.cluster.count}
                topics={hits.cluster.topics}
                onResultsSelect={this.props.onClusterSelected}
            />
        )
    }

}

const DOCUMENT_SEARCH_QUERY = gql`
query search($datasetId: String!, $documentFilter: DocumentFilterInput!, 
    $mentionFilters:[MentionFilterInput], $entityFilters:[EntityFilterInput], $relationFilters:[RelationFilterInput],
    $offset: Int, $size: Int) {
    corpus(id: $datasetId) {
        searchDocuments(query: $documentFilter,
            mentions:$mentionFilters, entities:$entityFilters, relations:$relationFilters) {
            hits(offset: $offset, size: $size) {
                cluster{
                    count
                    topics{
                        documents{
                            id
                            length
                            summary
                            info{
                                title
                                language
                                source
                                type
                                classification
                                timestamp
                            }
                        }
                        count
                        label
                        keywords
                    }
                }
            }
        }
    }
}
`

export default graphql<OwnProps & Variables, Response, Variables>(DOCUMENT_SEARCH_QUERY)(ClusterSearchResultsContainer)