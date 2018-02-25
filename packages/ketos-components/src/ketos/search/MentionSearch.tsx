import * as React from 'react'
import { MentionFilter, MentionSearch } from '../../types'
import MentionFilterForm from './EntityFilter'
import { SearchButton } from 'invest-components'
import { Form } from '../../../../../../../vessel-js/node_modules/semantic-ui-react'

export type Props = {
    search?: MentionSearch,
    onSearch?(search: MentionSearch): void
}

export type State = MentionSearch

export default class MentionSearchForm extends React.Component<Props, State> {

    state: State = {
        mentionFilter: {}
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.search !== nextProps.search) {
            const newSearch = nextProps.search != null ? nextProps.search : { mentionFilter: {} }
            this.setState(newSearch)
        }
    }

    render() {
        const search = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <MentionFilterForm filter={search.mentionFilter || {}} onChange={this.handleFilterChange} />
                <SearchButton onSubmit={this.handleSubmit} />
            </Form>
        )
    }

    private handleSubmit = () => {
        if (this.props.onSearch) {
            this.props.onSearch(this.state)
        }
    }

    private handleFilterChange = (filter: MentionFilter) => {
        this.setState({
            mentionFilter: filter
        })
    }
}
