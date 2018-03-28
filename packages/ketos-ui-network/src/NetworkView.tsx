import * as React from 'react'
import { SimpleGraph, GraphHelper } from 'invest-components'
import { Segment } from 'semantic-ui-react'
import SelectionView from './SelectionView'

/** Required to use Sigma */
const sigma = require('sigma')
const g = window as { sigma?: SigmaJs.Sigma }
g.sigma = sigma
// this requires yarn add imports-loader
require('imports-loader?sigma,this=>window!sigma/build/plugins/sigma.plugins.dragNodes.min.js')
require('imports-loader?sigma,this=>window!sigma/build/plugins/sigma.layout.forceAtlas2.min.js')

type Props = {
    datasetId: string
    onExpandMention(graphHelper: GraphHelper, mentionId: string): void
    onExpandEntity(graphHelper: GraphHelper, entityId: string): void
    onExpandRelation(graphHelper: GraphHelper, relationId: string): void
    onExpandDocument(graphHelper: GraphHelper, documentId: string): void
    onSigma(sigma: SigmaJs.Sigma): void
}

type State = {

    graph: {
        edges: SigmaJs.Edge[]
        nodes: SigmaJs.Node[]
    }
    selectedNode?: SigmaJs.Node,
    selectedEdge?: SigmaJs.Edge

}

export default class NetworkView extends React.Component<Props, State> {

    state: State = {
        graph: {
            edges: [],
            nodes: []
        }
    }

    handleNodeExpand = (node: SigmaJs.Node, helper: GraphHelper) => {
        if (node.type === 'Mention') {
            this.props.onExpandMention(helper, node.data.id)
        } else if (node.type === 'Entity') {
            this.props.onExpandEntity(helper, node.data.id)
        } else if (node.type === 'Relation') {
            this.props.onExpandRelation(helper, node.data.id)
        } else if (node.type === 'Document') {
            this.props.onExpandDocument(helper, node.data.id)
        }
    }

    handleNodeSelect = (node: SigmaJs.Node) => {
        this.setState({
            selectedEdge: undefined,
            selectedNode: node
        })
    }

    handleEdgeSelect = (edge: SigmaJs.Edge) => {
        this.setState({
            selectedEdge: edge,
            selectedNode: undefined
        })
    }

    render() {

        const { selectedEdge, selectedNode } = this.state

        let selected
        if (selectedEdge) {
            selected = {
                datasetId: this.props.datasetId,
                type: selectedEdge.type,
                data: selectedEdge.data
            }
        } else if (selectedNode) {
            selected = {
                datasetId: this.props.datasetId,
                type: selectedNode.type,
                data: selectedNode.data
            }
        }

        return (
            <div style={{ height: '100%' }}>
                <Segment floated="right" style={{zIndex: 1}} basic={true}>
                    {selected && <SelectionView {...selected} />}
                </Segment>
                <SimpleGraph
                    settings={{
                        sideMargin: 20,
                        drawEdges: true,
                        drawNodes: true,
                        drawLabels: true,
                        enableHovering: true,
                        enableEdgeHovering: true,
                        edgeHoverSizeRatio: 2,
                        doubleClickEnabled: false,
                        minEdgeSize: 0.5,
                        maxEdgeSize: 4,
                        minNodeSize: 1,
                        maxNodeSize: 16,
                        borderSize: 4,

                        autoRescale: true,
                        skipErrors: true

                    }}
                    graph={this.state.graph}
                    onNodeSelect={this.handleNodeSelect}
                    onEdgeSelect={this.handleEdgeSelect}
                    onNodeExpand={this.handleNodeExpand}
                    onSigma={this.props.onSigma}
                />
            </div>

        )
    }

}
