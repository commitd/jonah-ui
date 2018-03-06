import { Mention } from './MentionEditorDataContainer'

export function cleanMention(item: Mention) {
    return {
        id: item.id || '',
        begin: item.begin || 0,
        end: item.end || 0,
        entityId: item.entityId || '',
        type: item.type || '',
        subType: item.subType || '',
        value: item.value || '',
        docId: item.docId,
        properties: (item.properties || {})
    }
}