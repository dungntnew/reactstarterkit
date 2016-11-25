
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

const users = (state = {users: {}}, action) => (state)

const rootReducer = combineReducers({
  users,
  routing
})

export default rootReducer
