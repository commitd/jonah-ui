import * as React from 'react'
import { EntityFilter, EntitySearch } from '../../types'
import EntityFilterForm from './EntityFilter'
import { SearchButton } from 'invest-components'
import { Form } from 'semantic-ui-react'

export type Props = {
    search?: EntitySearch,
    onSearch?(search: EntitySearch): void
}

export type State = EntitySearch

export default class EntitySearchForm extends React.Component<Props, State> {

    state: State = {
        entityFilter: {}
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.search !== nextProps.search) {
            const newSearch = nextProps.search != null ? nextProps.search : { entityFilter: {} }
            this.setState(newSearch)
        }
    }

    render() {
        const search = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <EntityFilterForm filter={search.entityFilter || {}} onChange={this.handleFilterChange} />
                <SearchButton onSubmit={this.handleSubmit} />
            </Form>
        )
    }

    private handleSubmit = () => {
        if (this.props.onSearch) {
            this.props.onSearch(this.state)
        }
    }

    private handleFilterChange = (filter: EntityFilter) => {
        this.setState({
            entityFilter: filter
        })
    }
}
