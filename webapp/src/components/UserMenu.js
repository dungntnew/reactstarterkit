import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import '../css/UserMenu.css';

import DropDownMenu from './DropDownMenu';

const userMenuLinks = [
  <Link to='/mypage'>マイーペジ </Link>,
  <Link to='/mypage/hosted'>ホストページ </Link>,
  <Link to='/account/settings'>アカウント設定 </Link>,
  <Link to='/logout'>ログアウト </Link>
]

const UserMenu = (props) => (
  <div className='user-menu nav-menu-item submenu-anchor'>
    <img className='user-avatar' alt='user-avatar' src={props.user.avatarUrl}/>
    <Link to={props.user.url}>{props.user.name}<i className="angle down icon"></i></Link>
    <DropDownMenu links={userMenuLinks}/>
  </div>
)

UserMenu.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })
}

export default UserMenu
