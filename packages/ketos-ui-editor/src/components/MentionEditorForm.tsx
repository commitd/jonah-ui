import * as React from 'react'
import { Form, Divider, Table, InputOnChangeData } from 'semantic-ui-react'
import { Mention } from './MentionEditorDataContainer'
import PropertiesEditor from './common/PropertiesEditor'
import { PropertiesMap } from 'invest-types'
import update from 'immutability-helper'

export type Props = {
    item?: Mention
    edit?: boolean
    onChange?(item: Mention): void
}

export default class MentionEditorForm extends React.Component<Props> {

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
                            <Table.Cell>Mention id</Table.Cell>
                            <Table.Cell>{item.id}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Entity id</Table.Cell>
                            <Table.Cell>{item.entityId}</Table.Cell>
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
                <Form.Input
                    name="begin"
                    label="Begin"
                    value={item.begin}
                    onChange={this.handleChange}
                    readOnly={!edit}
                />
                <Form.Input
                    name="end"
                    label="End"
                    value={item.end}
                    onChange={this.handleChange}
                    readOnly={!edit}
                />
                <Divider horizontal={true} content="Properties" section={true} />
                <PropertiesEditor properties={item.properties} edit={edit} onChange={this.handlePropertiesChanged} />
            </Form>
        )
    }

    private handleChange = (e: {}, data: InputOnChangeData) => {
        if (this.props.item && this.props.onChange) {
            this.props.onChange(update(this.props.item || {}, { $merge: { [data.name]: data.value } }))
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