import * as React from 'react'
import { PropertiesMap } from 'invest-types'
import { Form } from 'semantic-ui-react'
import update from 'immutability-helper'

export type Props = {
    properties: PropertiesMap
    edit: boolean
    onChange(properties: PropertiesMap): void
}

export default class PropertiesEditor extends React.Component<Props> {

    render() {
        const { properties, edit } = this.props
        const readOnly = !edit

        const keys = properties == null ? [] : Object.keys(properties)

        // NOTE: Key ordering is probably a messy in javascript

        return (
            <React.Fragment>
                {keys.map((k, i) =>
                    this.renderProperty(i, k, properties[k], edit)
                )}
                {edit && <Form.Button
                    icon="add"
                    content="Add"
                    onClick={this.handleAdd}
                    disabled={readOnly}
                    positive={true}
                />}

            </React.Fragment>
        )
    }

    private renderProperty = (index: number, key: string, value: {}, edit: boolean) => {
        return (
            <Form.Group key={`${index}_${key}`} inline={true} >
                <Form.Input
                    label="Key"
                    value={key || ''}
                    onChange={(e, data) => this.handleKeyChanged(data.value)}
                    readOnly={!edit}
                    width={6}
                />
                <Form.Input
                    label="Value"
                    value={value || ''}
                    onChange={(e, data) => this.handleValueChanged(key, data.value)}
                    readOnly={!edit}
                    width={8}
                />
                {edit && <Form.Button
                    width={2}
                    negative={true}
                    icon="remove"
                    content="Remove"
                    onClick={() => this.handleRemove(key)}
                    disabled={!edit}
                />}
            </Form.Group>
        )
    }

    private handleAdd = () => {
        this.props.onChange(
            update(this.props.properties || {}, { $merge: { '': '' } })
        )
    }

    private handleRemove = (key: string) => {
        this.props.onChange(
            update(this.props.properties || {}, { $unset: [key] })
        )
    }

    private handleKeyChanged = (key: string) => {
        const v = this.props.properties ? this.props.properties[key] : ''
        this.props.onChange(
            update(this.props.properties || {}, { $merge: { [key]: v } })
        )
    }

    private handleValueChanged = (key: string, value: {}) => {
        this.props.onChange(
            update(this.props.properties || {}, { $merge: { [key]: value } })
        )
    }

}