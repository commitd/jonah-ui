import * as React from 'react'
import { PropertiesMap } from 'invest-types'
import { Form, Input, TextArea } from 'semantic-ui-react'
import update from 'immutability-helper'

export type Props = {
    properties: PropertiesMap
    edit: boolean
    ignore?: string[]
    onChange(properties: PropertiesMap): void

}

export default class PropertiesEditor extends React.Component<Props> {

    render() {
        const { properties, edit, ignore } = this.props
        const readOnly = !edit

        let keys = properties == null ? [] : Object.keys(properties).sort()

        if (ignore != null) {
            keys = keys.filter(k => !ignore.includes(k))
        }

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
            <Form.Group key={`${index}`} inline={true} >
                <Form.Input
                    label="Key"
                    value={key || ''}
                    onChange={(e, data) => this.handleKeyChanged(key, data.value)}
                    readOnly={!edit}
                    width={6}
                />
                {this.renderValue(key, value, edit)}
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

    private renderValue = (key: string, value: {}, edit: boolean) => {
        let control: {} = Input
        let formValue: {}
        let formType = 'text'
        let type = 'string'
        if (value instanceof Array || value instanceof Object) {
            control = TextArea
            type = 'json'
            formValue = JSON.stringify(value)
        } else if (typeof value === 'number'
            && (key === 'documentDate' || key === 'timestamp' || key === 'timestampStart' || key === 'timestampStop')) {
            const s = new Date(value as number).toISOString()
            formValue = s.substring(0, s.length - 1)
            formType = 'datetime-local'
            type = 'datetime'
        } else if (typeof value === 'number') {
            formType = 'number'
            formValue = value
            type = 'number'
        } else {
            formValue = value || ''
        }

        return (
            <Form.Field
                type={formType}
                control={control}
                label={type === 'json' ? <span>Value<br /><small>(Paste only)</small></span> : 'Value'}
                value={formValue}
                onChange={(e: {}, data: { value: {} }) => this.handleValueChanged(key, data.value, type)}
                readOnly={!edit
                }
                width={8}
            />
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

    private handleKeyChanged = (oldKey: string, key: string) => {
        const v = this.props.properties ? this.props.properties[oldKey] : ''
        const removed = update(this.props.properties || {}, { $unset: [oldKey] })
        const added = update(removed, { $merge: { [key]: v } })
        this.props.onChange(
            added
        )
    }

    private handleValueChanged = (key: string, newValue: {}, type: string) => {
        let value: {}
        switch (type) {
            case 'json':
                try {
                    value = JSON.parse(newValue as string)
                } catch (e) {
                    console.warn('Only copy and paste is supported')
                    return
                }
                break
            case 'datetime':
                value = new Date(newValue as string).getTime()
                break
            default:
                value = newValue
                break
        }

        this.props.onChange(
            update(this.props.properties || {}, { $merge: { [key]: value } })
        )
    }

}