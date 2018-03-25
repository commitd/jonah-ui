import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'

type Variables = {}

export interface Response {
    corpora: {
        id: string
        name: string
        description: string
        entities?: number
        documents?: number
        relations?: number
        mentions?: number
    }[]
}

const QUERY = gql`
query Corpora {
  corpora(provider:"DocumentProvider") {
    id
    name
    description
    entities: countEntities
    documents: countDocuments
    relations: countRelations
    mentions: countMentions
  }
}
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
