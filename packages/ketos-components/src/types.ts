import { GeoBox, PropertiesMap, PropertiesList } from 'invest-types'

// Basic building blocks

export type BasicDocumentInfo = {
    id: string
    title: string
    date: number
    type: string
}

export type FullDocumentInfo = BasicDocumentInfo & {
    title: string
    date: number
    type: string
    source: string
    language: string
    timestamp: number
    classification: string;
    caveats: string[]
    releasability: string[]
    publishedIds: string[]
}

export type BasicCorpusNode = {
    id: string
    name: string
}

export type BasicDocumentNode = {
    id: string
    summary?: string
    info: {
        title: string
    }
}

export type BasicMentionNode = {
    id: string
    type: string
    subType?: string
    value: string
    entityId?: string
    docId?: string
}

export type Span = {
    begin: number
    end: number
}

export type MentionSpan = Span & {
    id: string
}

export type Mention = Span & BasicMentionNode & {
    entityId?: string
}

export type BasicEntityNode = {
    id: string
    type: string
    subType?: string
    value: string
    docId?: string
}

export type BasicRelationNode = {
    id: string
    type: string
    subType?: string
    value: string
    docId?: string
}

export type RelationWithMentionsNode = BasicRelationNode & {
    source: BasicMentionNode
    target: BasicMentionNode
}

export type SourcedRelation = BasicRelationNode & {
    source: BasicMentionNode

}

export type TargetedRelation = BasicRelationNode & {
    target: BasicMentionNode
}

export type Metadata = {
    key: string
    value: string
}

// Search

export type DocumentFilter = {
    id?: string
    properties?: PropertiesMap
    metadata?: PropertiesList
    content?: string

    info?: {
        type?: string
        source?: string
        language?: string
        classification?: string
        caveats?: string
        releasability: string
        publishedId: string

        startTimestamp?: number
        endTimestamp?: number
    }
}

export type MentionFilter = {
    id?: string
    docId?: string
    type?: string
    subType?: string
    value?: string
    properties?: PropertiesMap

    startTimestamp?: number,
    endTimestamp?: number,
    within?: GeoBox

    entityId?: string
}

export type EntityFilter = {
    id?: string
    docId?: string
    type?: string
    subType?: string
    value?: string
    properties?: PropertiesMap

    mentionId?: string

    startTimestamp?: number,
    endTimestamp?: number,
    within?: GeoBox
}

export type RelationFilter = {
    id?: string
    docId?: string
    type?: string
    subType?: string
    value?: string
    properties?: PropertiesMap
    source?: MentionFilter
    target?: MentionFilter
}

export type DocumentSearch = {
    documentFilter?: DocumentFilter
    relationFilters?: RelationFilter[]
    mentionFilters?: MentionFilter[]
    entityFilters?: EntityFilter[]

}

export type EntitySearch = {
    entityFilter: EntityFilter
}

export type MentionSearch = {
    mentionFilter: MentionFilter

}

export type RelationSearch = {
    relationFilter: RelationFilter

}