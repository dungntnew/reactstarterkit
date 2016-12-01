import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './containers/App'
import TestPage from './containers/TestPage'
import AboutPage from './containers/AboutPage'
import TopLandingPage from './containers/TopLandingPage'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={TopLandingPage}/>
    <Route path='/test'
           component={TestPage}/>
    <Route path='/about'
           component={AboutPage}/>

  </Route>
)

export default routes;
