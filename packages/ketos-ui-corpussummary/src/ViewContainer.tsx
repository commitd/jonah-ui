import * as React from 'react'
import { graphql, QueryProps } from 'react-apollo'
import gql from 'graphql-tag'

import View from './View'
import { Loader } from 'semantic-ui-react'

interface OwnProps {
    dataset: string
}

interface Response {
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

interface GqlProps {
    data?: QueryProps & Partial<Response>
}

type Props = OwnProps & GqlProps

const container = (props: Props) => {
    const { data } = props

    if (!data || data.loading || !data.corpus) {
        return <Loader active={true} />
    }

    return (
        <View
            numDocuments={data.corpus.countDocuments}
            numMentions={data.corpus.countMentions}
            numEntities={data.corpus.countEntities}
            numRelations={data.corpus.countRelations}
            documentTypes={data.corpus.documentTypes.bins}
            documentLanguages={data.corpus.documentLanguages.bins}
            documentClassifications={data.corpus.documentClassifications.bins}
            mentionTypes={data.corpus.mentionTypes.bins}
            documentTimeline={data.corpus.documentTimeline.bins.map(b => ({ ts: Date.parse(b.ts), count: b.count }))}
        />
    )
}

const CORPUS_INFO_QUERY = gql`
query CorpusInfo($datasetId: String!)  {
  corpus(id:$datasetId) {
    id
    name
    countDocuments
    countEntities
    countRelations
    documentTypes: countByDocumentField(field:"info.type") {
        bins {
            count
            term
        }
    }
    documentLanguages: countByDocumentField(field:"info.language") {
        bins {
            count
            term
        }
    }
    documentClassifications: countByDocumentField(field:"info.classification")  {
        bins {
            count
            term
        }
    }
    mentionTypes: countByMentionField(field:"type")  {
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

export default graphql<Response, OwnProps, Props>(CORPUS_INFO_QUERY, {
    options: ({ dataset }: OwnProps) => ({ variables: { datasetId: dataset } }),
})(container)
