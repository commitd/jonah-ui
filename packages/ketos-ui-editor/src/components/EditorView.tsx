import * as React from 'react'
import EditorSidePanel from './SidePanel'
import { ChildProps } from 'react-apollo'
import { Grid } from 'semantic-ui-react'

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
}

export default class EditorView<R, T> extends React.Component<Props<R, T>, State<T>> {

    state: State<T> = {
        forceEdit: false,
        item: undefined
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
        const { edit } = this.props
        const { item, forceEdit } = this.state

        if (!item) {
            return <p>Not found</p>
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
            this.props.onSave(this.state.item).then(b => {
                // update from server
                if (this.props.data) {
                    this.props.data.refetch()
                }
            })
        }

    }

    private handleDelete = () => {
        if (this.state.item) {
            this.props.onDelete(this.state.item)
        }
    }

}