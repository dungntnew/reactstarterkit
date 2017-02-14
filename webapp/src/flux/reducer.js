import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// import topEventReducer from './modules/top_event'
// import createEventReducer from './modules/create_event'
// import likedEventReducer from './modules/liked_event'
// import joinedEventReducer from './modules/joined_event'
// import relativedEventReducer from './modules/relatived_event'
// import selectedEventReducer from './modules/selected_event'
// import selectedBlogReducer from './modules/selected_blog'
// import targetReducer from './modules/target'
// import generReducer from './modules/gener'
// import dressCodeReducer from './modules/dressCode'
// import placeTypeReducer from './modules/placeType'
// import supplementReducer from './modules/supplement'
// import placeReducer from './modules/place'
// import latestBlogReducer from './modules/latest_blog'
// import createdEventReducer from './modules/created_event'
import authReducer from './modules/auth'
// import creditReducer from './modules/credit'
// import joinEventReducer from './modules/joinEvent'
// import bankAccountReducer from './modules/bankAccount'
// import latestNewsReducer from './modules/latest_news'
// import contactReducer from './modules/contact'
// import selectedUserReducer from './modules/selected_user'

import {

    allEventsReducer,
    eventIdsByQueryReducer,
    classifiedEventsReducer,
    loadedEventDetailsReducer,
    viewingEventDetailReducer,

    loadingReducer,
    errorReducer,
    entitiesReducer,
    // categoriesReducer,
    // categoryReducer,
    // blogsReducer,
    // blogReducer,

} from './modules/resource';



const rootReducer = combineReducers({
  auth: authReducer,
  // selectedUser: selectedUserReducer,
  // credit: creditReducer,
  // target: targetReducer,
  // genre: generReducer,
  // supplement: supplementReducer,
  // placeType: placeTypeReducer,
  // dressCode: dressCodeReducer,
  // topEvent: topEventReducer,
  // newEvent: createEventReducer,
  // selectedEvent: selectedEventReducer,
  // selectedBlog: selectedBlogReducer,
  // place: placeReducer,
  // latestBlog: latestBlogReducer,
  // joinEvent: joinEventReducer,
  // bankAccount: bankAccountReducer,
  // latestNews: latestNewsReducer,
  // contact: contactReducer,
  // relativedEvent: relativedEventReducer,

  // - new reducers
  allEvents: allEventsReducer,
  eventIds: eventIdsByQueryReducer,
  classifiedEvents: classifiedEventsReducer,
  loadedEventDetails: loadedEventDetailsReducer,
  viewingEventDetail: viewingEventDetailReducer,
  
  // // 
  loadings: loadingReducer,
  errors: errorReducer,
  entities: entitiesReducer,
  // categories: categoriesReducer,
  // category: categoryReducer,
  // blogs: blogsReducer,
  // blog: blogReducer,


  routing
})

export default rootReducer
