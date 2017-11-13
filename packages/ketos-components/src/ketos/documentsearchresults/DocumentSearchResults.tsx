import * as React from 'react'
import DocumentSearchResult, { DocumentResult } from './DocumentSearchResult'
import Pagination from '../../general/ui/Pagination'

export type Props = {
    totalResults: number
    offset: number
    size: number
    results: DocumentResult[]
    onOffsetChange(offset: number): void
}

class DocumentSearchResults extends React.Component<Props> {
    render() {
        const { offset, size, totalResults, onOffsetChange, results } = this.props
        return (
            <div>
                {results.map(r => <DocumentSearchResult key={r.id} document={r} />)}
                <Pagination size={size} offset={offset} total={totalResults} onOffsetChange={onOffsetChange} />
            </div>
        )
    }
}

export default DocumentSearchResults