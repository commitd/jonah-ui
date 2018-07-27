declare module 'react-sigma' {
  import * as React from 'react'

  export type Graph = {
    nodes: Node[]
    edges: Edge[]
  }

  export type Node = {
    id: string
    label?: string
    x?: number
    y?: number
    size?: number
    color?: string
  }

  export type Edge = {
    id: string
    source: string
    target: string
    label?: string
    color?: string
  }

  export type Event = {
    data: {
      node?: Node //for node events is sigma node data
      edge?: Edge //for edge events is sigma edge data
      captor: {
        // information about event handler, for instance position on the page {clientX, clientY}
        clientX: number
        clientY: number
      }
    }
  }

  export type EventHandler = (event: Event) => void

  export class RelativeSize extends React.Component<{
    initialSize: number
  }> {}

  export class RandomizeNodePositions extends React.Component<{}> {}

  export class Sigma extends React.Component<{
    renderer?: string
    style?: {}
    settings?: {}
    graph: Graph
    onClickNode?: EventHandler
    onOverNode?: EventHandler
    onOutNode?: EventHandler
    onClickEdge?: EventHandler
    onOverEdge?: EventHandler
    onOutEdge?: EventHandler
  }> {}

  export type EdgeShapesOptions =
    | 'line'
    | 'arrow'
    | 'curve'
    | 'curvedArrow'
    | 'dashed'
    | 'dotted'
    | 'parallel'
    | 'tapered'

  export class EdgeShapes extends React.Component<{
    default: EdgeShapesOptions
  }> {}

  export type NodeShapesOptions = 'def' | 'pacman' | 'star' | 'equilateral' | 'cross' | 'diamond' | 'circle' | 'square'

  export class NodeShapes extends React.Component<{
    default: NodeShapesOptions
    borderColor: string
  }> {}

  export class SigmaEnableWebGL extends React.Component<{}> {}
  export class SigmaEnableSVG extends React.Component<{}> {}

  export class ForceAtlas2 extends React.Component<{
    worker: boolean
    barnesHutOptimize?: boolean
    barnesHutTheta?: number
    adjustSizes?: boolean
    iterationsPerRender?: number
    linLogMode: boolean
    outboundAttractionDistribution?: boolean
    edgeWeightInfluence?: number
    scalingRatio?: number
    strongGravityMode?: boolean
    slowDown?: number
    gravity?: number
    timeout?: number
    sigma?: {}
  }> {}

  // TODO: Props

  export class NeoCypher extends React.Component<{}> {}
  export class LoadJSON extends React.Component<{}> {}
  export class LoadGEXF extends React.Component<{}> {}
  export class ForceLink extends React.Component<{}> {}

  export class NOverlap extends React.Component<{}> {}
  export class Dagre extends React.Component<{}> {}
  export class ReactSigmaLayoutPlugin extends React.Component<{}> {}
  export class Filter extends React.Component<{}> {}
}
