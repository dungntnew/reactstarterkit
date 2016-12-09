import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import '../css/TopNav.css';

import UserMenu from '../components/UserMenu';
import HelpMenu from '../components/HelpMenu';

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
      <Link to='/search'>イベントをさがす</Link>,
      <Link to='/create'>イベントをつくる</Link>,
      <HelpMenu />,
      <UserMenu user={this.props.user}/>
    ]
    :
    [
      <HelpMenu />,
      <Link to='/login' className='ui button'>ログイン </Link>,
      <Link to='/register' className='ui button'>新規登録</Link>
    ]

    return links.map((link, index) => (
      <li className="nav-item" key={index}>{link}</li>
    ))
  }

  render() {
    return (
      <div className='top-nav'>
         <ul className="ui stackable menu top-nav-list">
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
