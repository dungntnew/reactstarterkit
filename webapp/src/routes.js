import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './containers/App'
import TestPage from './containers/TestPage'
import TestPage2 from './containers/TestPage2'
import AboutPage from './containers/AboutPage'
import TopLandingPage from './containers/TopLandingPage'
import SearchPage from './containers/SearchPage'
import CreatePage from './containers/CreatePage'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={TopLandingPage}/>
    <Route path='/search'
           component={SearchPage}/>
    <Route path='/create'
           component={CreatePage}/>
    <Route path='/test'
           component={TestPage}/>
    <Route path='/test2'
           component={TestPage2}/>
    <Route path='/about'
           component={AboutPage}/>

  </Route>
)

export default routes;
