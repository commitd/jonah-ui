import update from 'immutability-helper'
import { PropertiesList, PropertiesMap } from 'invest-types'
import { MentionItem } from './EditableTypes'
import { Mention } from './MentionEditorDataContainer'

export function cleanMention(item: MentionItem): Mention {
  return {
    id: item.id || '',
    begin: item.begin || 0,
    end: item.end || 0,
    entityId: item.entityId || '',
    type: item.type || '',
    subType: item.subType || '',
    value: item.value || '',
    docId: item.docId,
    properties: item.propertiesList ? propertiesListToMap(item.propertiesList) : item.properties
  }
}

export function addPropertiesList<T>(t: T & { properties?: PropertiesMap }): T & { propertiesList: PropertiesList } {
  return Object.assign({}, t, {
    propertiesList: propertiesMapToList(t.properties)
  })
}

export function addPropertiesMap<T>(t: T & { propertiesList: PropertiesList }): T & { properties: PropertiesMap } {
  return Object.assign({}, t, {
    properties: propertiesListToMap(t.propertiesList)
  })
}

export function propertiesMapToList(properties?: PropertiesMap): PropertiesList {
  const p = properties || {}
  return Object.keys(p).map(k => ({
    key: k,
    value: p[k]
  }))
}

export function propertiesListToMap(propertiesList?: PropertiesList): PropertiesMap {
  return (propertiesList || []).filter(l => l.key != null && l.key !== '').reduce((m, l) => {
    m[l.key] = l.value
    return m
    // tslint:disable-next-line:align
  }, {})
}

export function updateValueInPropertiesList(list: PropertiesList, key: string, value: {}) {
  // Only replace the first...
  const index = list.findIndex(l => l.key === key)

  if (index < 0) {
    return list
  }
  const m = update(list[index], { $merge: { value: value } })
  return update(list || [], { $merge: { [index]: m } })
}
