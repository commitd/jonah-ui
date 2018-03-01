import * as React from 'react'
import { Card } from 'invest-components'
import { Button, Divider } from 'semantic-ui-react'

export type Props = {
    editing: boolean
    onEdit?(): void
    onDelete?(): void
    onReset?(): void
    onSave?(): void

}

export default class SidePanel extends React.Component<Props> {

    render() {
        const { editing, onSave, onEdit, onDelete, onReset } = this.props

        return (
            <Card>
                <Button.Group>
                    {editing && onSave && <Button positive={true} content="Save" icon="save" onClick={onSave} />}
                    {!editing && onEdit && <Button content="Edit" icon="edit" onClick={onEdit} />}
                    {editing && onReset && <Button content="Reset" icon="refresh" onClick={onReset} />}
                </Button.Group>
                <Divider hidden={true} />
                <Button.Group>
                    {onDelete && <Button negative={true} content="Delete" icon="remove" onClick={onDelete} />}
                </Button.Group>
            </Card>
        )
    }
}