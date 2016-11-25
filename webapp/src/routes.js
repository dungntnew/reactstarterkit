import React from 'react'
import {Route} from 'react-router'

import App from './containers/App'
import AboutPage from './containers/AboutPage'
import LoginPage from './containers/LoginPage'

const routes = (
  <Route path='/' component={App}>
    <Route path='/about'
           component={AboutPage}/>

    <Route path='/login'
           component={LoginPage}/>
  </Route>
)

export default routes;
