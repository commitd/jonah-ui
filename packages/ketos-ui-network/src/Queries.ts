import { PluginApi } from 'invest-plugin'

import {
    BasicCorpusNode, BasicDocumentNode, BasicEntityNode,
    BasicMentionNode, BasicRelationNode, SourcedRelation,
    TargetedRelation
} from 'ketos-components'

// Inputs

export type ExpandDocumentVariables = {
    datasetId: string
    documentId: string
}

export type ExpandMentionVariables = {
    datasetId: string
    mentionId: string
}

export type ExpandEntityVariables = {
    datasetId: string
    entityId: string
}

export type ExpandRelationVariables = {
    datasetId: string
    relationId: string
}

// GraphQL Responses

export type ExpandMentionResponse = {
    corpus: {
        id: string
        mention: BasicMentionNode & {
            targetOf: SourcedRelation[]
            sourceOf: TargetedRelation[]
            entity: BasicEntityNode
        }
    }
}

export type ExpandEntityResponse = {
    corpus: {
        id: string
        entity: BasicEntityNode & {
            document: BasicDocumentNode
            mentions: (BasicMentionNode & {
                targetOf: SourcedRelation[]
                sourceOf: TargetedRelation[]
            })[]
        }
    }
}

export type ExpandRelationResponse = {
    corpus: {
        id: string
        relation: BasicRelationNode & {
            source: BasicMentionNode & {
                entity: BasicEntityNode
            },
            target: BasicMentionNode & {
                entity: BasicEntityNode
            }
        }
    }
}

export type ExpandDocumentResponse = {
    corpus: BasicCorpusNode & {
        document: BasicDocumentNode & {
            entities: BasicEntityNode[]
        }
    }
}

// GraphQL queries

export const EXPAND_ENTITY = `
query ExpandEntity($datasetId: String!, $entityId: ID) {
    corpus(id: $datasetId) {
      id
      entity(id: $entityId) {
        id
        type
        value
        mentions {
          id
          type
          value 
          sourceOf {
            id
            type
            value 
            target {
              id
              type
              value
              entity {
                  id
                  type
                  value
              }
            }         
          }
          targetOf {
            id
            type
            value 
            source {
              id
              type
              value
              entity {
                  id
                  type
                  value
              }
            }        
          }         
        }
        document {
            id
            info {
                title
            }
        }
      }
    }
  }
`

export const EXPAND_RELATION = `
query ExpandRelation($datasetId: String!, $relationId: ID) {
    corpus(id: $datasetId) {
      id
      relation(id: $relationId) {
        id
        type
        value
        source {
          id
          type
          value          
        }
        target {
          id
          type
          value          
        }
      }
    }
  }
`

export const EXPAND_MENTION = `
query ExpandMention($datasetId: String!, $mentionId: ID) {
    corpus(id: $datasetId) {
      id
      mention(id: $mentionId) {
        id
        type
        value
        entity {
            id
            type
            value
        }
        sourceOf {
          id
          type
          value 
          target {
            id
            type
            value
            entity {
                id
                type
                value
            }
          }         
        }
        targetOf {
          id
          type
          value 
          source {
            id
            type
            value
            entity {
                id
                type
                value
            }
          }        
        }
      }
    }
  }
`

export const EXPAND_DOCUMENT = `
query ExpandMention($datasetId: String!, $documentId: String!) {
    corpus(id: $datasetId) {
      id
      name
      document(id: $documentId) {
        id
        info {
            title
        }
        entities(size:1000) {
          id
          type
          value     
        }
      }
    }
  }
`

// Helper functions

export function expandMention(api: PluginApi, datasetId: string, mentionId: string): Promise<ExpandMentionResponse> {
    return api.query(EXPAND_MENTION, {
        datasetId,
        mentionId
    }).then(r => {
        return r.data as ExpandMentionResponse
    })
}

export function expandEntity(api: PluginApi, datasetId: string, entityId: string): Promise<ExpandEntityResponse> {
    return api.query(EXPAND_ENTITY, {
        datasetId,
        entityId
    }).then(r => {
        return r.data as ExpandEntityResponse
    })
}

export function expandRelation(api: PluginApi, datasetId: string, relationId: string): Promise<ExpandRelationResponse> {
    return api.query(EXPAND_RELATION, {
        datasetId,
        relationId
    }).then(r => {
        return r.data as ExpandRelationResponse
    })
}

export function expandDocument(api: PluginApi, datasetId: string, documentId: string): Promise<ExpandDocumentResponse> {
    return api.query(EXPAND_DOCUMENT, {
        datasetId,
        documentId
    }).then(r => {
        return r.data as ExpandDocumentResponse
    })
}