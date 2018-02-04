import * as React from 'react'
import { Button } from 'semantic-ui-react'

export type SearchButtonProps = {
    onSubmit(): void
}

class SearchButton extends React.Component<SearchButtonProps> {

    render() {
        return (
            <Button labelPosition="left" icon="search" content="Search" onClick={this.props.onSubmit} />
        )
    }
}

export default SearchButton