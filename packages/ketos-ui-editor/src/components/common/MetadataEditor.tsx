import * as React from 'react'
import { Metadata } from 'ketos-components'
import { Form } from 'semantic-ui-react'
import update from 'immutability-helper'

export type Props = {
    metadata: Metadata[]
    edit: boolean
    onChange(metadata: ReadonlyArray<Metadata>): void
}

export default class MetadataEditor extends React.Component<Props> {

    render() {
        const { edit } = this.props
        const readOnly = !edit

        const metadata = this.props.metadata ? this.props.metadata : []

        return (
            <React.Fragment>
                {metadata.map((v, i) => (
                    <Form.Group key={i} inline={true}>
                        <Form.Input
                            label="Key"
                            value={v.key || ''}
                            onChange={(e, data) => this.handleKeyChanged(i, data.value)}
                            readOnly={readOnly}
                            width={6}

                        />
                        <Form.Input
                            label="Value"
                            value={v.value || ''}
                            onChange={(e, data) => this.handleValueChanged(i, data.value)}
                            readOnly={readOnly}
                            width={8}
                        />
                        {edit && <Form.Button
                            negative={true}
                            icon="remove"
                            content="Remove"
                            onClick={() => this.handleRemove(i)}
                            disabled={readOnly}
                            width={2}

                        />}
                    </Form.Group>
                ))}
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

    private handleAdd = () => {
        this.props.onChange(
            update(this.props.metadata || [], { $push: [{ key: '', value: '' }] })
        )
    }

    private handleRemove = (index: number) => {
        this.props.onChange(
            update(this.props.metadata || [], { $splice: [[index, 1]] })
        )
    }

    private handleKeyChanged = (index: number, key: string) => {
        const m = update(this.props.metadata[index], { $merge: { key: key } })
        this.props.onChange(
            update(this.props.metadata || [], { $merge: { [index]: m } })
        )
    }

    private handleValueChanged = (index: number, value: string) => {
        const m = update(this.props.metadata[index], { $merge: { value: value } })
        this.props.onChange(
            update(this.props.metadata || [], { $merge: { [index]: m } })
        )
    }

}