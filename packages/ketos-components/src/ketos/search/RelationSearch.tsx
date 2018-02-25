import * as React from 'react'
import { RelationFilter, RelationSearch } from '../../types'
import RelationFilterForm from './RelationFilter'
import { SearchButton } from 'invest-components'
import { Form } from '../../../../../../../vessel-js/node_modules/semantic-ui-react'

export type Props = {
    search?: RelationSearch,
    onSearch?(search: RelationSearch): void
}

export type State = RelationSearch

export default class RelationSearchForm extends React.Component<Props, State> {

    state: State = {
        relationFilter: {},
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.search !== nextProps.search) {
            const newSearch = nextProps.search != null ? nextProps.search : { relationFilter: {} }
            this.setState(newSearch)
        }
    }

    render() {
        const search = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <RelationFilterForm filter={search.relationFilter || {}} onChange={this.handleFilterChange} />
                <SearchButton onSubmit={this.handleSubmit} />
            </Form>
        )
    }

    private handleSubmit = () => {
        if (this.props.onSearch) {
            this.props.onSearch(this.state)
        }
    }

    private handleFilterChange = (filter: RelationFilter) => {
        this.setState({
            relationFilter: filter
        })
    }
}
