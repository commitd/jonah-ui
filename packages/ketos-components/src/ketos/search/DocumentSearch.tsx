import * as React from 'react'
import { DocumentSearch, DocumentFilter } from '../../types'
import DocumentFilterForm from './DocumentFilter'
import { SearchButton } from 'invest-components'
import { Form } from 'semantic-ui-react'

export type Props = {
    search?: DocumentSearch,
    onSearch?(search: DocumentSearch): void
}

export type State = DocumentSearch

// TODO: entities, relation and mentions filter. You should pick which are on and off by props.

export default class DocumentSearchForm extends React.Component<Props, State> {

    state: State = {

    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.search !== nextProps.search) {
            const newSearch = nextProps.search != null ? nextProps.search : {}
            this.setState(newSearch)
        }
    }

    render() {
        const search = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <DocumentFilterForm filter={search.documentFilter || {}} onChange={this.handleDocumentFilter} />
                <SearchButton onSubmit={this.handleSubmit} />
            </Form>
        )
    }

    private handleSubmit = () => {
        if (this.props.onSearch) {
            this.props.onSearch(this.state)
        }
    }

    private handleDocumentFilter = (filter: DocumentFilter) => {
        this.setState({
            documentFilter: filter
        })
    }
}
