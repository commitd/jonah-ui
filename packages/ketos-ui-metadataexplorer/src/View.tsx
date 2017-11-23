import * as React from 'react'
import { Grid } from 'semantic-ui-react'
import { MetadataCountTable } from 'ketos-components'
import MetadataValues from './components/MetadataValuesContainer'

type OwnProps = {
    datasetId: string
    metadataCounts: {
        key: string
        count: number
    }[]
}

type Props = OwnProps

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
        const { datasetId, metadataCounts } = this.props
        const { selectedKey } = this.state

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