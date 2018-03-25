import * as React from 'react'
import { PluginProps } from 'invest-plugin'

import View from './View'
import DataContainer from './DataContainer'

import { Container } from 'semantic-ui-react'

type OwnProps = {}

type Props = OwnProps & PluginProps

class App extends React.Component<Props> {

  render() {
    return (
      <Container>
        <DataContainer variables={{}} showRefresh={true}>
          <View />
        </DataContainer>

      </Container>
    )
  }
}

export default App
