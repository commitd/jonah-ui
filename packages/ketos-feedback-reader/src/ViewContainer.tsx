import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import { graphql, compose, DataProps, MutateProps } from 'react-apollo'
import gql from 'graphql-tag'
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

type QueryVariables = {
    offset: number
    size: number
}

type Props = PluginProps
    & Partial<DataProps<Response, QueryVariables>>
    & MutateProps<MutationResult, MutationVariables>

class Container extends React.Component<Props> {

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
        graphql<PluginProps, MutationResult, MutationVariables>(DELETE_FEEDBACK_MUTATION),
        graphql<PluginProps, Response, QueryVariables>(GET_FEEDBACK_QUERY)
    )(Container)
