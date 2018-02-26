import * as React from 'react'
import { Response } from './DataContainer'
import { Pagination } from 'invest-components'
import { RelationTable } from 'ketos-components'

type Props = {
    data?: Response
    offset: number,
    size: number,
    onOffsetChange(offset: number): void
}

class Results extends React.Component<Props> {
    render() {

        const { data, offset, size } = this.props

        if (!data || !data.corpus || !data.corpus.searchRelations
            || !data.corpus.searchRelations.hits
            || !data.corpus.searchRelations.hits.results
            || data.corpus.searchRelations.hits.results.length === 0) {
            return <p>No results found</p>
        }

        const relations = data.corpus.searchRelations.hits.results
        const count = data.corpus.searchRelations.hits.results.length

        // TODO: This can be replaced with ketos-components RelationTable
        return (
            <div>
                <RelationTable datasetId={data.corpus.id} relations={relations} />
                <Pagination
                    offset={offset}
                    size={size}
                    resultsOnPage={count}
                    onOffsetChange={this.props.onOffsetChange}
                />
            </div>
        )
    }

}

export default Results