import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import { graphql, QueryProps } from 'react-apollo'
import gql from 'graphql-tag'

import View from './View'
import { Loader } from 'semantic-ui-react'

interface Response {
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

interface GqlProps {
    data?: QueryProps & Partial<Response>
}

type OwnProps = {}

type Props = OwnProps & GqlProps & PluginProps

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

export default graphql<Response, OwnProps & PluginProps, Props>(CORPORA_QUERY)(container)
