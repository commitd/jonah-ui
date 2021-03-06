import * as React from 'react'
import { Form, Button, InputOnChangeData, Segment, Divider } from 'semantic-ui-react'
import { MentionFilter } from '../../types'
import PropertiesFilter from './PropertiesFilter'
import { PropertiesMap } from 'invest-types'

export type Props = {
    advanced?: boolean
    filter: MentionFilter,
    onChange(filter: MentionFilter): void
}

export type State = {
    showAdvanced: boolean
}

// TODO:
//  - within?
//  - start/end timestamp on info
//  - properties

export default class MentionFilterForm extends React.Component<Props, State> {

    state: State = {
        showAdvanced: false
    }

    render() {
        const { filter } = this.props

        const propsDefineAdvanced = this.props.advanced != null
        const advanced = propsDefineAdvanced ? this.props.advanced : this.state.showAdvanced

        return (
            <div>
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
                {advanced && this.renderAdvanced(filter, advanced)}
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
            </div>
        )
    }

    // These handle functions are bit like a poor man's immutable

    private handleChange = (e: React.SyntheticEvent<{}>, data: InputOnChangeData, ) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            [data.name]: data.value !== '' ? data.value : undefined
        }))
    }

    private renderAdvanced = (filter: MentionFilter, advanced: boolean) => {
        return (
            <Segment>
                <Form.Input
                    fluid={true}
                    placeholder="Sub type"
                    name="subType"
                    value={filter.subType || ''}
                    onChange={this.handleChange}
                />
                <Divider horizontal={true} content="Properties" />
                <PropertiesFilter filter={filter.properties} onChange={this.handlePropertiesChange} />
            </Segment>
        )
    }

    private toggleAdvanced = () => {
        this.setState(state => ({
            showAdvanced: !state.showAdvanced
        }))
    }

    private handlePropertiesChange = (propertiesMap: PropertiesMap) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            properties: propertiesMap
        }))
    }
}