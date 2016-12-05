import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import '../css/TopNav.css';

import UserMenu from '../components/UserMenu';

class TopNav extends Component {
  static propTypes = {
    authenticated:  PropTypes.bool.isRequired,
    user: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  }

  renderMenuItems() {
    const links = this.props.authenticated ?
    [
      <Link to='/search'>Search </Link>,
      <Link to='/create'>Create </Link>,
      <Link to='/help'>Help </Link>,
      <UserMenu user={this.props.user}/>
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
  authenticated: state.auth.authenticated,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(TopNav)
