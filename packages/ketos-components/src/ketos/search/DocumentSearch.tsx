import * as React from 'react'
import { DocumentSearch, DocumentFilter, RelationFilter, MentionFilter, EntityFilter } from '../../types'
import DocumentFilterForm from './DocumentFilter'
import { SearchButton } from 'invest-components'
import { Form, Divider, Tab } from 'semantic-ui-react'
import MentionFilterForm from './MentionFilter'
import EntityFilterForm from './EntityFilter'
import RelationFilterForm from './RelationFilter'

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
                <Divider horizontal={true} content="Including..." />
                <Tab panes={this.renderIncludes(search || {})} />
                <Divider hidden={true} />
                <SearchButton onSubmit={this.handleSubmit} />
            </Form>
        )
    }

    private renderIncludes = (search: DocumentSearch) => {
        const mentionFilter = search.mentionFilters != null && search.mentionFilters.length > 0
            ? search.mentionFilters[0] : {}
        const entityFilter = search.entityFilters != null && search.entityFilters.length > 0
            ? search.entityFilters[0] : {}
        const relationFilter = search.relationFilters != null && search.relationFilters.length > 0
            ? search.relationFilters[0] : {}

        return [
            {
                menuItem: 'Mention', render: () => (
                    <Tab.Pane>
                        <MentionFilterForm
                            filter={mentionFilter}
                            onChange={this.handleMentionFilterChange}
                        />
                    </Tab.Pane>
                )
            },
            {
                menuItem: 'Entity', render: () => (
                    <Tab.Pane>
                        <EntityFilterForm
                            filter={entityFilter}
                            onChange={this.handleEntityFilterChange}
                        />
                    </Tab.Pane>
                )
            },
            {
                menuItem: 'Relation', render: () => (
                    <Tab.Pane>
                        <RelationFilterForm
                            filter={relationFilter}
                            onChange={this.handleRelationFilterChange}
                        />
                    </Tab.Pane>
                )
            }
        ]
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

    private handleMentionFilterChange = (filter?: MentionFilter) => {
        this.setState({
            mentionFilters: filter != null ? [filter] : []
        })
    }

    private handleEntityFilterChange = (filter?: EntityFilter) => {
        this.setState({
            entityFilters: filter != null ? [filter] : []
        })
    }

    private handleRelationFilterChange = (filter?: RelationFilter) => {
        this.setState({
            relationFilters: filter != null ? [filter] : []
        })
    }
}
