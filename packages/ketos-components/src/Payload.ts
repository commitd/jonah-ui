// View

export type CorpusViewPayload {
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
    type?: string
    subType?: string
    value?: string
}

export type DocumentSearchPayload = {
    datasetId: string
    query?: { [id: string]: string }
}

export type RelationSearchPayload = {
    datasetId: string
    type?: string
    subType?: string
    value?: string
    source?: MentionSearchPayload
    target?: MentionSearchPayload

}

export type EntitySearchtPayload = {
    datasetId: string
    type?: string
    subType?: string
    value?: string
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
    relationid: string
}

export type EntityEditPayload = {
    datasetId: string
    entityId: string
}
