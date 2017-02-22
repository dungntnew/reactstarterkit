import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import {reducer as burgerMenu} from 'redux-burger-menu';

// import topEventReducer from './modules/top_event'
// import createEventReducer from './modules/create_event'
// import selectedBlogReducer from './modules/selected_blog'
// import targetReducer from './modules/target'
// import generReducer from './modules/gener'
// import dressCodeReducer from './modules/dressCode'
// import placeTypeReducer from './modules/placeType'
// import supplementReducer from './modules/supplement'
// import placeReducer from './modules/place'
// import latestBlogReducer from './modules/latest_blog'
import authReducer from './modules/auth'
import creditReducer from './modules/credit'
import bankAccountReducer from './modules/bankAccount'
// import latestNewsReducer from './modules/latest_news'
import contactReducer from './modules/contact'

import {
    allEventsReducer,
    eventIdsByQueryReducer,
    loadedEventDetailsReducer,
    viewingEventDetailReducer,
    creatingEventReducer,

    entitiesReducer,
    // categoriesReducer,
    // categoryReducer,
    // blogsReducer,
    // blogReducer,

    loadedUserDetailsReducer,
    viewingUserDetailReducer,

} from './modules/resource';

import {loadingReducer} from './modules/loading'

import {errorReducer} from './modules/error'

const rootReducer = combineReducers({
  loadings: loadingReducer,
  errors: errorReducer,
  auth: authReducer,
  
  // target: targetReducer,
  // genre: generReducer,
  // supplement: supplementReducer,
  // placeType: placeTypeReducer,
  // dressCode: dressCodeReducer,
  // topEvent: topEventReducer,
  // newEvent: createEventReducer,
  // selectedBlog: selectedBlogReducer,
  // place: placeReducer,
  // latestBlog: latestBlogReducer,
  // joinEvent: joinEventReducer,
  bankAccount: bankAccountReducer,
  credit: creditReducer,
  // latestNews: latestNewsReducer,
  contact: contactReducer,
  
  // - new reducers
  allEvents: allEventsReducer,
  eventIds: eventIdsByQueryReducer,
  loadedEventDetails: loadedEventDetailsReducer,
  viewingEventDetail: viewingEventDetailReducer,
  creatingEventData: creatingEventReducer,
  
  // // 

  entities: entitiesReducer,
  // categories: categoriesReducer,
  // category: categoryReducer,
  // blogs: blogsReducer,
  // blog: blogReducer,
  loadedUserDetails: loadedUserDetailsReducer,
  viewingUserDetail: viewingUserDetailReducer,

  routing,
  burgerMenu
})

export default rootReducer
