import * as React from 'react'
import { ChildProps } from 'vessel-plugin'

import { DocumentReaderContainer } from 'ketos-components'
import { Container, Message } from 'semantic-ui-react'

type OwnProps = {}

type Props = OwnProps & ChildProps

type State = {
  datasetId?: string,
  documentId?: string,
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: 're3d',
    documentId: 'ca553bc24390e15d279ebbf32903e69c1d85a11505c84a07e3863731b775b58a'
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
        {hasDocument && <DocumentReaderContainer datasetId={datasetId || ''} documentId={documentId || ''} />}
      </Container>
    )
  }
}

export default App
