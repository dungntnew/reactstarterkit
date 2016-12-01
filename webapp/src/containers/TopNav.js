import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import '../css/TopNav.css';

import UserMenu from '../components/UserMenu';

class TopNav extends Component {
  static propTypes = {
    authenticated:  PropTypes.bool.isRequired
  }

  renderMenuItems() {
    const links = this.props.authenticated ?
    [
      <Link to='/search'>Search </Link>,
      <Link to='/create'>Create </Link>,
      <Link to='/help'>Help </Link>,
      <UserMenu key='link-4' />
    ]
    :
    [
      <Link to='/help'>Help </Link>,
      <Link to='/login'>Login </Link>,
      <Link to='/register'>Register </Link>
    ]
    return links.map((link, index) => (
      <li key={index}>{link}</li>
    ))
  }

  render() {
    return (
      <div className='top-nav'>
         <ul>
         {this.renderMenuItems()}
         </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  authenticated: true
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(TopNav)
