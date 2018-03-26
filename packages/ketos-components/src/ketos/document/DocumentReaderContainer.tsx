import * as React from 'react'
import { graphql, DataProps } from 'react-apollo'
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
type Props = OwnProps & Partial<DataProps<Response>>

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
        content
        info {
            title
            language
            source
            type
            classification
            documentDate: date
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

export default graphql<OwnProps, Response>(GET_DOCUMENT_QUERY, {
    options: (props: Props) => ({
        variables: {
            datasetId: props.datasetId,
            documentId: props.documentId
        }
    })
})(container)
