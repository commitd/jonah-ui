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

export type MentionSearchPayload = {
    datasetId: string
    mentionFilter?: MentionFilter
}

export type DocumentSearchPayload = {
    datasetId: string
    documentFilter?: DocumentFilter
}

export type RelationSearchPayload = {
    datasetId: string,
    relationFilter?: RelationFilter
}

export type EntitySearchPayload = {
    datasetId: string,
    entityFilter?: EntityFilter
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

// Delete

export type MentionDeletePayload = {
    datasetId: string
    mentionId: string
}

export type DocumentDeletePayload = {
    datasetId: string
    documentId: string
}

export type RelationDeletePayload = {
    datasetId: string
    relationId: string
}

export type EntityDeletePayload = {
    datasetId: string
    entityId: string
}