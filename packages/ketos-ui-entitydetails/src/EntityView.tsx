import * as React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { MentionSnippets, MentionAliases, PropertiesTable } from 'ketos-components'
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
            <Grid>
                <Grid.Column width={12}>
                    <Header as="h1">{entity.value}</Header>
                    <Header as="h2">{entity.type}</Header>
                    <Header sub={true}>
                        Mentioned as:&nbsp;
                        <MentionAliases mentions={entity.mentions} />
                    </Header>
                    <Header as="h3" content="Snippets" />
                    <MentionSnippets
                        datasetId={data.corpus.id}
                        documentId={entity.document.id}
                        mentions={entity.mentions}
                        content={entity.document.content}
                    />
                </Grid.Column >

                <Grid.Column width={4}>
                    <Header as="h3" content="Properties" />
                    <PropertiesTable properties={entity.properties} />
                </Grid.Column >

            </Grid>
        )
    }

}

export default EntityView
