import * as React from 'react'
import { Segment, Item } from 'semantic-ui-react'
import { Response } from './DataContainer'
import { Pagination } from 'invest-components'
import { MentionView } from 'ketos-components'

type Props = {
    data?: Response,
    offset: number,
    size: number,
    onOffsetChange(offset: number): void
}

class Results extends React.Component<Props> {
    render() {

        const { data, offset, size } = this.props

        if (!data || !data.corpus || !data.corpus.mentions || data.corpus.mentions.length === 0) {
            return <p>No results found</p>
        }

        const mentions = data.corpus.mentions

        return (
            <Segment basic={true}>
                <Item.Group>

                    {
                        mentions.map(e => {
                            return <MentionView
                                key={e.id}
                                datasetId={data.corpus.id}
                                mention={e}
                            />
                        })
                    }
                </Item.Group>
                <Pagination
                    offset={offset}
                    size={size}
                    resultsOnPage={data.corpus.mentions.length}
                    onOffsetChange={this.props.onOffsetChange}
                />
            </Segment>

        )

    }
}

export default Results