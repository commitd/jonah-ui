import * as React from 'react'
const isEqual = require('lodash.isequal')

import { PluginProps } from 'invest-plugin'
import UserDataContainer from './UserDataContainer'
import UsersView from './UsersView'

type OwnProps = {}

type Props = OwnProps & PluginProps

class App extends React.Component<Props> {

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    return (
      <UserDataContainer variables={{}}><UsersView /></UserDataContainer>
    )
  }

  private onAction = (action?: string, payload?: {}) => {
    // Implement to deal with new action requests
    // typically this will setState in order and then pass
    // that state as props to a subcomponent (which will
    // then respond with a )
  }
}

export default App
