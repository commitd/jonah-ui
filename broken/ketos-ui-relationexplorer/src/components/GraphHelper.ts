export interface GraphHelper {

    addNode(n: SigmaJs.Node): void

    addEdge(e: SigmaJs.Edge): void

    refresh(): void

    layout(timeout?: number): void
}

export class SigmaGraphHelper implements GraphHelper {
    private sigma: SigmaJs.Sigma
    private graph: SigmaJs.Graph

    constructor(sigma: SigmaJs.Sigma) {
        this.sigma = sigma
        this.graph = sigma.graph
    }

    addNode = (n: SigmaJs.Node) => {
        if (n.x == null || n.x === 0) {
            n.x = Math.random() * 50
        }
        if (n.y == null || n.y === 0) {
            n.y = Math.random() * 50
        }
        if (n.size == null) {
            n.size = 15
        }
        this.graph.addNode(n)
    }

    addEdge = (e: SigmaJs.Edge) => {
        this.graph.addEdge(e)
    }

    refresh = () => {
        this.sigma.refresh()
    }

    layout = (timeout?: number) => {
        // Don't know if I need to so this in order to pick up the new nodes and edges?
        this.sigma.killForceAtlas2()

        if (!this.sigma.isForceAtlas2Running()) {
            this.sigma.startForceAtlas2()
            const runtime = timeout !== undefined ? timeout : Math.min(2000, this.graph.nodes().length * 10)
            setTimeout(() => this.sigma.stopForceAtlas2(), runtime)
        }
    }
}
