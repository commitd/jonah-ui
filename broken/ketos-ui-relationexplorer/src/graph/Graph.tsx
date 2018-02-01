import * as React from 'react'
import { GraphHelper, SigmaGraphHelper } from './GraphHelper'
import GraphModel from './layers/GraphModel'

const sigma = require('sigma')

export interface GraphChild {
    sigma?: SigmaJs.Sigma,
    graph?: GraphHelper,
}

interface GraphChildSet {
    sigma: SigmaJs.Sigma,
    graph: GraphHelper,
}

interface GraphProps {
    settings?: SigmaJs.Settings
    renderer?: 'canvas' | 'webgl'
    children: React.ReactElement<GraphModel>[]
}

class Graph extends React.Component<GraphProps> {

    sigma: SigmaJs.Sigma
    renderer?: SigmaJs.Renderer
    helper: GraphHelper

    constructor(props: GraphProps) {
        super(props)
        // Once set, settings can't be changed
        this.sigma = new sigma({
            settings: props.settings
        })
        this.helper = new SigmaGraphHelper(this.sigma)
    }

    handleRef = (container: HTMLDivElement) => {
        if (this.renderer) {
            console.log(this.renderer)
            this.sigma.killRenderer(this.renderer)
        }

        if (container) {
            this.renderer = this.sigma.addRenderer({
                type: this.props.renderer,
                container: container
            })
        }
    }

    componentWillUnmount() {
        this.sigma.kill()
    }

    render() {
        const { children } = this.props

        const withSigmaChildren = React.Children.map(children, (child: React.ReactElement<GraphChildSet>) =>
            React.cloneElement(child, { sigma: this.sigma, graph: this.helper }))

        return (
            <div
                style={{ width: '100%', height: '100%' }}
                ref={this.handleRef}
            >
                {withSigmaChildren}
            </div>
        )
    }
}

export default Graph