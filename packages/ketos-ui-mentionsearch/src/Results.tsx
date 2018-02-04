import * as React from 'react'
import { Card, Segment } from 'semantic-ui-react'
import { Response } from './DataContainer'

type Props = {
    data?: Response
}

class Results extends React.Component<Props> {
    render() {

        const { data } = this.props

        if (!data || !data.corpus || !data.corpus.mentions || data.corpus.mentions.length === 0) {
            return <p>No results found</p>
        }

        const mentions = data.corpus.mentions

        return (
            <Segment>
                {
                    mentions.map(e => {
                        return <Card
                            key={e.id}
                            fluid={true}
                            header={e.value}
                            meta={e.type}
                            extra={e.document && <span>{e.document.title}: {e.document.summary}</span>}
                        />
                    })
                }
            </Segment>
        )

    }
}

export default Results