import * as React from 'react'
import { Event } from 'react-sigma'
import { GraphHelper, SigmaGraphHelper } from './GraphHelper'

type SigmaProps = {
    sigma?: SigmaJs.Sigma
    onNodeExpand?(node: SigmaJs.Node, helper: GraphHelper): void
    onEdgeExpand?(edge: SigmaJs.Edge, helper: GraphHelper): void
}

type State = {
    helper: GraphHelper
}

class SigmaGraphExpander extends React.Component<SigmaProps, State> {

    constructor(props: SigmaProps) {
        super(props)
        this.state = {
            helper: new SigmaGraphHelper(this.props.sigma as SigmaJs.Sigma)
        }
    }

    componentWillReceiveProps(nextProps: SigmaProps) {
        if (this.props.sigma !== nextProps.sigma) {
            this.setState({
                helper: new SigmaGraphHelper(nextProps.sigma as SigmaJs.Sigma)
            })
        }
    }

    componentDidMount() {
        if (this.props.sigma != null) {
            this.props.sigma.bind('doubleClickNode', (e: Event) => {
                if (e.data.node != null && this.props.onNodeExpand) {
                    this.props.onNodeExpand(e.data.node, this.state.helper)
                } else if (e.data.edge != null && this.props.onEdgeExpand) {
                    this.props.onEdgeExpand(e.data.edge, this.state.helper)
                }
            })
        }
    }

    render() {
        return null
    }
}

export default SigmaGraphExpander