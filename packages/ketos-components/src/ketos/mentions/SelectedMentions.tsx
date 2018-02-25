import * as React from 'react'
import { Mention } from '../../types'
import MentionTable from './MentionTable'

export interface Props {
    datasetId: string,
    mentions: Mention[]
    selectedMentions?: string[]
}

export default class SelectedMentions extends React.Component<Props> {

    render() {
        const { datasetId, mentions, selectedMentions } = this.props
        // Filter mentions to just be the selected

        let filtered: Mention[]
        if (selectedMentions == null || selectedMentions.length === 0) {
            filtered = []
        } else {
            filtered = mentions.filter(f => selectedMentions.includes(f.id))
        }

        return (
            <MentionTable datasetId={datasetId} mentions={filtered} />
        )
    }

}
