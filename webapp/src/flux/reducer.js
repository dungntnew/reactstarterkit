import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import topEventReducer from './modules/top_event'
import createEventReducer from './modules/create_event'
import selectedEventReducer from './modules/selected_event'
import targetReducer from './modules/target'
import generReducer from './modules/gener'
import dressCodeReducer from './modules/dressCode'
import placeTypeReducer from './modules/placeType'
import supplementReducer from './modules/supplement'
import placeReducer from './modules/place'
import latestBlogReducer from './modules/latest_blog'
import authReducer from './modules/auth'

const rootReducer = combineReducers({
  auth: authReducer,
  target: targetReducer,
  genre: generReducer,
  supplement: supplementReducer,
  placeType: placeTypeReducer,
  dressCode: dressCodeReducer,
  topEvent: topEventReducer,
  newEvent: createEventReducer,
  selectedEvent: selectedEventReducer,
  place: placeReducer,
  latestBlog: latestBlogReducer,
  routing
})

export default rootReducer
