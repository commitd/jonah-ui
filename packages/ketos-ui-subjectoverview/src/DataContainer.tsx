import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { TermBin, TimeBin } from 'invest-types'

type Variables = {
  datasetId: string
  query: string
}

type Location = {
  lat: number
  lon: number
  name: string
  geohash: string
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
    documentLocations: Location[]
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
      field:"value"
      , size: 50) {
        bins {
          term
          count
        }
      }

      documentLocations(query:{
        content:$query 
       }, size: 500) {
        lat
        lon
         name
         geohash(precision:5)
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
