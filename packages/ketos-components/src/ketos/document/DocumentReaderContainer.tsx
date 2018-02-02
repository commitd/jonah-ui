import * as React from 'react'
import { graphql, QueryProps } from 'react-apollo'
import gql from 'graphql-tag'

import DocumentReader, { Document } from './DocumentReader'

export interface OwnProps {
    datasetId: string,
    documentId: string
}

interface Response {
    corpus: {
        document: Document
    }
}

interface GqlProps {
    data?: QueryProps & Partial<Response>
}

type Props = OwnProps & GqlProps

const container = (props: Props) => {
    const { data, datasetId } = props

    if (!data || data.loading || !data.corpus) {
        return <div />
    }

    const document = data.corpus.document

    return (
        <DocumentReader
            datasetId={datasetId}
            document={document}
        />
    )
}

const GET_DOCUMENT_QUERY = gql`
query get($datasetId: String!, $documentId: String!) {
  corpus(id: $datasetId) {
    document(id: $documentId) {
        id
        length
        title
        content
        info {
            language
            source
            type
            classification
            timestamp
        } 
        metadata {
            key
            value
        }
        mentions {
            id
            entityId
            begin
            end
            type
            value
        }
    }
  }
}
`

export default graphql<Response, OwnProps, Props>(GET_DOCUMENT_QUERY, {
    options: (props: Props) => ({
        variables: {
            datasetId: props.datasetId,
            documentId: props.documentId
        }
    })
})(container)
