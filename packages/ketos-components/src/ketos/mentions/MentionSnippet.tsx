import { ActionDropdown } from 'invest-components'
import * as React from 'react'
import { Feed, Icon, Segment } from 'semantic-ui-react'
import { MENTION_VIEW } from '../../Actions'
import { Mention } from '../../types'
import DocumentSnippet from '../document/DocumentSnippet'

export type OwnProps = {
  datasetId?: string
  content: string
  mention: Mention
}

export type Props = OwnProps

class MentionSnippet extends React.Component<Props> {
  render() {
    const { datasetId, mention, content } = this.props

    return (
      <Feed.Event key={`{m.begin}-{m.end}`}>
        <Feed.Label>
          <Icon name="file alternate outline" />
        </Feed.Label>
        <Feed.Content>
          {datasetId &&
            mention.id && (
              <Segment basic={true} floated="right">
                <ActionDropdown text="View" action={MENTION_VIEW} onSelect={this.handleAction} />
              </Segment>
            )}
          <Feed.Summary content={`${mention.value} [${mention.type}] ${mention.begin} to ${mention.end}`} />
          <Feed.Extra text={true}>
            <DocumentSnippet begin={mention.begin} end={mention.end} content={content} />
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    )
  }

  private handleAction = (act: (payload: {}) => void) => {
    act({
      datasetId: this.props.datasetId,
      mentionId: this.props.mention.id
    })
  }
}

export default MentionSnippet
