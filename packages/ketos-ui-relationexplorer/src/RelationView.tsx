import * as React from 'react'
import SigmaGraph from './components/SigmaGraph'
import { GraphHelper } from './components/SigmaGraphExpander'
import { Graph } from 'react-sigma'

import { Response } from './DataContainer'

type Props = {
    data?: Response
}

type State = {
    graph: Graph
}

// graph: {
//     nodes: [{ id: 'n1', label: 'Alice' }, { id: 'n2', label: 'Rabbit' }],
//     edges: [{ id: 'e1', source: 'n1', target: 'n2', label: 'SEES' }]
//   }

class RelationView extends React.Component<Props, State> {

    state: State = {
        graph: {
            nodes: [],
            edges: []
        }
    }

    componentDidMount() {
        if (this.props.data) {
            this.createGraphFromProps(this.props.data)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.data !== nextProps.data && nextProps.data) {
            this.createGraphFromProps(nextProps.data)
        }
    }

    createGraphFromProps(data: Response) {
        const nodes: SigmaJs.Node[] = []
        const edges: SigmaJs.Edge[] = []

        // TODO: Would like to add some control over this... how everthing is turn into a graph...
        // but currently we'll render a very default view

        // Doc --contains-> Entity --refers--> Mention --The Relation-> Mention (-> Entity)

        const entity = data.corpus.entity

        const documentNode = this.createDocumentNode(nodes, entity.docId)
        nodes.push(documentNode)

        const entityNode = this.createEntityNode(nodes, entity.id, entity.type, entity.longestValue)
        nodes.push(entityNode)

        edges.push(this.createEdge(edges, documentNode, entityNode, 'contains'))

        entity.mentions.forEach(m => {

            const mentionNode = this.createMentionNode(nodes, m.id, m.type, m.value)
            nodes.push(mentionNode)

            // Mention to entity
            edges.push(this.createEdge(edges, entityNode, mentionNode, 'refers'))

            // Mention to related mention

            m.sourceOf.forEach(r => {
                const s = this.createMentionNode(nodes, r.target.id, r.target.type, r.target.value)
                nodes.push(s)

                edges.push(this.createEdge(edges, mentionNode, s, r.relationshipType))
            })

            m.targetOf.forEach(r => {
                const s = this.createMentionNode(nodes, r.source.id, r.source.type, r.source.value)
                nodes.push(s)

                edges.push(this.createEdge(edges, s, mentionNode, r.relationshipType))
            })

        })

        const graph = {
            nodes: nodes.map(n => Object.assign({ x: 0, y: 0, size: 15 }, n))

            ,
            edges: edges
        }

        this.setState({
            graph: graph
        })

        console.log(graph)
    }

    findNode(nodes: SigmaJs.Node[], id: string): SigmaJs.Node | undefined {
        const found = nodes.find(n => n.id === id)
        return found
    }

    findEdge(edges: SigmaJs.Edge[], id: string): SigmaJs.Edge | undefined {
        const found = edges.find(e => e.id === id)
        return found
    }

    createDocumentNode(nodes: SigmaJs.Node[], documentId: string): SigmaJs.Node {
        const n = this.findNode(nodes, documentId)
        if (n != null) {
            return n
        }

        return {
            id: documentId,
            label: documentId,
            kind: 'Document',
            color: '#0000ff'

        }
    }

    createEntityNode(nodes: SigmaJs.Node[], entityId: string, type: string, value: string): SigmaJs.Node {
        const n = this.findNode(nodes, entityId)
        if (n != null) {
            return n
        }

        return {
            id: entityId,
            kind: 'Entity',
            type: type,
            label: value,
            color: '#00ff00'
        }
    }

    createMentionNode(nodes: SigmaJs.Node[], mentionId: string, type: string, value: string): SigmaJs.Node {
        const n = this.findNode(nodes, mentionId)
        if (n != null) {
            return n
        }

        return {
            id: mentionId,
            kind: 'Mention',
            type: type,
            label: value,
            color: '#ff0000'
        }
    }

    createEdge(edges: SigmaJs.Edge[], from: SigmaJs.Node, to: SigmaJs.Node, type: string): SigmaJs.Edge {
        const id = `e-${from.id}-${to.id}`
        const e = this.findEdge(edges, id)
        if (e != null) {
            return e
        }
        return {
            id: id,
            kind: 'Edge',
            label: type,
            type: type,
            source: from.id,
            target: to.id

        }
    }

    render() {
        return (
            <SigmaGraph
                graph={this.state.graph}
                onNodeExpand={(node: SigmaJs.Node, helper: GraphHelper) => {
                    const newNodeId = `n-${node.id}-${Math.random()}`
                    helper.addNode({
                        id: newNodeId,
                        label: newNodeId
                    })
                    helper.addEdge({
                        id: newNodeId,
                        source: node.id,
                        target: newNodeId,
                    })
                    helper.refresh()
                    helper.layout()
                }}
            />
        )
    }

}

export default RelationView
