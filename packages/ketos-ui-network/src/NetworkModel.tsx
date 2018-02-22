import * as React from 'react'
import * as PropTypes from 'prop-types'
const isEqual = require('lodash.isequal')
import { Context as PluginContext } from 'invest-plugin'
import {
    expandRelation, expandEntity, expandMention, expandDocument,
} from './Queries'
import NetworkView from './NetworkView'
import { GraphHelper, SigmaGraphHelper } from 'invest-components'
import {
    BasicCorpusNode, BasicDocumentNode, BasicEntityNode,
    BasicMentionNode, BasicRelationNode
} from 'ketos-components'

export type Props = {
    datasetId: string,
    entityId?: string,
    relationId?: string,
    documentId?: string,
    mentionId?: string
}

type State = {
    helper?: GraphHelper
}

type Context = PluginContext

export default class NetworkExpander extends React.Component<Props, State> {

    static contextTypes = {
        pluginApi: PropTypes.object
    }

    state: State = {
        helper: undefined
    }

    context: Context

    componentDidMount() {
        this.loadRoot()
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.props !== prevProps || !isEqual(this.props, prevProps)) {
            this.loadRoot()
        }

        if (this.state.helper != null && this.state.helper !== prevState.helper) {
            this.loadRoot()
        }
    }

    render() {
        return (
            <NetworkView
                datasetId={this.props.datasetId}
                onExpandDocument={this.handleExpandDocument}
                onExpandRelation={this.handleExpandRelation}
                onExpandEntity={this.handleExpandEntity}
                onExpandMention={this.handleExpandMention}
                onSigma={this.handleOnGraph}
            />
        )
    }

    private handleOnGraph = (sigma: SigmaJs.Sigma) => {
        this.setState({
            helper: new SigmaGraphHelper(sigma)
        })
    }

    private loadRoot = () => {
        const helper = this.state.helper
        if (!helper) {
            return
        }

        helper.clear()

        if (this.props.documentId) {
            this.handleExpandDocument(helper, this.props.documentId)
        } else if (this.props.mentionId) {
            this.handleExpandMention(helper, this.props.mentionId)
        } else if (this.props.entityId) {
            this.handleExpandEntity(helper, this.props.entityId)
        } else if (this.props.relationId) {
            this.handleExpandRelation(helper, this.props.relationId)
        }
    }

    private handleExpandDocument = (helper: GraphHelper, documentId: string) => {
        expandDocument(this.context.pluginApi, this.props.datasetId, documentId)
            .then(r => {
                const datasetNode = this.addDataset(helper, r.corpus)
                const documentNode = this.addDocument(helper, r.corpus.document)
                this.addEdge(helper, 'in', 'in', datasetNode.id, documentNode.id)

                r.corpus.document.entities.forEach(e => {
                    const entityNode = this.addEntity(helper, e)
                    this.addEdge(helper, 'in', 'in', documentNode.id, entityNode.id)
                })

                helper.refresh()
                helper.layout()
            })
    }

    private handleExpandMention = (helper: GraphHelper, mentionId: string) => {
        expandMention(this.context.pluginApi, this.props.datasetId, mentionId)
            .then(r => {
                const mentionNode = this.addMention(helper, r.corpus.mention)
                const entityNode = this.addEntity(helper, r.corpus.mention.entity)
                this.addEdge(helper, 'as', 'as', entityNode.id, mentionNode.id)

                r.corpus.mention.sourceOf.forEach(e => {
                    this.addMention(helper, e.target)
                    this.addRelation(helper, e, r.corpus.mention, e.target)
                })

                r.corpus.mention.targetOf.forEach(e => {
                    this.addMention(helper, e.source)
                    this.addRelation(helper, e, e.source, r.corpus.mention)
                })

                helper.refresh()
                helper.layout()
            })
    }

    private handleExpandEntity = (helper: GraphHelper, entityId: string) => {
        expandEntity(this.context.pluginApi, this.props.datasetId, entityId)
            .then(r => {
                const entityNode = this.addEntity(helper, r.corpus.entity)
                const documentNode = this.addDocument(helper, r.corpus.entity.document)
                this.addEdge(helper, 'in', 'in', documentNode.id, entityNode.id)

                r.corpus.entity.mentions.forEach(m => {
                    const node = this.addMention(helper, m)
                    this.addEdge(helper, 'as', 'as', entityNode.id, node.id)
                })

                helper.refresh()
                helper.layout()
            })
    }

    private handleExpandRelation = (helper: GraphHelper, relationId: string) => {
        expandRelation(this.context.pluginApi, this.props.datasetId, relationId)
            .then(r => {
                this.addMention(helper, r.corpus.relation.source)
                this.addMention(helper, r.corpus.relation.target)
                this.addRelation(helper, r.corpus.relation, r.corpus.relation.source, r.corpus.relation.target)

                helper.refresh()
                helper.layout()
            })
    }

    private getDatasetGraphId = (datasetId: string) => {
        return `n-c-${datasetId}`
    }

    private getDocumentGraphId = (documentId: string) => {
        return `n-d-${documentId}`
    }

    private getMentionGraphId = (mentionId: string) => {
        return `n-m-${mentionId}`
    }

    private getEntityGraphId = (entityId: string) => {
        return `n-d-${entityId}`
    }

    private getRelationGraphId = (relationId: string) => {
        return `e-r-${relationId}`
    }

    private getEdgeGraphId = (fromId: string, toId: string) => {
        return `e-${fromId}-${toId}`
    }

    private addDataset = (helper: GraphHelper, dataset: BasicCorpusNode): SigmaJs.Node => {
        let id = this.getDatasetGraphId(dataset.id)
        let n = helper.findNode(id)
        if (n != null) {
            return n
        }

        n = {
            id,
            label: dataset.name,
            type: 'Dataset',
            color: '#0000ff',
            data: document

        }
        helper.addNode(n)
        return n
    }

    private addDocument = (helper: GraphHelper, document: BasicDocumentNode): SigmaJs.Node => {
        let id = this.getDocumentGraphId(document.id)
        let n = helper.findNode(id)
        if (n != null) {
            return n
        }

        n = {
            id,
            label: document.info.title,
            type: 'Document',
            color: '#0000ff',
            data: document

        }
        helper.addNode(n)
        return n
    }

    private addEntity = (helper: GraphHelper, entity: BasicEntityNode): SigmaJs.Node => {
        let id = this.getEntityGraphId(entity.id)
        let n = helper.findNode(id)
        if (n != null) {
            return n
        }

        n = {
            id,
            type: 'Entity',
            label: entity.value,
            color: '#00ff00',
            data: entity
        }
        helper.addNode(n)
        return n
    }

    private addMention = (
        helper: GraphHelper, mention: BasicMentionNode): SigmaJs.Node => {
        let id = this.getMentionGraphId(mention.id)
        let n = helper.findNode(id)
        if (n != null) {
            return n
        }

        n = {
            id: id,
            type: 'Mention',
            label: mention.value,
            color: '#ff0000',
            data: mention

        }
        helper.addNode(n)
        return n

    }

    private addRelation = (
        helper: GraphHelper,
        relation: BasicRelationNode,
        source: BasicMentionNode,
        target: BasicMentionNode
    ): SigmaJs.Edge => {
        const id = this.getRelationGraphId(relation.id)
        let e = helper.findEdge(id)
        if (e != null) {
            return e
        }
        e = {
            id: id,
            type: 'Relation',
            label: relation.type,
            color: '#ff00ff',
            source: this.getMentionGraphId(source.id),
            target: this.getMentionGraphId(target.id),
            data: relation

        }
        helper.addEdge(e)
        return e
    }

    private addEdge = (
        helper: GraphHelper,
        type: string,
        label: string,
        fromId: string,
        toId: string
    ): SigmaJs.Edge => {
        const id = this.getEdgeGraphId(fromId, toId)
        let e = helper.findEdge(id)
        if (e != null) {
            return e
        }
        e = {
            id: id,
            type: type,
            label: label,
            source: fromId,
            target: toId,
            color: '#cccccc'

        }
        helper.addEdge(e)
        return e
    }
}