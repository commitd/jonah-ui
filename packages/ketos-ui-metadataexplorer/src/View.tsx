import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import { MetadataCountTable } from 'ketos-components'
import MetadataValues from './components/MetadataValuesContainer'
import { Response } from './DataContainer'

type Props = {
    data?: Response
}

type State = {
    selectedKey?: string
}

class View extends React.Component<Props, State> {

    state: State = {
        selectedKey: undefined
    }

    handleMetadataKey = (key?: string) => {
        this.setState({
            selectedKey: key
        })
    }

    render() {
        const { data, } = this.props
        const { selectedKey } = this.state

        if (!data || !data.corpus) {
            return 'No corpus to display'
        }

        const datasetId = data.corpus.id
        const metadataCounts = data.corpus.metadata.keys.bins

        return (
            <Grid>
                <Grid.Column width={6}>
                    <MetadataCountTable
                        onSelect={this.handleMetadataKey}
                        counts={metadataCounts}
                        selected={selectedKey}
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    {!selectedKey ?
                        <p> Select a key from the table</p>
                        :
                        <MetadataValues datasetId={datasetId} metadataKey={selectedKey} />
                    }
                </Grid.Column>
            </Grid >
        )
    }
}

export default View