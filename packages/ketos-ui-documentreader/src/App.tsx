import * as React from 'react'
import { PluginProps } from 'invest-plugin'
import { PrerequisiteContainer } from 'invest-components'
import { DocumentReaderContainer, DocumentViewPayload, DOCUMENT_SEARCH } from 'ketos-components'
const isEqual = require('lodash.isequal')

type OwnProps = {}

type Props = OwnProps & PluginProps

type State = {
  datasetId?: string,
  documentId?: string,
}

class App extends React.Component<Props, State> {

  state: State = {
    datasetId: undefined,
    documentId: undefined
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.action !== nextProps.action || !isEqual(this.props.payload, nextProps.payload)) {
      const payload = nextProps.payload as DocumentViewPayload
      this.setState({
        datasetId: payload ? payload.datasetId : undefined,
        documentId: payload ? payload.documentId : undefined,
      })
    }
  }

  render() {
    const { datasetId, documentId } = this.state

    return (
      <PrerequisiteContainer
        missingTitle="Document required"
        missingDescription="This view needs to be provided with a document, you can use another plugin to provide that."
        fulfillingAction={DOCUMENT_SEARCH}
        check={() => datasetId != null && documentId != null}
      >
        <DocumentReaderContainer
          datasetId={datasetId || ''}
          documentId={documentId || ''}
        />
      </PrerequisiteContainer >
    )
  }
}

export default App
