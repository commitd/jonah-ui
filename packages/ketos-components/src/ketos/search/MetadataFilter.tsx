import * as React from 'react'
import { Form, Button, InputOnChangeData } from 'semantic-ui-react'
import { PropertiesList } from 'invest-types'
import update from 'immutability-helper'

export type Props = {
    filter?: PropertiesList,
    onChange(filter: PropertiesList): void
}

export type State = {
    newKey: string,
    newValue: string
}

export default class MetadataFilterForm extends React.Component<Props, State> {

    state: State = {
        newKey: '',
        newValue: ''
    }

    render() {
        const { filter } = this.props
        const { newKey, newValue } = this.state

        const safeFilter = filter || []
        return (
            <React.Fragment>
                {
                    safeFilter.map((p, i) => {
                        return <Form.Group widths="equal" key={`{${p.value}}_${p.value}`}>
                            <Form.Input
                                fluid={true}
                                placeholder="Key"
                                name="newKey"
                                value={p.key}
                                readOnly={true}
                            />
                            <Form.Input
                                fluid={true}
                                placeholder="Value"
                                name="newValue"
                                value={p.value}
                                readOnly={true}

                            />
                            <Button
                                icon="remove"
                                content="Remove"
                                negative={true}
                                onClick={this.handleRemove(i)}
                            />
                        </Form.Group>
                    })
                }
                <Form.Group widths="equal">
                    <Form.Input
                        fluid={true}
                        placeholder="Key"
                        name="newKey"
                        value={newKey || ''}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid={true}
                        placeholder="Value"
                        name="newValue"
                        value={newValue || ''}
                        onChange={this.handleChange}
                    />
                    <Button
                        icon="plus"
                        content="Add"
                        positive={true}
                        disabled={newValue === '' || newKey === ''}
                        onClick={this.handleAdd}
                    />
                </Form.Group>
            </React.Fragment>
        )
    }

    private handleChange = (e: React.SyntheticEvent<{}>, data: InputOnChangeData, ) => {
        this.setState({
            [data.name]: data.value
        })
    }

    private handleRemove = (i: number) => (e: React.SyntheticEvent<{}>) => {
        e.preventDefault()

        const properties = update(this.props.filter || [], { $splice: [[i, 1]] })
        this.props.onChange([...properties])

    }

    private handleAdd = (e: React.SyntheticEvent<{}>) => {
        e.preventDefault()

        const properties = update(
            this.props.filter || [],
            {
                $push: [{ key: this.state.newKey, value: this.state.newValue }]
            })
        this.props.onChange([...properties])

        this.setState({
            newKey: '',
            newValue: ''
        })
    }

}