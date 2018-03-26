import * as React from 'react'
import { Treemap, ResponsiveContainer } from 'recharts'
import { Segment } from 'semantic-ui-react'
import { DocumentResult } from './types'

type Props = {
    count: number,
    topics: Array<{
        documents: Array<{
            id: string
            length: number
            summary: string
            info: {
                title: string
                language: string
                source: string
                type: string
                classification: string
                timestamp: string
            }
        }>
        count: number
        label: string
        keywords: Array<string>
    }>
    onResultsSelect: (documents: DocumentResult[]) => void
}

type ContentProps = {
    root: JSX.Element, 
    depth: number,
    x: number,
    y: number,
    width: number, 
    height: number, 
    index: number,
    selected: number, 
    name: string,
    size: number,
    onclick: (index: number) => void
}

type State = {
    selectedIndex?: number
}

const customisedContent = (props: ContentProps) => {
    const { depth, x, y, width, height, name, size, onclick, index, selected } = props

    const shortenLabel = (label: string, lineLength: number): Array<string> => {
        var split = label.split(' ')
        var result = new Array<string>()
        var currentLine = ''
        for (var i = 0; i < split.length; i++) {
            var word = split[i]
            if (currentLine.length + word.length > lineLength) {
                result.push(currentLine)
                currentLine = ''
            }

            if (currentLine.length === 0) {
                currentLine += word
            } else {
                currentLine += ' ' + word
            }

            if (i === (split.length - 1)) {
                result.push(currentLine)
            }
        }
        return result
    }

    return (
        <g>
            <rect
                onClick={() => {
                    onclick(index)
                }}
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: index === selected ? '#8DC77B' : '#8884d8',
                    stroke: '#fff',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                }}
            />
            {
                depth === 1 && width > 100 && height > 60 ?
                <text
                    x={x + width / 2}
                    y={y + height / 2 - (shortenLabel(name, 15).length * 7)}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={14}
                >
                    {shortenLabel(name, 15).map((s) => {
                        return <tspan x={x + width / 2} dy="1.2em" key={s}>{s}</tspan>
                    })}
                </text>
                :
                <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="end"><title>{name}</title>...</text>
            }
            {
                depth === 1 ?
                <text
                    x={x + 4}
                    y={y + 18}
                    fill="#fff"
                    fontSize={16}
                    fillOpacity={0.9}
                >
                    {size}
                </text>
                : null
            }
        </g>
    )
}

class ClusterSearchResultsView extends React.Component<Props, State> {

    state: State = {}

    render() {
        const data = this.props.topics.map((topic) => {
            return {
                name: topic.label, 
                size: topic.count,
                selected: this.state.selectedIndex, 
                onclick: (index: number) => {
                    this.setState({selectedIndex: index})
                    this.props.onResultsSelect(topic.documents)
                }
            }
        })
        return (
            <Segment>
                <ResponsiveContainer
                    minWidth={1000}
                    minHeight={600}
                >
                    <Treemap
                        dataKey="size"
                        data={data}
                        aspectRatio={4 / 3}
                        stroke="#fff"
                        fill="#8884d8"
                        content={customisedContent}
                        isAnimationActive={false}
                    />
                </ResponsiveContainer>
            </Segment>
        )
    }

}

export default ClusterSearchResultsView