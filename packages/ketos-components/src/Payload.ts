
// TODO: APply these everywhere
// TODO: add definition strings for mention.view etc

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
    relationid: string
}

export type EntityViewPayload = {
    datasetId: string
    entityId: string
}
