import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import { graphql, QueryProps } from 'react-apollo'
import gql from 'graphql-tag'

import View from './View'
import { Loader } from 'semantic-ui-react'

interface Response {
    corpus: {
        metadata: {
            keys: {
                bins: {
                    key: string
                    count: number
                }[]

            }
        }
    }
}

interface GqlProps {
    data?: QueryProps & Partial<Response>
}

type OwnProps = {
    datasetId: string
}

type Props = OwnProps & GqlProps & PluginProps

const container = (props: Props) => {
    const { data, datasetId } = props

    if (!data || data.loading || !data.corpus || !data.corpus.metadata) {
        return <Loader active={true} />
    }

    return (
        <View datasetId={datasetId} metadataCounts={data.corpus.metadata.keys.bins} />
    )
}

const METADATA_QUERY = gql`
query getMetadataKeys($datasetId: String!) {
    corpus(id: $datasetId) {
      metadata {
        keys(size: 50) {
         bins {
            key: term
            count
          }
        }
      }
    }
  }
`

export default graphql<Response, OwnProps & PluginProps, Props>(METADATA_QUERY)(container)
