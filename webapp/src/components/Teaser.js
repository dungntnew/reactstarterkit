import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import '../css/Teaser.css';

class Teaser extends Component {

  static PropTypes = {
    lastUpdate: PropTypes.string.isRequired
  }

  linkSocialIcon() {
    const links = [
    <Link to='/redirect/#share'>Share<i className='angle right icon'></i></Link>,
    <Link to='/redirect/#twitter'><i className='twitter icon large'></i>Twitter</Link>,
    <Link to='/redirect/#facebook'><i className='facebook icon large'></i>Facebook</Link>,
    <Link to='/redirect/#instagram'><i className='instagram icon large'></i>Instagram</Link>
    ]

    return links.map((link, index) =>
      <li key={index} className='item-icon'>
        {link}
      </li>
    )
  }

  render() {
    const {
      lastUpdate
    } = this.props

    return (
      <div className='teaser center'>

        <div className='teaser-content'>
          <div className='ui container'>

            <h2 className='title'>食べる作る集まる。きっと何かはじまる。</h2>
            <img className='page-logo'
             alt='Page-Logo'
             src='/img/logomark.png'
             />
            <p className='date'>{lastUpdate} 公開</p>
          </div>
        </div>

        <div className='list-social'>
          <ul className='ui container'>
            {this.linkSocialIcon()}
          </ul>
        </div>

        <div className='footer'>
          <span>COPYRIGHT © YOURTABLE. ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    )
  }

}

export default Teaser
