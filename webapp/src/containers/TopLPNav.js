import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import 'semantic-ui-sidebar/sidebar.min.css'

import '../css/TopLPNav.css';

import UserMenu from '../components/UserMenu';
import HelpMenu from '../components/HelpMenu';

$.fn.sidebar = require('semantic-ui-sidebar')


class TopLPNav extends Component {
  static propTypes = {
    authenticated:  PropTypes.bool.isRequired,
    user: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  }

  componentDidMount() {
    //$('.ui.sidebar').sidebar('attach events', '.toc.item')
    // TODO Attach sidebar menu to page content
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
      <Link to='/signup' className='ui button'>新規登録</Link>
    ]

    return links.map((link, index) => (
      <li className="nav-item" key={index}>{link}</li>
    ))
  }

  render() {
    return (
      <div className='top-lp-nav'>
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
                       mapDispatchToProps)(TopLPNav)
