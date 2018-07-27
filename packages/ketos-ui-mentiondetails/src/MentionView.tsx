import * as React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { MentionSnippets, PropertiesTable, RelatedMentionsTable, ENTITY_VIEW } from 'ketos-components'
import { ActionDropdown } from 'invest-components'
import { Response } from './DataContainer'

type OwnProps = {
    data?: Response
}

type Props = OwnProps

class EntityView extends React.Component<Props> {

    render() {
        const { data } = this.props
        if (data == null) {
            return <div />
        }

        const mention = data.corpus.mention

        if (mention == null) {
            return <p>Not found</p>
        }

        return (
            <Grid>
                <Grid.Column width={12}>
                    <Segment basic={true} floated="right">
                        <ActionDropdown text="Action" action={ENTITY_VIEW} onSelect={this.handleAction} />
                    </Segment>
                    <Header as="h1">{mention.value}</Header>
                    <Header as="h2">{mention.type}</Header>
                    <Header as="h3" content="Snippets" />
                    <MentionSnippets
                        mentions={[mention]}
                        content={mention.document.content}
                        datasetId={data.corpus.id}
                        documentId={mention.document.id}
                    />
                    <Header as="h3" content="Relations" />
                    <RelatedMentionsTable mentions={[mention]} datasetId={data.corpus.id} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header as="h3" content="Properties" />
                    <PropertiesTable properties={mention.properties} />
                </Grid.Column>
            </Grid>
        )
    }

    handleAction = (act: (payload?: {}) => void, action: string) => {
        if (!this.props.data || !this.props.data.corpus) {
            return
        }

        const c = this.props.data.corpus
        const m = c.mention
        if (action === ENTITY_VIEW && m.entityId) {
            act({
                datasetId: c.id,
                entityId: m.entityId
            })
        }
    }
}

export default EntityView
