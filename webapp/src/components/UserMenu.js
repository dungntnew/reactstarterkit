import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

import '../css/UserMenu.css';

class UserMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  renderDropdownMenu(){
    const links =
    [
      <Link to='/mypage'>Help </Link>,
      <Link to='/logout'>Logout </Link>
    ]

    const subMenuClasses = classNames({
      'dropdown-menu': true,
      'active': this.state.active
    })

    return (
      <ul

         className={subMenuClasses}
         onMouseLeave={()=> this.setState({active: false})}
         >
      {
        links.map((link, index) => (
          <li key={index}>{link}</li>
        ))
      }
      </ul>
    )
  }

  render() {
    const {user} = this.props
    const {avatarUrl, name, url} = user
    return (
      <div
         className='user-menu'
         onMouseEnter={()=> this.setState({active: true})}
      >
        <img alt='user-avatar' src={avatarUrl}/>
        <Link to={url}>{name}</Link>
        <div className='dropdown-menu-anchor' >
        {this.renderDropdownMenu()}
        </div>
      </div>
    )
  }
}

export default UserMenu
