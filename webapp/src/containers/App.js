import React, { Component,
                PropTypes } from 'react'

import { connect } from 'react-redux'

import DevNav from './DevNav'

class App extends Component {
  static propTypes = {

    // Injected by ReactRouter
    children: PropTypes.node
  }
  
  render() {
    const {children} = this.props

    return (
      <div className='wrapper'>
          <DevNav />
          {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
