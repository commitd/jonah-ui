import * as React from 'react'
import { Card, Segment } from 'semantic-ui-react'
import { Response } from './DataContainer'

type Props = {
    data?: Response
}

class Results extends React.Component<Props> {
    render() {

        const { data } = this.props

        if (!data || !data.corpus.entities || data.corpus.entities.length === 0) {
            return <p>No results found</p>
        }

        const entities = data.corpus.entities

        return (
            <Segment>
                {
                    entities.map(e => {
                        return <Card
                            key={e.id}
                            fluid={true}
                            header={e.longestValue}
                            meta={e.type}
                            description={e.values.join('; ')}
                            extra={<span>{e.document.title}: {e.document.summary}</span>}
                        />
                    })
                }
            </Segment>
        )

    }
}

export default Results