import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import '../css/HelpMenu.css';

import DropDownMenu from './DropDownMenu';

const helpLinks = [
  <Link to='/help/#about'>Yourtableについて </Link>,
  <Link to='/help/#qa'>Q&A </Link>,
  <Link to='/help/#center'>ヘルプセンター </Link>,
]

const HelpMenu = (props) => (
  <div className='help-menu nav-menu-item submenu-anchor'>
    <Link to='/help'>ヘルプ</Link>
    <DropDownMenu links={helpLinks}/>
  </div>
)

HelpMenu.propTypes = {
}

export default HelpMenu
