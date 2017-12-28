import * as React from 'react'
import { ChildProps } from 'invest-plugin'
import { graphql, QueryProps } from 'react-apollo'
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

interface GqlProps {
    data?: QueryProps & Partial<Response>
}

type OwnProps = {
    datasetId: string
    metadataKey: string
}

type Props = OwnProps & GqlProps & ChildProps

const container = (props: Props) => {
    const { metadataKey, data } = props

    if (!data || data.loading || !data.corpus || !data.corpus.metadata) {
        return <Loader active={true} />
    }

    return (
        <MetadataValues
            metadataKey={metadataKey}
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

export default graphql<Response, OwnProps & ChildProps, Props>(METADATA_VALUE_QUERY)(container)
