import * as React from 'react'
import { Form, Button, InputOnChangeData, Divider } from 'semantic-ui-react'
import { DocumentFilter } from '../../types'
import { PropertiesMap, PropertiesList } from 'invest-types'
import PropertiesFilter from './PropertiesFilter'
import MetadataFilter from './MetadataFilter'
const isEqual = require('lodash.isequal')

export type Props = {
    advanced?: boolean
    filter: DocumentFilter,
    onChange(filter: DocumentFilter): void
}

export type State = {
    showAdvanced: boolean
}

// TODO:
//  - start/end timestamp on info

export default class DocumentFilterForm extends React.Component<Props, State> {

    state: State = {
        showAdvanced: false
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.filter !== nextProps.filter || !isEqual(this.props.filter, nextProps.filter)) {
            if (nextProps.filter && (nextProps.filter.id || nextProps.filter.info 
                || nextProps.filter.metadata || nextProps.filter.properties)) {
                this.setState({showAdvanced: true})
            }
        }   
    }

    render() {
        const { filter } = this.props

        const propsDefineAdvanced = this.props.advanced != null
        const advanced = propsDefineAdvanced ? this.props.advanced : this.state.showAdvanced

        return (
            <div>
                <Form.Input
                    fluid={true}
                    placeholder="Query content"
                    name="content"
                    value={filter.content || ''}
                    onChange={this.handleChange}
                />
                {advanced && this.renderInfo(filter, advanced)}
                {!propsDefineAdvanced &&
                    <Button
                        floated="right"
                        as={'a'}
                        labelPosition="left"
                        icon={advanced ? 'chevron up' : 'chevron down'}
                        content={advanced ? 'Hide advanced' : 'Show Advanced'}
                        onClick={this.toggleAdvanced}
                    />
                }
            </div>
        )
    }

    // These handle functions are bit like a poor man's immutable

    private handleChange = (e: React.SyntheticEvent<{}>, data: InputOnChangeData, ) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            [data.name]: data.value !== '' ? data.value : undefined
        }))
    }

    private handleChildChange = (child: string) => (e: React.SyntheticEvent<{}>, data: InputOnChangeData) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            [child]: Object.assign({}, this.props.filter[child], {
                [data.name]: data.value !== '' ? data.value : undefined
            })
        }))
    }

    private handleIdChange = (e: React.SyntheticEvent<{}>, data: InputOnChangeData): void => {
        this.props.onChange(Object.assign({}, this.props.filter, {id: data.value}))
    }

    private renderInfo = (filter: DocumentFilter, advanced: boolean) => {
        const handleInfoChange = this.handleChildChange('info')

        return (
            <React.Fragment>
                <Divider horizontal={true} content="Document ID" />
                <Form.Input
                    fluid={true}
                    placeholder="Document ID"
                    name="id"
                    value={filter.id || ''}
                    onChange={this.handleIdChange}
                />
                <Divider horizontal={true} content="Document info" />
                <Form.Input
                    fluid={true}
                    placeholder="Document type"
                    name="type"
                    value={filter.info && filter.info.type || ''}
                    onChange={handleInfoChange}
                />
                <Form.Input
                    fluid={true}
                    placeholder="Document source"
                    name="source"
                    value={filter.info && filter.info.source || ''}
                    onChange={handleInfoChange}
                />
                <Form.Input
                    fluid={true}
                    placeholder="Document language"
                    name="language"
                    value={filter.info && filter.info.language || ''}
                    onChange={handleInfoChange}
                />
                <Form.Input
                    fluid={true}
                    placeholder="Document published ids"
                    name="publishedId"
                    value={filter.info && filter.info.publishedId || ''}
                    onChange={handleInfoChange}
                />
                <Form.Input
                    fluid={true}
                    placeholder="Document classification"
                    name="classification"
                    value={filter.info && filter.info.classification || ''}
                    onChange={handleInfoChange}
                />
                <Form.Input
                    fluid={true}
                    placeholder="Document caveats"
                    name="caveats"
                    value={filter.info && filter.info.caveats || ''}
                    onChange={handleInfoChange}
                />
                <Form.Input
                    fluid={true}
                    placeholder="Document releasability"
                    name="releasability"
                    value={filter.info && filter.info.releasability || ''}
                    onChange={handleInfoChange}
                />
                <Divider horizontal={true} content="Properties" />
                <PropertiesFilter filter={filter.properties} onChange={this.handlePropertiesChange} />
                <Divider horizontal={true} content="Metadata" />
                <MetadataFilter filter={filter.metadata} onChange={this.handleMetadataChange} />

            </React.Fragment>
        )
    }

    private toggleAdvanced = () => {
        this.setState(state => ({
            showAdvanced: !state.showAdvanced
        }))
    }

    private handlePropertiesChange = (propertiesMap: PropertiesMap) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            properties: propertiesMap
        }))
    }

    private handleMetadataChange = (metadata: PropertiesList) => {
        this.props.onChange(Object.assign({}, this.props.filter, {
            metadata: metadata
        }))
    }
}