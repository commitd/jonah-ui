import * as React from 'react'
import { Segment, Item } from 'semantic-ui-react'
import { Response } from './DataContainer'
import { Pagination } from 'invest-components'
import { EntityView } from 'ketos-components'

type Props = {
    data?: Response,
    offset: number,
    size: number,
    onOffsetChange(offset: number): void
}

class Results extends React.Component<Props> {
    render() {

        const { data, offset, size } = this.props

        if (!data || !data.corpus || !data.corpus.searchEntities
            || !data.corpus.searchEntities.hits
            || !data.corpus.searchEntities.hits.results
            || data.corpus.searchEntities.hits.results.length === 0) {
            return <p>No results found</p>
        }

        const mentions = data.corpus.searchEntities.hits.results
        const count = data.corpus.searchEntities.hits.results.length

        return (
            <Segment basic={true}>
                <Item.Group>

                    {
                        mentions.map(e => {
                            return <EntityView
                                key={e.id}
                                datasetId={data.corpus.id}
                                entity={e}
                            />
                        })
                    }
                </Item.Group>
                <Pagination
                    offset={offset}
                    size={size}
                    resultsOnPage={count}
                    onOffsetChange={this.props.onOffsetChange}
                />
            </Segment>

        )

    }
}

export default Results