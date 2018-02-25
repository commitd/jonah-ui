import gql from 'graphql-tag'
import { createDataContainer } from 'invest-components'
import { TermBin, TimeBin } from 'invest-types'
import { DocumentFilter } from 'ketos-components'

type Variables = {
  datasetId: string
  documentFilter: DocumentFilter
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
query Do($documentFilter:DocumentFilterInput!, $datasetId: String!) {
    corpus(id:$datasetId) {
      documentTimeline(query:$documentFilter) {
        bins {
          ts
          count
        }
        interval
      }
      
      entityTimeline: timelineByTypeField(query:$documentFilter, type:ENTITY) {
        bins {
          ts
          count
        }
      }
      
      entityTypes: countByTypesField(query:$documentFilter, type:ENTITY, field:"type") {
        bins {
          term
          count
        }
      }
      
      entityValues: countByTypesField(query:$documentFilter, type:ENTITY, field:"value", size: 26) {
        bins {
          term
          count
        }
      }

      documentLocations(query:$documentFilter, size: 500) {
        lat
        lon
         name
         geohash(precision:5)
       }
      
      relationTypes: countByTypesField(query:$documentFilter, type:RELATION, field:"type") {
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
