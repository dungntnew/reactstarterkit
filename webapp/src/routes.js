import React from 'react'
import {Route, IndexRoute} from 'react-router'

// PAGE LAYOUT CONFIGS
import App from './containers/App'
import TopBar from './components/topbars/TopBar';
import LandingTopBar from './components/topbars/LandingTopBar';

import {SideBar, MPSideBar} from './components/sidebars/SideBar';

import PageFooter from './components/PageFooter';

// PAGE INCLUDES
import TestPage from './containers/TestPage'
import TestPage2 from './containers/TestPage2'
import AboutPage from './containers/AboutPage'
import TopLandingPage from './containers/TopLandingPage'
import SearchPage from './containers/SearchPage'
import CreatePage from './containers/CreatePage'
import DetailPage from './containers/event-details/DetailPage'
import JoinPage from './containers/JoinPage'
import CancelJoinPage from './containers/CancelJoinPage'
import BlogListPage from './containers/BlogListPage'
import BlogDetailPage from './containers/BlogDetailPage'

import EventListMyPage from './containers/EventListMyPage'

import BankSettingMyPage from './containers/BankSettingMyPage'
import CreditCardSettingMyPage from './containers/CreditCardSettingMyPage'
import NewsListMyPage from './containers/NewsListMyPage'
import ProfitCreateMyPage from './containers/ProfitCreateMyPage'
import ProfitApplyHistoryMyPage from './containers/ProfitApplyHistoryMyPage'
import ProfitListMyPage from './containers/ProfitListMyPage'
import ContactPage from './containers/ContactPage'
import TopMyPage from './containers/TopMyPage'
import ProfilePage from './containers/ProfilePage'

import LoginPage from './containers/user/LoginPage'
import SignupPage from './containers/user/SignupPage'
import ForgotPasswordPage from './containers/user/ForgotPasswordPage'
import ResetPasswordPage from './containers/user/ResetPasswordPage'
import ChangePasswordPage from './containers/user/ChangePasswordPage'


import NotFoundPage from './components/NotFoundPage'

import auth from './helpers/auth'

const requireAuth = (nextState, replace, callback) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      query: {
          return_to: nextState.location.pathname
      }
    })
  }
  else {
  }
  callback();
}

const defaultLayout = {
      topbar: TopBar,
      sidebar: SideBar,
      footer: PageFooter,
}

const defaultConfig = {
    has_topbar: true,
    has_sidebar: true,
    has_footer: true
}

const getComponents = (components) => {
      return Object.assign({}, defaultLayout, components)
}

const getConfig = (config) => {
      return Object.assign({}, defaultConfig, config)
}


const routes = (
  <Route path='/' component={App}>
    {/* <IndexRoute
            components={getComponents({main: TopLandingPage, topbar: LandingTopBar})}
            config={getConfig()}/>
    */}
    {/* <Route path='/about'
            components={getComponents({main: AboutPage})} config={getConfig()}/>
    */}
    {/* <Route path='members/:userId/:filter'
            components={getComponents({main: ProfilePage})} config={getConfig()}
            />
    */}
    <Route path='/events/:eventId'
           components={getComponents({main: DetailPage})} config={getConfig()}
          />
    {/* event join */}
    <Route path='/join/:eventId'
           components={getComponents({main: JoinPage})} config={getConfig()}
           />

    {/* event create */}
   <Route path='/create'
           components={getComponents({main: CreatePage})} config={getConfig()}
           onEnter={requireAuth}
          />
    {/* event search page */}
   {/*
   <Route path='/search'
           components={getComponents({main: SearchPage})} config={getConfig()}
          />
    */}
    {/* account links */}
    <Route path='/login'
          components={getComponents({main: LoginPage})} config={getConfig()}
    />
    <Route path='/signup'
           components={getComponents({main: SignupPage})} config={getConfig()}
    />
   <Route path='/forgot-password'
          components={getComponents({main: ForgotPasswordPage})} config={getConfig()}
    />
   <Route path='/reset-password'
          components={getComponents({main: ResetPasswordPage})} config={getConfig()}
    />
   <Route path='/change-password'
          components={getComponents({main: ChangePasswordPage})} config={getConfig()}
    />

   {/* help - contact */}
   <Route path='/contact'
          components={getComponents({main: ContactPage})} config={getConfig()}
    />
   {/* mypage - event list */}
   <Route path='/mypage/events/:service/:status'
          components={getComponents({main: EventListMyPage, sidebar: MPSideBar})} config={getConfig()}
    />
   {/* mypage - bank account settings */}
   <Route path='/mypage/bank-account'
          components={getComponents({main: BankSettingMyPage, sidebar: MPSideBar})} config={getConfig()}
    />
   {/* mypage - credit card settings */}
   <Route path='/mypage/credit-account'
          components={getComponents({main: CreditCardSettingMyPage, sidebar: MPSideBar})} config={getConfig()}
    />
   {/*

    <Route path='/search'
           component={SearchPage}/>


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
          <Route path='/mypage/events/:service/:status' component={EventListMyPage}/>

          <Route path='/mypage/bank-settings' component={BankSettingMyPage} />
          <Route path='/mypage/change-password' component={PasswordSettingMyPage} />
          <Route path='/mypage/creditcard-settings' component={CreditCardSettingMyPage} />
          <Route path='/mypage/news' component={NewsListMyPage} />
          <Route path='/mypage/profit-apply' component={ProfitCreateMyPage} />
          <Route path='/mypage/profit-list' component={ProfitListMyPage} />
          <Route path='/mypage/profit-apply-history' component={ProfitApplyHistoryMyPage} />


    </Route>
    <Route path='/test'
           component={TestPage}/>
    <Route path='/test2'
           component={TestPage2}/>

    */}
    <Route path='*'
           components={getComponents({main: NotFoundPage})} config={getConfig()}
          />
  </Route>
)

export default routes;
