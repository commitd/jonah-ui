import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Container, Divider } from 'semantic-ui-react'
import { SimpleGraph } from 'invest-components'
import { Context as PluginContext } from 'invest-plugin'
import { Response } from './DataContainer'
import { RelationTable, DocumentSnippet } from 'ketos-components'

/** Required to use Sigma */
const sigma = require('sigma')
const g = window as { sigma?: SigmaJs.Sigma }
g.sigma = sigma
require('imports-loader?sigma,this=>window!sigma/build/plugins/sigma.plugins.dragNodes.min.js')
require('imports-loader?sigma,this=>window!sigma/build/plugins/sigma.layout.forceAtlas2.min.js')

type Props = {
    data?: Response
}

type State = {
    graph: SigmaJs.GraphData
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

    render() {

        const { data } = this.props

        if (!data || !data.corpus || !data.corpus.relation) {
            return <p>Not found</p>
        }

        const relation = data.corpus.relation

        return (
            <Container>
                <div style={{ height: '700px' }}>
                    <SimpleGraph
                        settings={{
                            drawEdges: true, drawNodes: true,
                            drawLabels: true, enableEdgeHovering: true,
                            edgeHoverSizeRatio: 5
                        }}
                        graph={this.state.graph}
                    />
                </div>
                <RelationTable datasetId={data.corpus.id} relations={[relation]} />
                <Divider hidden={true} />
                <DocumentSnippet
                    content={data.corpus.relation.document.content}
                    begin={data.corpus.relation.begin}
                    end={data.corpus.relation.end}
                />
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

        const corpus = data.corpus

        if (corpus == null) {
            return
        }

        const relation = corpus.relation

        if (corpus.relation == null) {
            return
        }

        const corpusNode = this.addCorpusNode(nodes, corpus.id, corpus.name)

        const documentNode = this.addDocumentNode(nodes, relation.document.id, relation.document.info.title)

        const sourceNode = this.addMentionNode(nodes, relation.source.id, relation.source.type, relation.source.value)

        const targetNode = this.addMentionNode(nodes, relation.target.id, relation.target.type, relation.target.value)

        const relationNode = this.addRelationNode(nodes, relation.id, relation.type)

        this.addEdge(edges, corpusNode, documentNode, 'contains')
        this.addEdge(edges, documentNode, sourceNode, 'mentions')
        this.addEdge(edges, documentNode, targetNode, 'mentions')

        this.addEdge(edges, sourceNode, relationNode, 'from')
        this.addEdge(edges, relationNode, targetNode, 'to')

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

    addCorpusNode(nodes: SigmaJs.Node[], corpusId: string, name: string): SigmaJs.Node {
        let n = this.findNode(nodes, corpusId)
        if (n != null) {
            return n
        }

        n = {
            id: corpusId,
            label: name,
            type: 'Corpus',
            color: '#0f00ff'

        }
        nodes.push(n)
        return n
    }

    addDocumentNode(nodes: SigmaJs.Node[], documentId: string, title: string): SigmaJs.Node {
        let n = this.findNode(nodes, documentId)
        if (n != null) {
            return n
        }

        n = {
            id: documentId,
            label: title,
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

    addRelationNode(nodes: SigmaJs.Node[], relationId: string, type: string): SigmaJs.Node {
        let n = this.findNode(nodes, relationId)
        if (n != null) {
            return n
        }

        n = {
            id: relationId,
            type: 'Entity',
            relationType: type,
            label: type,
            color: '#00ff00'
        }
        nodes.push(n)
        return n
    }

    addMentionNode(
        nodes: SigmaJs.Node[], mentionId: string, type: string, value: string): SigmaJs.Node {
        let n = this.findNode(nodes, mentionId)
        if (n != null) {
            return n
        }

        n = {
            id: mentionId,
            type: 'Mention',
            mentionType: type,
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
