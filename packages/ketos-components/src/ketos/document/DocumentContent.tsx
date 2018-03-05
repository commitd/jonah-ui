import * as React from 'react'
import { Segment } from 'semantic-ui-react'
import { MentionSpan } from '../../types'

export interface OwnProps {
    title: string
    content: string
    mentions?: MentionSpan[]
    selectedMentions?: string[]
    onMentionSelect?(mentions: string[]): void
}

export type Props = OwnProps

type Offset = {
    begin: number
    end: number
    mentions: string[]
}

class PlainText extends React.Component<{
    content: string
    begin: number
    end: number
}> {
    render() {
        const { begin, end, content } = this.props
        const lines = content.substring(begin, end).split('\n')

        const elements: React.ReactElement<{}>[] = []

        for (let i = 0; i < lines.length - 1; i++) {
            elements.push(<span key={i}>{lines[i]}</span>)
            elements.push(<br key={i + 'br'} />)
        }
        elements.push(<span key="last">{lines[lines.length - 1]}</span>)

        return <span>{elements}</span>
    }
}

class MentionText extends React.Component<{
    content: string
    begin: number
    end: number
    mentions: string[]
    selectedMentions?: string[]
    onClick(mentions: string[]): void
}> {

    render() {
        const { begin, end, content, onClick, mentions } = this.props

        const selected = this.isSelected()

        const fontStyle = selected ? 'italic' : undefined
        return (
            <span
                onClick={() => onClick(mentions)}
                style={{ textDecoration: 'underline', fontStyle: fontStyle }}
            >
                <PlainText content={content} begin={begin} end={end} />

            </span >
        )
    }

    private isSelected = () => {
        const selected = this.props.selectedMentions
        const mentions = this.props.mentions

        if (selected == null || mentions == null || mentions.length === 0 || selected.length === 0) {
            return false
        }

        const found = selected.find(s => mentions.includes(s))
        return found !== undefined
    }

}

class DocumentReader extends React.Component<Props> {

    re = new RegExp('\n', 'g')

    handleSelectMentions = (mentions: string[]) => {
        if (this.props.onMentionSelect) {
            this.props.onMentionSelect(mentions)
        }
    }

    render() {
        const { title, content, mentions } = this.props

        if (mentions == null || mentions.length === 0) {
            return this.renderMentionless(title, content)
        } else {
            return this.renderMentions(title, content, mentions)
        }

    }

    private renderMentionless(title: String, content: string) {
        const lines = content.split('\n')

        return (
            <div>
                <h1>{title}</h1>
                <Segment>
                    {lines.map((l, i) => <p key={i + '_' + l}>{l}</p>)}
                </Segment>
            </div>
        )
    }

    private renderMentions(title: String, content: string, mentions: MentionSpan[]) {

        const sorted = [...mentions].sort((a, b) => {
            const begin = a.begin - b.begin
            if (begin !== 0) {
                return begin
            } else {
                return a.end - b.end
            }
        })

        const offsets: Offset[] = []
        let offset: Offset | undefined = undefined
        sorted.forEach(m => {

            // Are we in an mention offset? 
            if (offset) {
                // If we overlap then extend the offset to cover our mention
                if (!(offset.end < m.begin || offset.begin > m.end)) {
                    // Because we are sorted the begin if already ok
                    offset.end = Math.max(m.end, offset.end)
                    offset.mentions.push(m.id)
                } else {
                    // The old one doesn't over overlap us, close it
                    offset = undefined
                }
            }

            // If we aren't in an offset create one...
            if (offset == null) {
                offset = {
                    begin: m.begin,
                    end: m.end,
                    mentions: [m.id]
                }
                offsets.push(offset)
            }
        })

        const lines: React.ReactElement<{}>[] = []

        let position = 0
        offsets.forEach(o => {
            if (position < o.begin) {
                lines.push(
                    <PlainText
                        key={`${position}-${o.begin}`}
                        content={content}
                        begin={position}
                        end={o.begin}
                    />)
            }

            if (o.begin !== o.end) {
                lines.push(
                    <MentionText
                        key={`${o.begin}-${o.end}`}
                        content={content}
                        begin={o.begin}
                        end={o.end}
                        mentions={o.mentions}
                        onClick={this.handleSelectMentions}
                        selectedMentions={this.props.selectedMentions}
                    />)
            }

            position = o.end
        })
        lines.push(<PlainText key="last" content={content} begin={position} end={content.length} />)

        return (
            <div>
                <h1>{title}</h1>
                <Segment>
                    {lines}
                </Segment>
            </div>
        )
    }
}

export default DocumentReader