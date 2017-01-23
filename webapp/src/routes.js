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
import JoinPage from './containers/JoinPage'
import CancelJoinPage from './containers/CancelJoinPage'
import BlogListPage from './containers/BlogListPage'
import BlogDetailPage from './containers/BlogDetailPage'

import CreatedEventListMyPage from './containers/CreatedEventListMyPage'
import LikedEventListMyPage from './containers/LikedEventListMyPage'
import JoinedEventListMyPage from './containers/JoinedEventListMyPage'
import ReviewedEventListMyPage from './containers/ReviewedEventListMyPage'

import BankSettingMyPage from './containers/BankSettingMyPage'
import PasswordSettingMyPage from './containers/PasswordSettingMyPage'
import CreditCardSettingMyPage from './containers/CreditCardSettingMyPage'
import NewsListMyPage from './containers/NewsListMyPage'
import ProfitCreateMyPage from './containers/ProfitCreateMyPage'
import ProfitApplyHistoryMyPage from './containers/ProfitApplyHistoryMyPage'
import ProfitListMyPage from './containers/ProfitListMyPage'
import ContactMyPage from './containers/ContactMyPage'

import MyPage from './containers/MyPage'
import TopMyPage from './containers/TopMyPage'
import ProfilePage from './containers/ProfilePage'
import LoginPage from './containers/LoginPage'
import NotFoundPage from './components/NotFoundPage'

import auth from './helpers/auth'

const requireAuth = (nextState, replace, callback) => {
  if (!auth.loggedIn()) {
    console.log('require login')
    console.log(nextState)
    replace({
      pathname: '/login',
    })
    callback();
  }
  else {
    console.log("passed.")
  }
}


const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={TopLandingPage}/>
    <Route path='/login' component={LoginPage}/>
    <Route path='/search'
           component={SearchPage}/>
    <Route path='/create'
           component={CreatePage} onEnter={requireAuth}/>
    <Route path='/events/:eventId'
          component={DetailPage}/>
    <Route path='/join/:userId/:eventId'
          component={JoinPage} onEnter={requireAuth}/>
    <Route path='/cancelJoin/:userId/:eventId'
          component={CancelJoinPage} onEnter={requireAuth}/>
    <Route path='/members/:userId/:filter'
          component={ProfilePage}/>
    <Route path='/blogs/latest'
          component={BlogListPage}/>
    <Route path='/blogs/:blogItemId'
          component={BlogDetailPage}/>
    <Route path='/mypage' component={MyPage} onEnter={requireAuth}>
          <IndexRoute component={TopMyPage}/>
          {/* TODO add sub routes for mypage */}
          <Route path='/mypage/events/created' component={CreatedEventListMyPage}/>
          <Route path='/mypage/events/liked' component={LikedEventListMyPage}/>
          <Route path='/mypage/events/joined' component={JoinedEventListMyPage}/>
          <Route path='/mypage/events/reviewed' component={ReviewedEventListMyPage}/>

          <Route path='/mypage/bank-settings' component={BankSettingMyPage} />
          <Route path='/mypage/change-password' component={PasswordSettingMyPage} />
          <Route path='/mypage/creditcard-settings' component={CreditCardSettingMyPage} />
          <Route path='/mypage/news' component={NewsListMyPage} />
          <Route path='/mypage/profit-apply' component={ProfitCreateMyPage} />
          <Route path='/mypage/profit-list' component={ProfitListMyPage} />
          <Route path='/mypage/profit-apply-history' component={ProfitApplyHistoryMyPage} />
          <Route path='/mypage/contact' component={ContactMyPage} />

    </Route>
    <Route path='/test'
           component={TestPage}/>
    <Route path='/test2'
           component={TestPage2}/>
    <Route path='/about'
           component={AboutPage}/>
    <Route path='*' component={NotFoundPage} />

  </Route>
)

export default routes;
