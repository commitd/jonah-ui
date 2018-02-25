import { EntityFilter, MentionFilter, DocumentFilter, RelationFilter } from './types'

// View

export type CorpusViewPayload = {
    datasetId?: string
}

export type MentionViewPayload = {
    datasetId: string
    mentionId: string
}

export type DocumentViewPayload = {
    datasetId: string
    documentId: string
}

export type RelationViewPayload = {
    datasetId: string
    relationId: string
}

export type EntityViewPayload = {
    datasetId: string
    entityId: string
}

// Search

export type MentionSearchPayload = MentionFilter & {
    datasetId: string
    type?: string
    subType?: string
    value?: string
}

export type DocumentSearchPayload = DocumentFilter & {
    datasetId: string
}

export type RelationSearchPayload = RelationFilter & {
    datasetId: string
}

export type EntitySearchPayload = EntityFilter & {
    datasetId: string
}

// Edit

export type MentionEditPayload = {
    datasetId: string
    mentionId: string
}

export type DocumentEditPayload = {
    datasetId: string
    documentId: string
}

export type RelationEditPayload = {
    datasetId: string
    relationId: string
}

export type EntityEditPayload = {
    datasetId: string
    entityId: string
}
