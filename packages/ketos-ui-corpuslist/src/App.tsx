import * as React from 'react'
import { ChildProps } from 'vessel-plugin'

import View from './ViewContainer'
import { Container } from 'semantic-ui-react'

type OwnProps = {}

type Props = OwnProps & ChildProps

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
