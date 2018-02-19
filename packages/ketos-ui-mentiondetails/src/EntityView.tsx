import * as React from 'react'
import { Header } from 'semantic-ui-react'
import MentionsSnippets from './components/MentionsSnippets'
import EntityMentionAliases from './components/EntityMentionAliases'
import MentionProperties from './components/MentionProperties'
import RelatedMentionsTable from './components/RelatedMentionsTable'
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

        const entity = data.corpus.entity

        if (entity == null) {
            return <p>Not found</p>
        }

        return (
            <div>
                <Header as="h1">{entity.type} Entity: {entity.value}</Header>
                <Header sub={true}>
                    Mentioned as:&nbsp;
                    <EntityMentionAliases mentions={entity.mentions} />
                </Header>
                <Header as="h3" content="Properties" />
                <MentionProperties mentions={entity.mentions} />
                <Header as="h3" content="Document snippets" />
                <MentionsSnippets
                    mentions={entity.mentions}
                    content={entity.document.content}
                    datasetId={data.corpus.id}
                    documentId={entity.document.id}
                />

                <Header as="h3" content="Related entities" />
                <RelatedMentionsTable mentions={entity.mentions} datasetId={data.corpus.id} />
            </div>
        )
    }

}

export default EntityView
