import gql from 'graphql-tag'
import { MentionFilter } from 'ketos-components'

import { createDataContainer } from 'invest-components'

type Variables = {
    datasetId: string
    mentionFilter: MentionFilter
    offset?: number,
    size?: number
}

export type Response = {
    corpus: {
        id: string,
        mentions: {
            id: string
            type: string
            subType?: string
            value: string
            entityId: string
            begin: number
            end: number
            document: {
                id: string
                content: string
                info: {
                    title: string
                }
            }
        }[]
    }
}

const QUERY = gql`
query GetMention($datasetId: String!, $mentionFilter:MentionFilterInput!, $offset: Int, $size: Int) {
    corpus(id: $datasetId) {
      id,
      mentions: searchMentions(query:$mentionFilter, offset: $offset, limit: $size) {
        id
        type 
        subType
        value
        entityId
        begin
        end
        document {
            id
            content
            info {
                title
            }
        }
      }
    }
}
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
