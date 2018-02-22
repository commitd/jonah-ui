export type TermBin = {
    term: string,
    count: number
}

export type TimeBin = {
    ts: number | Date,
    count: number
}

export type TermCount = {
    count: number
    bins: TermBin[]
}

export type TimeCount = {
    interval: string
    bins: TermBin[]
}

// Basic building blocks

export type BasicDocumentInfo = {
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
    info: {
        title: string
    }
}

export type BasicMentionNode = {
    id: string
    type: string
    subType?: string
    value: string
}

export type Span = {
    begin: number
    end: number
}

export type MentionSpan = Span & {
    id: string
}

export type BasicEntityNode = {
    id: string
    type: string
    subType?: string
    value: string
}

export type BasicRelationNode = {
    id: string
    type: string
    subType?: string
    value: string
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

export type Properties = {
    key: string
    value: {}
}