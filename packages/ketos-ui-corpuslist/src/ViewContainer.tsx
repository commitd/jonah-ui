import * as React from 'react'
import { ChildProps } from 'invest-plugin'
import { graphql, gql, QueryProps } from 'react-apollo'

import View from './View'
import { Loader } from 'semantic-ui-react'

interface Response {
    corpora: {
        id: string
        name: string
        description: string
        entityCount: number
        documentCount: number
        relationCount: number
    }[]
}

interface GqlProps {
    data?: QueryProps & Partial<Response>
}

type OwnProps = {}

type Props = OwnProps & GqlProps & ChildProps

const container = (props: Props) => {
    const { data } = props

    if (!data || data.loading || !data.corpora) {
        return <Loader active={true} />
    }

    return (
        <View datasets={data.corpora} />
    )
}

const CORPORA_QUERY = gql`
query Corpora {
  corpora {
    id
    name
    description
    entityCount
    documentCount
    relationCount
  }
}
`

export default graphql<Response, OwnProps & ChildProps, Props>(CORPORA_QUERY)(container)
