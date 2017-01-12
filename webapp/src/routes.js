import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './containers/App'
import TestPage from './containers/TestPage'
import TestPage2 from './containers/TestPage2'
import AboutPage from './containers/AboutPage'
import TopLandingPage from './containers/TopLandingPage'
import SearchPage from './containers/SearchPage'
import CreatePage from './containers/CreatePage'
import DetailPage from './containers/DetailPage'
import BlogListPage from './containers/BlogListPage'
import BlogDetailPage from './containers/BlogDetailPage'

import CreatedEventListMyPage from './containers/CreatedEventListMyPage'
import LikedEventListMyPage from './containers/LikedEventListMyPage'
import JoinedEventListMyPage from './containers/JoinedEventListMyPage'
import ReviewedEventListMyPage from './containers/ReviewedEventListMyPage'

import BankSettingMyPage from './containers/BankSettingMyPage'

import MyPage from './containers/MyPage'
import TopMyPage from './containers/TopMyPage'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={TopLandingPage}/>
    <Route path='/search'
           component={SearchPage}/>
    <Route path='/create'
           component={CreatePage}/>
    <Route path='/events/:eventId'
          component={DetailPage}/>
    <Route path='/blogs/latest'
          component={BlogListPage}/>
    <Route path='/blogs/:blogItemId'
          component={BlogDetailPage}/>

    <Route path='/mypage' component={MyPage}>
          <IndexRoute component={TopMyPage}/>
          {/* TODO add sub routes for mypage */}
          <Route path='/mypage/events/created' component={CreatedEventListMyPage}/>
          <Route path='/mypage/events/liked' component={LikedEventListMyPage}/>
          <Route path='/mypage/events/joined' component={JoinedEventListMyPage}/>
          <Route path='/mypage/events/reviewed' component={ReviewedEventListMyPage}/>

          <Route path='/mypage/bank-settings' component={BankSettingMyPage} />
    </Route>

    <Route path='/test'
           component={TestPage}/>
    <Route path='/test2'
           component={TestPage2}/>
    <Route path='/about'
           component={AboutPage}/>

  </Route>
)

export default routes;
