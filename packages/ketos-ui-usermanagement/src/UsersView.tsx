import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import { PluginContext } from 'invest-plugin'
import { Response } from './UserDataContainer'
import UsersTable from './UsersTable'

type Props = {
    data?: Response
}

type State = {
    graph: SigmaJs.GraphData
}

type Context = PluginContext

class UsersView extends React.Component<Props, State> {
    static contextTypes = {
        pluginApi: PropTypes.object
    }

    context: Context

    render() {
        const { data } = this.props

        if (!data || !data.users) {
            return <p>Nothing here</p>
        }

        const { users } = data

        return (
            <Container>
                <UsersTable users={users} />
            </Container>
        )
    }
}

export default UsersView
