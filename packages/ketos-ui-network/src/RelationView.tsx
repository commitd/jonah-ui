import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Table, Container } from 'semantic-ui-react'
import { SimpleGraph, GraphHelper } from 'invest-components'
import { Context as PluginContext } from 'invest-plugin'
import { GET_RELATIONS_FOR_ENTITY_QUERY } from './DataContainer'
import { Response } from './DataContainer'
import { ApolloQueryResult } from 'apollo-client'

/** Required to use Sigma */
const sigma = require('sigma')
const g = window as { sigma?: SigmaJs.Sigma }
g.sigma = sigma
// this requires yarn add imports-loader
require('imports-loader?sigma,this=>window!sigma/build/plugins/sigma.plugins.dragNodes.min.js')
require('imports-loader?sigma,this=>window!sigma/build/plugins/sigma.layout.forceAtlas2.min.js')

type Props = {
    data?: Response
}

type State = {
    graph: SigmaJs.GraphData
}

type MentionNode = SigmaJs.Node & {
    entityId: string
}

type Context = PluginContext

class RelationView extends React.Component<Props, State> {

    static contextTypes = {
        pluginApi: PropTypes.object
    }

    context: Context

    state: State = {
        graph: {
            edges: [],
            nodes: []
        }
    }

    componentDidMount() {
        if (this.props.data) {
            this.createGraph(this.props.data)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.data !== nextProps.data && nextProps.data) {
            this.createGraph(nextProps.data)
        }
    }

    handleFakeNodeExpand = (node: SigmaJs.Node, helper: GraphHelper) => {
        const newNodeId = `n-${node.id}-${Math.random()}`
        helper.addNode({
            id: newNodeId,
            label: newNodeId,
        })
        helper.addEdge({
            id: newNodeId,
            source: node.id,
            target: newNodeId,
        })
        helper.refresh()
        helper.layout()
    }

    handleNodeExpand = (node: SigmaJs.Node, helper: GraphHelper) => {
        // TODO: Data is not really null... (especially if you get to here!)
        const corpusId = this.props.data ? this.props.data.corpus.id : ''

        if (node.type === 'Mention') {
            const entityId = (node as MentionNode).entityId
            this.context.pluginApi.query(GET_RELATIONS_FOR_ENTITY_QUERY, {
                datasetId: corpusId,
                entityId: entityId
            }).then((value: ApolloQueryResult<Response>) => {
                this.addToGraph(this.state.graph.nodes, this.state.graph.edges, value.data)
            })
        } else if (node.type === 'Entity') {
            const entityId = node.id
            this.context.pluginApi.query(GET_RELATIONS_FOR_ENTITY_QUERY, {
                datasetId: corpusId,
                entityId: entityId
            }).then((value: ApolloQueryResult<Response>) => {
                this.addToGraph(this.state.graph.nodes, this.state.graph.edges, value.data)
            })
        } else {
            console.log('Can\'t expand that yet')
            // TODO: Expand at the Document level
        }
    }

    render() {
        return (
            <Container>
                <div style={{ height: '700px' }}>
                    <SimpleGraph
                        settings={{
                            drawEdges: true,
                            drawNodes: true, drawLabels: true,
                            enableEdgeHovering: true, edgeHoverSizeRatio: 5
                        }}
                        graph={this.state.graph}
                        onNodeExpand={this.handleNodeExpand}
                    />
                </div>
                {/* TODO THis is generated from the edges which is a bit strange as it 
                makes it very bespoke to this, when we already have an edges table */}
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>From</Table.HeaderCell>
                            <Table.HeaderCell>Relation</Table.HeaderCell>
                            <Table.HeaderCell>To</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.graph.edges.map(e => {
                            const from = this.findNode(this.state.graph.nodes, e.source)
                            const to = this.findNode(this.state.graph.nodes, e.target)
                            return <Table.Row key={e.id}>
                                <Table.Cell>{from == null ? 'Unknown' : `${from.label} [${from.type}]`}</Table.Cell>
                                <Table.Cell>{e.label}</Table.Cell>
                                <Table.Cell>{to == null ? 'Unknown' : `${to.label} [${to.type}]`}</Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Container>

        )
    }

    // All these should be helpers

    createGraph(data: Response) {
        const nodes: SigmaJs.Node[] = []
        const edges: SigmaJs.Edge[] = []

        this.addToGraph(nodes, edges, data)
    }

    addToGraph(nodes: SigmaJs.Node[], edges: SigmaJs.Edge[], data: Response) {

        // TODO: Would like to add some control over this... how everything is turn into a graph...
        // but currently we'll render a very default view

        // Doc --contains-> Entity --refers--> Mention --The Relation-> Mention (-> Entity)

        const entity = data.corpus.entity

        const documentNode = this.addDocumentNode(nodes, entity.docId)

        const entityNode = this.addEntityNode(nodes, entity.id, entity.type, entity.value)

        this.addEdge(edges, documentNode, entityNode, 'contains')

        entity.mentions.forEach(m => {

            const mentionNode = this.addMentionNode(nodes, m.id, m.type, m.value, entity.id)

            // Mention to entity
            this.addEdge(edges, entityNode, mentionNode, 'refers')

            // Mention to related mention

            m.sourceOf.forEach(r => {
                const s = this.addMentionNode(nodes, r.target.id, r.target.type, r.target.value, r.target.entityId)

                this.addEdge(edges, mentionNode, s, r.type)
            })

            m.targetOf.forEach(r => {
                const s = this.addMentionNode(nodes, r.source.id, r.source.type, r.source.value, r.source.entityId)

                this.addEdge(edges, s, mentionNode, r.type)
            })

        })

        const graph = {
            nodes: nodes,
            edges: edges
        }

        this.setState({
            graph: graph
        })
    }

    findNode(nodes: SigmaJs.Node[], id: string): SigmaJs.Node | undefined {
        return nodes.find(n => n.id === id)
    }

    findEdge(edges: SigmaJs.Edge[], id: string): SigmaJs.Edge | undefined {
        return edges.find(e => e.id === id)
    }

    addDocumentNode(nodes: SigmaJs.Node[], documentId: string): SigmaJs.Node {
        let n = this.findNode(nodes, documentId)
        if (n != null) {
            return n
        }

        n = {
            id: documentId,
            label: documentId,
            type: 'Document',
            color: '#0000ff'

        }
        nodes.push(n)
        return n
    }

    addEntityNode(nodes: SigmaJs.Node[], entityId: string, type: string, value: string): SigmaJs.Node {
        let n = this.findNode(nodes, entityId)
        if (n != null) {
            return n
        }

        n = {
            id: entityId,
            type: 'Entity',
            entityType: type,
            label: value,
            color: '#00ff00'
        }
        nodes.push(n)
        return n
    }

    addMentionNode(
        nodes: SigmaJs.Node[], mentionId: string, type: string, value: string, entityId: string): SigmaJs.Node {
        let n = this.findNode(nodes, mentionId)
        if (n != null) {
            return n
        }

        n = {
            id: mentionId,
            type: 'Mention',
            mentionType: type,
            entityId: entityId,
            label: value,
            color: '#ff0000',
        }
        nodes.push(n)
        return n

    }

    addEdge(edges: SigmaJs.Edge[], from: SigmaJs.Node, to: SigmaJs.Node, type: string): SigmaJs.Edge {
        const id = `e-${from.id}-${to.id}`
        let e = this.findEdge(edges, id)
        if (e != null) {
            return e
        }
        e = {
            id: id,
            kind: 'Edge',
            label: type,
            type: type,
            source: from.id,
            target: to.id,

        }
        edges.push(e)
        return e
    }

}

export default RelationView
