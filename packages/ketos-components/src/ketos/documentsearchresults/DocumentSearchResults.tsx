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

        let pageInfo: React.ReactElement<{}>

        let totalResults: number
        if (total != null) {
            totalResults = total
            pageInfo = <p>Showing results {offset} to {results.length + offset}, of a total of {total} matches.</p>
        } else {
            // If we don't know the total then we need to guess what to do
            // in reality this is only used to display Next or not in pagination so it can be course

            if (results.length < size) {
                // if we have less than we asked for, we must be done
                totalResults = results.length + offset
            } else {
                // otherwise there might be another page
                totalResults = offset + size + size
            }

            if (totalResults === 0) {
                pageInfo = <p>No results found.</p>
            } else {
                pageInfo = <p>Showing results {offset} to {results.length + offset}.</p>
            }
        }

        return (
            <div>
                {pageInfo}
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