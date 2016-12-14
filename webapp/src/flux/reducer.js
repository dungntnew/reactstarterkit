import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import topEventReducer from './modules/top_event'
import createEventReducer from './modules/create_event'
import targetReducer from './modules/target'
import authReducer from './modules/auth'

const rootReducer = combineReducers({
  auth: authReducer,
  target: targetReducer,
  topEvent: topEventReducer,
  newEvent: createEventReducer,
  routing
})

export default rootReducer
