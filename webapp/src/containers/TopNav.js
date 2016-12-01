import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/TopNav.css';

class TopNav extends Component {
  static propTypes = {
    authenticated:  PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className='top-nav'>
      <p>Top NAV</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  authenticated: false
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(TopNav)
