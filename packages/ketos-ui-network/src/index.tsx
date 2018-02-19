import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

import './index.css'
import 'semantic-ui-offline/semantic.min.css'

import { InvestUiPlugin } from 'invest-plugin'
import { PluginLifecycle } from 'invest-common'
import { Handler } from 'invest-rpc'
import { loggerFactory } from 'invest-utils'

const handlerLogger = loggerFactory.getLogger('Handler')

const handler: Handler<PluginLifecycle> = {
  onLoad: () => {
    handlerLogger.info('Loaded')
  },
  onUnload: () => {
    handlerLogger.info('Unloaded')
  },
  onAction: (action: string, payload?: {}) => {
    handlerLogger.info('Received action:' + action)
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
