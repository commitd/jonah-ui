import * as React from 'react'
import { ChildProps } from 'invest-plugin'
import { graphql, gql, QueryProps, compose, MutationFunc } from 'react-apollo'

import View from './View'
import { Loader } from 'semantic-ui-react'

interface Response {
    feedback: {
        id: string
        user: string
        pluginName?: string
        type: string
        subject: string
        comment: string
    }[]
}

interface MutationResult {

}

interface MutationVariables {
    feedbackId: string
}

interface GqlProps {
    data?: QueryProps & Partial<Response>
    mutate: MutationFunc<MutationResult, MutationVariables>
}

type OwnProps = {
    offset: number
    size: number
}

type Props = OwnProps & GqlProps & ChildProps

class Container extends React.Component<Props>  {

    handleDelete = (feedbackId: string) => {
        this.props.mutate({
            variables: {
                feedbackId: feedbackId
            }
        }).then(() => {
            // If we've deletd something then refresh the data
            this.handleRefresh()
        })
    }

    handleRefresh = () => {
        if (this.props.data) {
            this.props.data.refetch()
        }
    }

    render() {
        const { data } = this.props

        if (!data || data.loading || !data.feedback) {
            return <Loader active={true} />
        }

        return (
            <View feedback={data.feedback} onDelete={this.handleDelete} onRefresh={this.handleRefresh} />
        )
    }
}

const DELETE_FEEDBACK_MUTATION = gql`
mutation DeleteFeedback($feedbackId: String!) {
  deleteFeedback(id: $feedbackId)
}
`

const GET_FEEDBACK_QUERY = gql`
query GetFeedback($offset: Int!, $size: Int!) {
  feedback(offset: $offset, size: $size) {
    id
    user
    pluginName
    type
    subject
    comment
  }
}
`

export default
    compose(
        graphql<Response, OwnProps & ChildProps, Props>(DELETE_FEEDBACK_MUTATION),
        graphql<Response, OwnProps & ChildProps, Props>(GET_FEEDBACK_QUERY)
    )(Container)
