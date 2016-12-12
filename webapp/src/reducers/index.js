import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import { target } from './target'
import {auth } from './auth'

import topEventReducer from '../flux/modules/top_event'

const rootReducer = combineReducers({
  auth,
  target,
  topEvent: topEventReducer,
  routing
})

export default rootReducer
