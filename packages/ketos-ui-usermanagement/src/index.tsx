import { PluginLifecycle } from 'invest-common'
import { InvestUiPlugin } from 'invest-plugin'
import { Handler } from 'invest-rpc'
import { loggerFactory } from 'invest-utils'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'semantic-ui-offline/semantic.min.css'
import App from './App'
import './index.css'

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
    }
}

ReactDOM.render(
    <InvestUiPlugin handler={handler} fullscreen={false}>
        <App />
    </InvestUiPlugin>,
    document.getElementById('root') as HTMLElement
)
