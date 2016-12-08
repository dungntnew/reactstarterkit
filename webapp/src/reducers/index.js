import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { target } from './target'
import {auth } from './auth'
import { topTrendEvent, topSpecialEvent, topLatestEvent } from './event'


const rootReducer = combineReducers({
  auth,
  target,
  topTrendEvent,
  topLatestEvent,
  topSpecialEvent,
  routing
})

export default rootReducer
