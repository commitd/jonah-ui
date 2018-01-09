import * as React from 'react'
import { Sigma, Graph } from 'react-sigma'
// import { Sigma, RandomizeNodePositions, RelativeSize, Graph,  } from 'react-sigma'
import SigmaGraphExpander, { GraphHelper } from './SigmaGraphExpander'
// import SigmaDragNodes from './SigmaDragNodes'
import ReactGraph, { Node, Edge } from './Graph'

type OwnProps = {
    graph: Graph
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
            <Sigma
                key={this.state.graphKey}
                graph={{ nodes: [], edges: [] }}
                style={{ width: '100%', height: '100%' }}
                // TODO: Perhaps pick renderer based on the number of nodes?
                renderer="canvas"
                settings={{ drawEdges: true, drawEdgeLabels: true, clone: false, doubleClickEnabled: false }}
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
                <ReactGraph>
                    {this.props.graph.nodes.map(n =>
                        <Node key={n.id} {...n} />
                    )}
                    {this.props.graph.edges.map(e =>
                        <Edge key={e.id} {...e} />
                    )}
                </ReactGraph>
            </Sigma>

        )
    }

    // TODO: SigmaNodes react component... with <Node key={} id={} ... etc /> ...
    // if the children change you need to update the underlying graph 

}

export default SigmaGraph
