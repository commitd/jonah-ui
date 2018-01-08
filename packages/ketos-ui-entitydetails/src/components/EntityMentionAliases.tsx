import * as React from 'react'

type OwnProps = {
    mentions: {
        value: string
        type: string
    }[]
}

type Props = OwnProps

class EntityMentionAliases extends React.Component<Props> {

    render() {
        const { mentions } = this.props

        if (mentions.length === 0) {
            return <span>No aliases</span>
        }

        return (
            mentions.map((m, i) => {
                return <span key={m.type + '-' + m.value}>{i > 0 ? ', &nbsp;' : ''} {m.value} [{m.type}]</span>
            })
        )
    }
}

export default EntityMentionAliases