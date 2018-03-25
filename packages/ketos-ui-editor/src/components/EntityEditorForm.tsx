import * as React from 'react'
import { Form, Divider, Table, InputOnChangeData } from 'semantic-ui-react'
import { Entity } from './EntityEditorDataContainer'
import PropertiesEditor from './common/PropertiesEditor'
import { PropertiesMap } from 'invest-types'
import update from 'immutability-helper'

export type Props = {
    item?: Entity
    edit?: boolean
    onChange?(item: Entity): void
}

export default class EntityEditorForm extends React.Component<Props> {

    render() {
        const { item } = this.props

        if (!item) {
            return <p>Not found</p>
        }

        const edit = this.props.edit || false

        return (
            <Form>
                <Table definition={true}>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Entity id</Table.Cell>
                            <Table.Cell>{item.id}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Document id</Table.Cell>
                            <Table.Cell>{item.docId}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Divider horizontal={true} section={true} />
                <Form.Input
                    name="type"
                    label="Type"
                    value={item.type || ''}
                    onChange={this.handleChange}
                    readOnly={!edit}
                />
                <Form.Input
                    name="subType"
                    label="Sub type"
                    value={item.subType || ''}
                    onChange={this.handleChange}
                    readOnly={!edit}
                />
                <Form.Input
                    name="value"
                    label="Value"
                    value={item.value || ''}
                    onChange={this.handleChange}
                    readOnly={!edit}
                />
                <Divider horizontal={true} content="Properties" section={true} />
                <PropertiesEditor
                    properties={item.properties}
                    ignore={['type', 'subType', 'value']}
                    edit={edit}
                    onChange={this.handlePropertiesChanged}
                />
            </Form>
        )
    }

    private handleChange = (e: {}, data: InputOnChangeData) => {
        if (this.props.item && this.props.onChange) {
            const value = data.value
            const name = data.name

            let updated = update(this.props.item || {}, { $merge: { [name]: value } })

            // If these have changed also change the property
            if (name === 'type' || name === 'subType' || name === 'value') {
                const properties = update(updated.properties || {}, { $merge: { [name]: value } })
                updated = update(updated, { $merge: { properties: properties } })
            }

            this.props.onChange(updated)

        }
    }

    private handlePropertiesChanged = (properties: PropertiesMap) => {
        if (this.props.item && this.props.onChange) {
            this.props.onChange(
                update(this.props.item || {}, { $merge: { properties: properties } })
            )
        }
    }

}