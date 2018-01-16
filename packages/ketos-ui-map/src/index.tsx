import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import 'semantic-ui-css/semantic.min.css'
import 'leaflet/dist/leaflet.css'

import { InvestUiPlugin } from 'invest-plugin'
import { PluginLifecycle } from 'invest-common'
import { Handler } from 'invest-rpc'
import { loggerFactory } from 'invest-utils'

// Fix for Leaflet data urls which result from WebPack
// https://github.com/Leaflet/Leaflet/issues/4968
import { Icon, Marker } from 'leaflet'
const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png')
const iconUrl = require('leaflet/dist/images/marker-icon.png')
const shadowUrl = require('leaflet/dist/images/marker-shadow.png')
Icon.Default.imagePath = ''
Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
})
Marker.prototype.options.icon = new Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

const handlerLogger = loggerFactory.getLogger('Handler')

const handler: Handler<PluginLifecycle> = {
  onLoad: () => {
    handlerLogger.info('Loaded')
  },
  onUnload: () => {
    handlerLogger.info('Unloaded')
  },
  onAction: (action: string, payload?: {}) => {
    handlerLogger.info('Recieved action:' + action)
  },
  onShow: () => {
    handlerLogger.info('Shown')
  },
  onHide: () => {
    handlerLogger.info('Hide')
  },
}

ReactDOM.render(
  <InvestUiPlugin handler={handler} fullscreen={true}>
    <App />
  </InvestUiPlugin>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
