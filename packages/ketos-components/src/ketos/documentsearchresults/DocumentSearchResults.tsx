import * as React from 'react'
import DocumentSearchResult, { DocumentResult } from './DocumentSearchResult'
import { Pagination } from 'invest-components'
import { Item } from 'semantic-ui-react'

export type Props = {
    datasetId: string,
    total?: number
    offset: number
    size: number
    results: DocumentResult[]
    onOffsetChange(offset: number): void,
}

class DocumentSearchResults extends React.Component<Props> {
    render() {
        const { datasetId, offset, size, total, onOffsetChange, results } = this.props

        // If we don't know the total then let assume it's bigger that what we have
        const totalResults = total != null ? total : offset + size + 1

        return (
            <div>
                <Item.Group>
                    {results.map(r =>
                        <DocumentSearchResult datasetId={datasetId} key={r.id} document={r} />)}
                </Item.Group>
                <Pagination size={size} offset={offset} total={totalResults} onOffsetChange={onOffsetChange} />
            </div>
        )
    }
}

export default DocumentSearchResults