import * as React from 'react'
import { ChildProps } from 'invest-plugin'
import { graphql, gql, MutationFunc, compose, QueryProps } from 'react-apollo'
import { Loader } from 'semantic-ui-react'
import View from './View'

interface MutationResponse {
    id: string
}

interface MutationVariables {
    subject: string
    comment: string
    type: string
    pluginId?: string
}

interface QueryResponse {
    investServer: {
        uiPlugins: {
            id: string
            name: string
        }[]
    }
}

interface GqlProps {
    data?: QueryProps & Partial<QueryResponse>,
    mutate: MutationFunc<MutationResponse, MutationVariables>
}

type OwnProps = {}

type Props = OwnProps & GqlProps & ChildProps

type State = {
    type: string,
    subject: string,
    comment: string,
    pluginId?: string
}

class Container extends React.Component<Props, State> {

    state: State = {
        type: '',
        subject: '',
        comment: '',
        pluginId: undefined
    }

    handleSubmit = () => {
        const { type, subject, comment, pluginId } = this.state
        this.props.mutate({
            variables: {
                subject,
                comment,
                type,
                pluginId: pluginId === '' ? undefined : pluginId
            }
        }).then(() => {
            this.setState({
                type: '',
                subject: '',
                comment: '',
                pluginId: undefined
            })
        })
    }

    handleChange = (name: string, value: string) => {
        // Force the typing to work... by casting
        this.setState({ [name]: value } as Pick<State, 'type' | 'subject' | 'comment' | 'pluginId'>)
    }

    render() {
        const { data } = this.props

        if (!data || data.loading || !data.investServer) {
            return <Loader active={true} />
        }

        return (
            <View
                data={this.state}
                plugins={data.investServer.uiPlugins}
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
            />
        )
    }
}

const ADD_FEEDBACK_MUTATION = gql`
mutation AddFeedback($subject: String!, $comment: String!, $type:String!, $pluginId:String) {
    addFeedback(subject:$subject, comment:$comment, type:$type, pluginId:$pluginId) {
        id
    }
}
`

// Note that here we go back to the server to get all the plugins. Rather than using the investUi to get the info.
// This is something of a stylistic choice, but it allows us to expand to say non-ui plugins at a later point.
const GET_PLUGINS_QUERY = gql`
query GetPlugins {
    investServer {
      uiPlugins {
        id
        name
      }
    }
  }
`

export default compose(
    graphql<Response, OwnProps & ChildProps, Props>(ADD_FEEDBACK_MUTATION),
    graphql<Response, OwnProps & ChildProps, Props>(GET_PLUGINS_QUERY)
)(Container)
