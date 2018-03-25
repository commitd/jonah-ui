import * as React from 'react'
import EditorSidePanel from './EditorSidePanel'
import { ChildProps } from 'react-apollo'
import { Grid, Message, Icon } from 'semantic-ui-react'

export type EditorFormProps<R, T> = {
    edit: boolean,
    response: Partial<R>
    item: T,
    onChange(item: T): void,
}

export type Props<R, T> = ChildProps<{
    children: React.ReactElement<EditorFormProps<R, T>>
    edit: boolean,
    onDelete(item: T): Promise<boolean>,
    onSave(item: T): Promise<boolean>,
    dataToItem(data?: Partial<R>): T | undefined
}, R>

export type State<T> = {
    forceEdit: boolean
    item: T | undefined

    showSuccess: boolean
    showError: boolean
    message: string
    showProgress: boolean
}

export default class EditorView<R, T> extends React.Component<Props<R, T>, State<T>> {

    state: State<T> = {
        forceEdit: false,
        item: undefined,

        showSuccess: false,
        showError: false,
        message: '',
        showProgress: false
    }

    componentWillMount() {
        this.updateFromProps(this.props)
    }

    componentWillReceiveProps(nextProps: Props<R, T>) {
        if (nextProps.data && nextProps.data !== this.props.data) {
            this.updateFromProps(nextProps)
        }
    }

    render() {
        const { edit, } = this.props
        const { item, forceEdit, showSuccess, showError, showProgress, message } = this.state

        if (!item) {
            return (
                <Message negative={showError} icon={true}>
                    <Icon name="question" loading={false} />
                    <Message.Content>
                        <Message.Header>Not found</Message.Header>
                        <p>Unable to find a data item which matches the details provided.
                    Maybe it has already been deleted?</p>
                    </Message.Content>
                </Message>
            )
        }

        const editing = forceEdit || edit

        const child = React.Children.only(this.props.children) as React.ReactElement<EditorFormProps<R, T>>
        const response = this.props.data as Partial<R>

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        {React.cloneElement(child, {
                            edit: editing,
                            item,
                            response,
                            onChange: this.handleChange
                        })}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <EditorSidePanel
                            editing={editing}
                            onDelete={this.handleDelete}
                            onReset={this.handleReset}
                            onSave={this.handleSave}
                            onEdit={this.handleEditMode}
                        />

                        {(showSuccess || showError || showProgress) &&
                            <Message negative={showError} positive={showSuccess} warning={showProgress} icon={true}>
                                {showSuccess && <Icon name="check" loading={false} />}
                                {showError && <Icon name="warning sign" loading={false} />}
                                {showProgress && <Icon name="spinner" loading={true} />}

                                <Message.Content>
                                    {message}
                                </Message.Content>
                            </Message>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    private updateFromProps = (props: Props<R, T>) => {
        this.setState({
            forceEdit: false,
            item: props.dataToItem(props.data)
        })

    }

    private handleEditMode = () => {
        this.setState({
            forceEdit: true
        })
    }

    private handleChange = (item: T) => {
        this.setState({
            item: item
        })
    }

    private handleReset = () => {
        this.updateFromProps(this.props)
    }

    private handleSave = () => {
        if (this.state.item) {
            this.setState({
                showSuccess: false,
                showProgress: true,
                showError: false,
                message: 'Saving...'
            })

            this.props.onSave(this.state.item)
                .then(b => {
                    this.setState({
                        showSuccess: b,
                        showProgress: false,
                        showError: !b,
                        message: b ? 'Saved successfully' : 'Error occurred saving'
                    })

                    // update from server
                    if (this.props.data) {
                        this.props.data.refetch()
                    }
                })
        }

    }

    private handleDelete = () => {
        if (this.state.item) {
            this.setState({
                showSuccess: false,
                showProgress: true,
                showError: false,
                message: 'Deleting...'
            })

            this.props.onDelete(this.state.item).then(b => {
                this.setState({
                    showSuccess: b,
                    showProgress: false,
                    showError: !b,
                    message: b ? 'Deleted successfully' : 'Error occurred deleting'
                })

            })
        }
    }

}