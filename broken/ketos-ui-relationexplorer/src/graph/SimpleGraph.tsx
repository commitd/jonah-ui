import * as React from 'react'
import SigmaGraphExpander from './layers/GraphExpander'
import { GraphHelper } from './GraphHelper'
import Graph from './Graph'
import GraphModel from './layers/GraphModel'
import GraphNode from './layers/GraphNode'
import GraphEdge from './layers/GraphEdge'
import DragNodes from './layers/DragNodes'

type OwnProps = {
    graph: SigmaJs.GraphData
    onNodeExpand?(node: SigmaJs.Node, helper: GraphHelper): void
    onEdgeExpand?(edge: SigmaJs.Edge, helper: GraphHelper): void
}

type Props = OwnProps

type State = {
    graphKey: string
}

class SigmaGraph extends React.Component<Props, State> {

    state: State

    constructor(props: Props) {
        super(props)

        this.state = {
            graphKey: JSON.stringify(props.graph)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        // if (nextProps.graph !== this.props.graph) {

        //     this.setState({
        //         graphKey: JSON.stringify(nextProps.graph)
        //     })

        // }
    }

    render() {
        return (
            <Graph
                key={this.state.graphKey}
                // TODO: Perhaps pick renderer based on the number of nodes?
                renderer="canvas"
                settings={{ drawEdges: true, drawNodes: true, drawLabels: true }}
            >
                {/* <RelativeSize initialSize={15} />
                <RandomizeNodePositions />*/}
                {/* <ForceAtlas2
                    worker={false}
                    barnesHutOptimize={true}
                    barnesHutTheta={0.6}
                    iterationsPerRender={10}
                    linLogMode={true}
                    timeout={3000}
                /> */}
                <SigmaGraphExpander
                    onEdgeExpand={this.props.onEdgeExpand}
                    onNodeExpand={this.props.onNodeExpand}
                />
                {/* <SigmaDragNodes /> */}
                <GraphModel>
                    {this.props.graph.nodes.map(n =>
                        <GraphNode key={n.id} {...n} />
                    )}
                    {this.props.graph.edges.map(e =>
                        <GraphEdge key={e.id} {...e} />
                    )}
                </GraphModel>
                <DragNodes />
            </Graph>

        )
    }

    // TODO: SigmaNodes react component... with <Node key={} id={} ... etc /> ...
    // if the children change you need to update the underlying graph 

}

export default SigmaGraph
