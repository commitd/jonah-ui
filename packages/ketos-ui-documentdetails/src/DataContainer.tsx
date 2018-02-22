import gql from 'graphql-tag'
import { createDataContainer } from 'ketos-components'
import {
  BasicDocumentNode, BasicEntityNode,
  Metadata, FullDocumentInfo,
  RelationWithMentionsNode
} from 'ketos-components'
export type Variables = {
  datasetId: string,
  documentId: string
}

export type Response = {
  corpus: {
    id: string
    document: BasicDocumentNode & {
      length: number
      summary: number
      info: FullDocumentInfo
      metadata: Metadata[]
      entities: BasicEntityNode[]
      relations: RelationWithMentionsNode
    }
  }
}

const QUERY = gql`
query get($datasetId: String!, $documentId: String!) {
  corpus(id: $datasetId) {
    id
    document(id: $documentId) {
        id
        length
        summary
        info {
          title
          date
          type
          source
          language
          timestamp
          classification
          caveats
          releasability
          publishedIds
        } 
        metadata {
            key
            value
        }
        entities {
          id
          type
          subType
          value
        }
        relations {
          id 
          type
          subType
          value
          source {
            id
            type
            value
          }
          target {
            id
            type
            value
          }
        }
    }
  }
}
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
