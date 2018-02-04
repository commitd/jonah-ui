import * as React from 'react'

export type OwnProps = {
    content: string
    begin: number,
    end: number,
    before?: number,
    after?: number,
    ellipsis?: string
}

export type DefaultedProps = OwnProps & {
    content: string
    begin: number,
    end: number,
    before: number,
    after: number,
    ellipsis: string
}

export type Props = OwnProps

class DocumentSnippet extends React.Component<Props> {

    static defaultProps = {
        before: 100,
        after: 100,
        ellipsis: '...'
    }

    render() {
        const { content, begin, end, before, after, ellipsis } = this.props as DefaultedProps
        const length = content.length

        const start = Math.max(0, begin - before)
        const b = Math.max(Math.min(begin, length), 0)
        const e = Math.max(Math.min(end, length), 0)
        const stop = Math.min(end + after, length)

        return (
            <span>
                {start !== 0 ? ellipsis : ''}
                {content.substring(start, b)}
                <em><b> {content.substring(b, e)}</b></em>
                {content.substring(e, stop)}
                {stop !== length ? ellipsis : ''}
            </span>)

    }

}

export default DocumentSnippet
