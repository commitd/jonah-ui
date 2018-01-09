import * as React from 'react'
import { SigmaGraphHelper } from './SigmaGraphExpander'

type SigmaProps = {
    sigma?: SigmaJs.Sigma
}

type SigmaNodeProps = SigmaJs.Node & {

}

type SigmaEdgeProps = SigmaJs.Edge & {

}

export class Node extends React.Component<SigmaNodeProps> {
    static defaultProps = {
        size: 15,
        // Somewhat strange to have a random start pos
        //  but if they all start at the same point the force atlas doesn't seem to work
        x: -1,
        y: -1
    }
}

export class Edge extends React.Component<SigmaEdgeProps> {

}

class Graph extends React.Component<SigmaProps> {

    render() {
        const { sigma } = this.props

        if (sigma == null) {
            return null
        }

        if (this.props.children == null) {
            return null
        }

        const graph = sigma.graph
        const nodes = graph.nodes()
        const edges = graph.nodes()

        const graphHelper = new SigmaGraphHelper(sigma)

        let changed = false

        const array = React.Children.toArray(this.props.children)

        const nodeChildren: React.ReactElement<SigmaNodeProps>[] = array.filter(a => {
            const c = a as React.ReactElement<{}>
            return c.type === Node
        }).map(a => a as React.ReactElement<SigmaNodeProps>)

        const edgeChildren: React.ReactElement<SigmaEdgeProps>[] = array.filter(a => {
            const c = a as React.ReactElement<{}>
            return c.type === Edge
        }).map(a => a as React.ReactElement<SigmaEdgeProps>)

        // Deal with nodes

        const nodesIds: string[] = []

        nodeChildren.forEach(c => {
            // const key = c.key
            const props = c.props as SigmaNodeProps
            const id = c.props.id

            nodesIds.push(id)

            if (!nodes.find(n => n.id === id)) {

                const { children, ...node } = props
                graphHelper.addNode(node)
                changed = true
            }
        })

        // Remove nodes that are no long in our children
        graph.nodes().filter(n => !nodesIds.find(id => id === n.id))
            .forEach(n => graph.dropNode(n.id))

        // Deal with edges

        const edgesIds: string[] = []

        edgeChildren.forEach(c => {
            // const key = c.key
            const props = c.props as SigmaEdgeProps
            const id = c.props.id

            edgesIds.push(id)

            if (!edges.find(e => e.id === id)) {
                const { children, ...edge } = props
                graphHelper.addEdge(edge)
                changed = true
            }

        })

        graph.edges().filter(e => !edgesIds.find(id => id === e.id))
            .forEach(e => graph.dropEdge(e.id))

        // TODO: if node or edge found, then check if the key is the same and not not then replace

        if (changed) {
            graphHelper.refresh()

            graphHelper.layout()
        }

        return null

    }
}

export default Graph