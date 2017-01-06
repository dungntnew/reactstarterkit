import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import  '../css/BlogHeader.css';

import {formatDateTime} from '../helpers/blog'

class BlogHeader extends Component {
  constructor(props) {
    super(props)
  }

  static PropTypes = {
    title: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired
  }

  linkBlogIcon() {
    const links = [
    <Link to='/redirect/#facebook'><i className='facebook icon large'></i></Link>,
    <Link to='/redirect/#twitter'><i className='twitter icon large'></i></Link>,
    <Link to='/redirect/#instagram'><i className='instagram icon large'></i></Link>,
    <Link to='/redirect/#line'><i className='call square  icon large'></i></Link>
    ]

    return links.map((link, index) =>
      <li key={index} className='item item-icon'>
        {link}
      </li>
    )
  }

  render() {
    const {
      title,
      lastUpdate
    }
    = this.props

    return(
      <div className='blog-header'>
        <h3 className='ui header'>{title}</h3>
        <div className='blog-header-right'>
          <div className='update'>{formatDateTime(lastUpdate)}</div>
          <ul className='ui horizontal bulleted link list icon-list'>{this.linkBlogIcon()}</ul>
        </div>
      </div>
    )
  }

}

export default BlogHeader
