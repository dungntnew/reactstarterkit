import React, { Component,
                PropTypes } from 'react'

import { connect } from 'react-redux'

import DevNav from './DevNav'
import Loading from '../components/loadings/Loading';

import '../css/App.css';

import {isLoading} from '../flux/modules/loading';

class App extends Component {
  static propTypes = {

    // Injected by ReactRouter
    //children: PropTypes.node
  }

  getConfig() {
    const {route} = this.props
    const {childRoutes} = route
    const {config} = (childRoutes 
                      && childRoutes.length > 0) ? childRoutes[0]: {config:{}}
    return config
  }

  render() {
    const config = this.getConfig()
    const {isLoading, main, sidebar, topbar, footer } = this.props
    
    return (
      <div className='ui wrapper'>
          {isLoading && <Loading />}
          <DevNav />
          {config.has_topbar &&
          <div className='topbar'>
            {topbar}
          </div>
          }

          {config.has_sidebar &&
          <div className='sidebar'>
            {sidebar}
          </div>
          }

          <div className='main'>
            {main}
          </div>
          
          {config.has_footer &&
          <div className='sidebar'>
            {footer}
          </div>
          }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: isLoading(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
