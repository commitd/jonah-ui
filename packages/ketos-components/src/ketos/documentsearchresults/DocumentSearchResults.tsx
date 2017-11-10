import * as React from 'react'
import DocumentSearchResult, { DocumentResult } from './DocumentSearchResult'

export type Props = {
    results: DocumentResult[]
}

class DocumentSearchResults extends React.Component<Props> {
    render() {
        const { results } = this.props
        return (
            <div>
                {results.map(r => <DocumentSearchResult key={r.id} document={r} />)}
            </div>
        )
    }
}

export default DocumentSearchResults