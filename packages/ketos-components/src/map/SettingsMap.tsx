import * as React from 'react'
import { SettingsMap } from 'invest-types'
import { ApplicationSettings } from 'invest-components'
import SimpleMap from './SimpleMap'
import { KETOS_MAP_URL, KETOS_MAP_ATTRIBUTION, Defaults } from '../Settings'

export type Props = {
    center?: {
        lat: number,
        lng: number,
    }
    zoom?: number
}

const defaultSettings = {
    [KETOS_MAP_ATTRIBUTION]: Defaults.KETOS_MAP_ATTRIBUTION,
    [KETOS_MAP_URL]: Defaults.KETOS_MAP_URL
}

class MapFromApplicationSettings extends React.Component<Props & {
    settings: SettingsMap
}> {
    render() {
        const { settings } = this.props
        const { center, zoom } = this.props

        const url = settings[KETOS_MAP_URL] as string
        const attribution = settings[KETOS_MAP_ATTRIBUTION] as string

        return (
            <SimpleMap
                url={url}
                attribution={attribution}
                center={center}
                zoom={zoom}
            >
                {
                    this.props.children
                }
            </SimpleMap>
        )
    }
}

export default class SettingsMapWrapper extends React.Component<Props> {
    render() {
        return (
            <ApplicationSettings defaultSettings={defaultSettings}>
                <MapFromApplicationSettings {...this.props} settings={defaultSettings} />
            </ApplicationSettings>
        )
    }
}
