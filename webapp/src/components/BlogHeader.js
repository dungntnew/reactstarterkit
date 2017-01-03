import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import  '../css/BlogHeader.css';

const links = [
  {
    'url': '/redirect/#facebook',
    'icon': 'facebook icon large'
  },
  {
    'url': '/redirect/#twitter',
    'icon': 'twitter icon large'
  },
  {
    'url': '/redirect/#instagram',
    'icon': 'instagram icon large'
  },
  {
    'url': '/redirect/#line',
    'icon': 'call square  icon large'
  },
]


  const linkIcons = links.map(link => {
    return(
      <Link to={link.url}>
        <i className={link.icon}></i>
      </Link>
    )
  })

  const linkBlogContent = () => {
    const links = linkIcons
    return links.map((link, index) =>
      <li key={index} className='item item-icon'>
        {link}
      </li>
    )
  }


class BlogHeader extends Component {
  constructor(props) {
    super(props)
  }

  static PropTypes = {
    title: PropTypes.string.isRequired,
    update: PropTypes.string.isRequired
  }

  render() {
    const {
      title,
      update
    }
    = this.props

    return(
      <div className='blog-header'>
        <h3 className='ui header'>{title}</h3>
        <div className='blog-header-right'>
          <div className='update'>{update}</div>
          <ul className='ui horizontal bulleted link list icon-list'>{linkBlogContent()}</ul>
        </div>
      </div>
    )
  }

}

export default BlogHeader
