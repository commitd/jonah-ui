import * as React from 'react'
import { PluginProps } from 'invest-plugin'

import View from './ViewContainer'
import { Container } from 'semantic-ui-react'

type OwnProps = {}

type Props = OwnProps & PluginProps

class App extends React.Component<Props> {

  render() {
    return (
      <Container>
        <View />
      </Container>
    )
  }
}

export default App
