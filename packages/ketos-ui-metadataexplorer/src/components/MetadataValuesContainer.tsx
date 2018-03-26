import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import { graphql, DataProps } from 'react-apollo'
import gql from 'graphql-tag'
import MetadataValues from './MetadataValues'
import { Loader } from 'semantic-ui-react'

// Display the top 50 ...
const maxValues = 51

interface Response {
    corpus: {
        metadata: {
            values: {
                bins: {
                    value: string
                    count: number
                }[]
            }
        }
    }

}

type Variables = {
    datasetId: string
    metadataKey: string
}

type Props = & PluginProps & Partial<DataProps<Response, Variables>>

const container = (props: Props) => {
    const { data } = props

    if (!data || data.loading || !data.corpus || !data.corpus.metadata) {
        return <Loader active={true} />
    }

    return (
        <MetadataValues
            metadataKey={data.variables.metadataKey}
            metadataValues={data.corpus.metadata.values.bins}
            maxValues={maxValues}
        />
    )
}

const METADATA_VALUE_QUERY = gql`
query getMetadataValues($datasetId: String!, $metadataKey: String!) {
    corpus(id: $datasetId) {
      metadata(key: $metadataKey) {
        values(size: ${maxValues}) {
            bins {
                value: term
                count
            }
        }
      }
    }
  }
`

export default graphql<PluginProps & Variables, Response, Variables>(METADATA_VALUE_QUERY)(container)
