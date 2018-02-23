
function make(a: string, b: string) {
    return a + '.' + b
}

const CORPUS = 'corpus'

const DOCUMENT = 'document'

const ENTITY = 'entity'

const RELATION = 'relation'

const EVENT = 'event'

const MENTION = 'mention'

// Activities

const VIEW = 'view'

const SEARCH = 'search'

const EDIT = 'edit'

// Actual actions

export const CORPUS_VIEW = make(CORPUS, VIEW)

export const DOCUMENT_VIEW = make(DOCUMENT, VIEW)
export const DOCUMENT_SEARCH = make(DOCUMENT, SEARCH)
export const DOCUMENT_EDIT = make(DOCUMENT, EDIT)

export const ENTITY_VIEW = make(ENTITY, VIEW)
export const ENTITY_SEARCH = make(ENTITY, SEARCH)
export const ENTITY_EDIT = make(ENTITY, EDIT)

export const RELATION_VIEW = make(RELATION, VIEW)
export const RELATION_SEARCH = make(RELATION, SEARCH)
export const RELATION_EDIT = make(RELATION, EDIT)

export const EVENT_VIEW = make(EVENT, VIEW)
export const EVENT_SEARCH = make(EVENT, SEARCH)
export const EVENT_EDIT = make(EVENT, EDIT)

export const MENTION_VIEW = make(MENTION, VIEW)
export const MENTION_SEARCH = make(MENTION, SEARCH)
export const MENTION_EDIT = make(MENTION, EDIT)