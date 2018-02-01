import * as React from 'react'
import { Event as SigmaEvent, EventHandler } from 'react-sigma'
import 'react-sigma/sigma/sigma.plugins.dragNodes.js'

// TODo: Doesn't seem to work... the bind eventHanlders are never called

type SigmaProps = {
    sigma?: SigmaJs.Sigma
}

class SigmaSample extends React.Component<SigmaProps> {

    dragListener: {
        bind(eventName: string, handler: EventHandler): void
    }

    constructor(props: SigmaProps) {
        super(props)
    }

    componentDidMount() {
        if (this.props.sigma != null && sigma.plugins.dragNodes) {

            const s = this.props.sigma

            console.log(s)

            this.dragListener = sigma.plugins.dragNodes(s, s.renderers[0])
            this.dragListener.bind('startdrag', function (event: SigmaEvent) {
                s.stopForceAtlas2()
                console.log(event)
            })
            this.dragListener.bind('drag', function (event: SigmaEvent) {
                console.log(event)
            })
            this.dragListener.bind('drop', function (event: SigmaEvent) {
                console.log(event)
            })
            this.dragListener.bind('dragend', function (even: SigmaEvent) {
                console.log(event)
                s.startForceAtlas2()
            })

            console.log('drag enabled')
            console.log(this.dragListener)
        } else {
            console.error('Unable to initialise dragNodes, plugin missing?')
        }
    }

    render() {
        return null
    }
}

export default SigmaSample