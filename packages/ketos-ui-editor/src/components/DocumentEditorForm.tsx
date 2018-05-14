import update from 'immutability-helper'
import { PropertiesList } from 'invest-types'
import { Metadata } from 'ketos-components'
import * as React from 'react'
import { Divider, Form, Table } from 'semantic-ui-react'
import { Response } from './DocumentEditorDataContainer'
import { DocumentItem } from './EditableTypes'
import MetadataEditor from './common/MetadataEditor'
import PropertiesListEditor from './common/PropertiesListEditor'

export type Props = {
  item?: DocumentItem
  edit?: boolean
  response?: Response
  onChange?(item: DocumentItem): void
}

export default class DocumentEditorForm extends React.Component<Props> {
  render() {
    const { item, response } = this.props

    if (!item) {
      return <p>Not found</p>
    }

    const document = response && response.corpus && response.corpus.document

    const edit = this.props.edit || false

    return (
      <Form>
        <Table definition={true}>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Document id</Table.Cell>
              <Table.Cell>{item.id}</Table.Cell>
            </Table.Row>
            {document && (
              <React.Fragment>
                <Table.Row>
                  <Table.Cell>Title</Table.Cell>
                  <Table.Cell>{document.info.title}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Date</Table.Cell>
                  <Table.Cell>{document.info.date}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Summary</Table.Cell>
                  <Table.Cell>{document.summary}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Content length</Table.Cell>
                  <Table.Cell>{document.length}</Table.Cell>
                </Table.Row>
              </React.Fragment>
            )}
          </Table.Body>
        </Table>
        <Divider horizontal={true} content="Metadata" section={true} />
        <MetadataEditor metadata={item.metadata} edit={edit} onChange={this.handleMetadataChanged} />
        <Divider horizontal={true} content="Properties" section={true} />
        <PropertiesListEditor properties={item.propertiesList} edit={edit} onChange={this.handlePropertiesChanged} />
      </Form>
    )
  }

  private handlePropertiesChanged = (properties: PropertiesList) => {
    if (this.props.item && this.props.onChange) {
      this.props.onChange(update(this.props.item || {}, { $merge: { propertiesList: properties } }))
    }
  }

  private handleMetadataChanged = (metadata: Metadata[]) => {
    if (this.props.item && this.props.onChange) {
      this.props.onChange(update(this.props.item || {}, { $merge: { metadata: metadata } }))
    }
  }
}
