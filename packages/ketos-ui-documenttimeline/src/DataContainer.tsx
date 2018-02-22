import gql from 'graphql-tag'
import { createDataContainer } from 'ketos-components'
import { TermBin, TimeBin } from 'ketos-components'

type Variables = {
    datasetId: string
    query: string
}

export type Response = {
    corpus: {
        documentTimeline: {
            bins: TimeBin[]
        }

        entityTimeline: {
            bins: TimeBin[]
        }

        entityTypes: {
            bins: TermBin[]
        }

        entityValues: {
            bins: TermBin[]
        }

        relationTypes: {
            bins: TermBin[]
        }
    }
}

const QUERY = gql`
query Do($query:String!, $datasetId: String!) {
    corpus(id:$datasetId) {
      documentTimeline(query:{
       content:$query 
      }) {
        bins {
          ts
          count
        }
        interval
      }
      
      entityTimeline: timelineByTypeField(query:{
       content:$query 
      },
        type:ENTITY) {
        bins {
          ts
          count
        }
      }
      
      entityTypes: countByTypesField(query:{
       content:$query 
      },
        type:ENTITY,
      field:"type") {
        bins {
          term
          count
        }
      }
      
      entityValues: countByTypesField(query:{
       content:$query 
      },
        type:ENTITY,
      field:"value") {
        bins {
          term
          count
        }
      }
      
      relationTypes: countByTypesField(query:{
       content:$query 
      },
        type:RELATION,
      field:"type") {
        bins {
          term
          count
        }
      }
    }
  }
`

const dataContainer = createDataContainer<Variables, Response>(QUERY)
export default dataContainer
