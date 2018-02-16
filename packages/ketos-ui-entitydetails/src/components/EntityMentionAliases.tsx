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

        const unique = new Set(mentions.map(m => `${m.value} [${m.type}]`))
        const entries = Array.from(unique)
        return (
            entries.map((s, i) => {
                return <span key={s}>{i > 0 ? <span>; &nbsp;</span> : ''} {s}</span>
            })
        )
    }
}

export default EntityMentionAliases