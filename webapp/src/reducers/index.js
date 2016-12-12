import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { target } from './target'
import {auth } from './auth'
import { topTrendEvent, topSpecialEvent, topLatestEvent } from './event'

import todoReducer from '../flux/modules/todo'

const rootReducer = combineReducers({
  auth,
  target,
  topTrendEvent,
  topLatestEvent,
  topSpecialEvent,
  todo: todoReducer,
  routing
})

export default rootReducer
