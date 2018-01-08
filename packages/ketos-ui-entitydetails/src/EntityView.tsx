import * as React from 'react'
import { Header } from 'semantic-ui-react'

type OwnProps = {
    data?: {
        corpus: {
            entity: {
                id: string,
                type: string,
                longestValue: string,
                mentions: {
                    begin: number,
                    end: number,
                    type: string,
                    value: string
                }[]
                document: {
                    id: string,
                    content: string
                }
            }
        }
    }
}

type Props = OwnProps

class EntityView extends React.Component<Props> {

    render() {
        const { data } = this.props
        if (data == null) {
            return <div />
        }

        const entity = data.corpus.entity

        return (
            <div>
                <Header>{entity.type} Entity: {entity.longestValue}</Header>
                <Header sub={true}>
                    Mentioned as:&nnbsp;
                    {
                        entity.mentions.map(m => {
                            return <span key={m.type + '-' + m.value}>{m.value} [{m.type}], &nbsp;</span>
                        })
                    }
                </Header>

            </div>
        )
    }

}

export default EntityView
