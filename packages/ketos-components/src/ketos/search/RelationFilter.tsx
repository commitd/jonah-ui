import * as React from 'react'
import { Form, Button, InputOnChangeData, Segment, Header, Grid } from 'semantic-ui-react'
import { RelationFilter, MentionFilter } from '../../types'
import MentionFilterForm from './MentionFilter'

export type Props = {
    advanced?: boolean
    filter: RelationFilter,
    onChange(filter: RelationFilter): void
}

export type State = {
    showAdvanced: boolean
}

// TODO:
//  - properties

export default class RelationFilterForm extends React.Component<Props, State> {

    state: State = {
        showAdvanced: false
    }

    render() {
        const { filter } = this.props

        const propsDefineAdvanced = this.props.advanced != null
        const advanced = propsDefineAdvanced ? this.props.advanced : this.state.showAdvanced

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column >
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid={true}
                                    placeholder="Type"
                                    name="type"
                                    value={filter.type || ''}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid={true}
                                    placeholder="Value"
                                    name="value"
                                    value={filter.value || ''}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Grid.Column>
                    </Grid.Row>
                    {advanced && <Grid.Row>
                        <Grid.Column fluid={true}>
                            {this.renderAdvanced(filter, advanced)}
                        </Grid.Column>
                    </Grid.Row>}
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header sub={true}>Source mention</Header>
                            <MentionFilterForm
                                advanced={advanced}
                                filter={filter.source || {}}
                                onChange={this.handleSourceChanged}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Header sub={true}>Target mention</Header>
                            <MentionFilterForm
                                advanced={advanced}
                                filter={filter.target || {}}
                                onChange={this.handleTargetChanged}
                            />
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
                {
                    !propsDefineAdvanced &&
                    <Button
                        floated="right"
                        as={'a'}
                        labelPosition="left"
                        icon={advanced ? 'chevron up' : 'chevron down'}
                        content={advanced ? 'Hide advanced' : 'Show Advanced'}
                        onClick={this.toggleAdvanced}
                    />
                }

            </div >
        )
    }

    // These handle functions are bit like a poor man's immutable

    private handleChange = (e: React.SyntheticEvent<{}>, data: InputOnChangeData, ) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            [data.name]: data.value !== '' ? data.value : undefined
        }))
    }

    private renderAdvanced = (filter: RelationFilter, advanced: boolean) => {
        return (
            <Segment>
                <Form.Input
                    fluid={true}
                    placeholder="Sub type"
                    name="subType"
                    value={filter.subType || ''}
                    onChange={this.handleChange}
                />
            </Segment>
        )
    }

    private toggleAdvanced = () => {
        this.setState(state => ({
            showAdvanced: !state.showAdvanced
        }))
    }

    private handleSourceChanged = (filter: MentionFilter) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            source: filter
        }))
    }

    private handleTargetChanged = (filter: MentionFilter) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            target: filter
        }))
    }
}