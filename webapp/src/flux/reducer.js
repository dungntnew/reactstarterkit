import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import topEventReducer from './modules/top_event'
import targetReducer from './modules/target'
import authReducer from './modules/auth'
import viewPortReducer from './modules/viewport'

const rootReducer = combineReducers({
  auth: authReducer,
  target: targetReducer,
  topEvent: topEventReducer,
  viewPort: viewPortReducer,
  routing
})

export default rootReducer
