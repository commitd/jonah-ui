import * as React from 'react'
const isEqual = require('lodash.isequal')

import { ChildProps } from 'invest-plugin'

type OwnProps = {}

type Props = OwnProps & ChildProps

class App extends React.Component<Props> {

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      this.onAction(nextProps.action, nextProps.payload)
    }
  }

  render() {
    return (
      <p>Hello world</p>
    )
  }

  private onAction = (action?: string, payload?: {}) => {
    // Implement to deal with new action requests
    // typically this will setState in order and then pass
    // that state as props to a subcomponent (which will
    // then respond with a )
  }
}

/* TODO: Work on the GraphQL so far... 
query Stuff{
  corpus(id: "re3d") {
    # // TODO: type = document / entities. Are we going to aggregate over entities or documents?
    documentTimeline(method:'ENTITIES', filter: 'stuff') {
      bins {
        # // TODO: should be a special aggregation with start/end on, not (just) ts.
        count
        ts
      }
      interval
    }
    # // TODO: get the documents which actual match
    # //TODO: This should be rolled into documents() under the filter, but you don't know the type of time.
    documentByTimeRange(start:ts, end:ts+interval, filter='stuff, as above') {
      ...
    }
  }
}
*/

export default App
