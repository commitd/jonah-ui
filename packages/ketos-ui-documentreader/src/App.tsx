import * as React from 'react'
import { ChildProps } from 'invest-plugin'

import { DocumentReaderContainer } from 'ketos-components'
import { Container, Message } from 'semantic-ui-react'
const isEqual = require('lodash.isequal')

type OwnProps = {}

interface ViewPayload {
  documentId: string,
  datasetId: string
}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string,
  documentId?: string,
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: 're3d',
    documentId: '3933f6e22da917896bb07ebe081f760e13783378a6c866461dc45808a918b491'
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as ViewPayload
      this.setState({
        datasetId: payload ? payload.datasetId : undefined,
        documentId: payload ? payload.documentId : undefined,
      })
    }
  }

  render() {
    const { datasetId, documentId } = this.state
    const hasDocument = datasetId != null && documentId != null

    return (
      <Container fluid={false} >
        {!hasDocument &&
          <Message>
            <Message.Header>
              No document selected
          </Message.Header>
            <p>
              This plugin requires a document to be provided in order to function.
            </p>
          </Message>
        }
        {hasDocument && <DocumentReaderContainer
          datasetId={datasetId || ''}
          documentId={documentId || ''}
        />}
      </Container>
    )
  }
}

export default App
