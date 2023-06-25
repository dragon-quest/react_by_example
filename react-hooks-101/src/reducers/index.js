import { combineReducers } from 'redux'

import events from './events'
import operationLogs from './operationLog'

export default combineReducers({ events, operationLogs })
