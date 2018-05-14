import { PropertiesList } from 'invest-types'
import { Document } from './DocumentEditorDataContainer'
import { Entity } from './EntityEditorDataContainer'
import { Mention } from './MentionEditorDataContainer'
import { Relation } from './RelationEditorDataContainer'

export type DocumentItem = Document & {
  propertiesList: PropertiesList
}

export type RelationItem = Relation & {
  propertiesList: PropertiesList
  source: MentionItem
  target: MentionItem
}

export type EntityItem = Entity & {
  propertiesList: PropertiesList
}

export type MentionItem = Mention & {
  propertiesList: PropertiesList
}
