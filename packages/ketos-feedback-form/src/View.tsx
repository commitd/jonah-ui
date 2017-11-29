import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
type OwnProps = {
    data: {
        type: string,
        subject: string,
        comment: string,
        pluginId?: string
    }
    plugins: {
        id: string
        name: string
    }[]
    onSubmit(): void
    onChange(name: string, value: string): void

}

type Props = OwnProps

class View extends React.Component<Props> {

    handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        this.props.onSubmit()
    }

    handleChange = (e: {}, { name, value }: { name: string, value: string }) => {
        this.props.onChange(name, value)
    }

    render() {
        const { data, plugins } = this.props

        const typeOptions = [
            { key: 'bug', text: 'Bug', value: 'bug' },
            { key: 'feature', text: 'Suggestion', value: 'feature' },
            { key: 'comment', text: 'Comment', value: 'comment' },
        ]

        const pluginOptions = [
            { key: 'general', text: 'General', value: 'none' }
        ].concat(plugins.map(p => ({ key: p.id, text: p.name, value: p.id })))

        return (
            <Form onSubmit={this.handleSubmit} >
                <Form.Select
                    name="type"
                    label="Type"
                    onChange={this.handleChange}
                    options={typeOptions}
                    value={data.type}
                />
                <Form.Select
                    name="pluginId"
                    label="Area"
                    onChange={this.handleChange}
                    options={pluginOptions}
                    value={data.pluginId}
                />
                <Form.Input
                    name="subject"
                    label="Subject"
                    onChange={this.handleChange}
                    placeholder="Short title"
                    value={data.subject}
                />
                <Form.TextArea
                    name="comment"
                    label="Comment"
                    onChange={this.handleChange}
                    value={data.comment}
                />
                <Button
                    type="submit"
                    content="Send"
                    icon="send"
                    disabled={!data.comment}
                />
            </Form>
        )
    }
}

export default View