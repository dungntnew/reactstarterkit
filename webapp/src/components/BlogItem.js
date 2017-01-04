import React, {Component, PropTypes}from 'react'
import {Link} from 'react-router';

import '../css/BlogItem.css';

const links = [

  {
    'url': '/category/#1',
    'name': '角煮'
  },
  {
    'url': '/category/#2',
    'name': 'フェス'
  },
  {
    'url': '/category/#2',
    'name': '会員制'
  },
]

  const linkCategories = links.map(link => {
    return(
      <Link to={link.url}>{link.name}</Link>
    )
  })

  const linkCategoryContent = (props) => {
    const links = linkCategories
    return links.map((link, index) =>
      <span key={index} className='cetegory'>{link}</span>
    )
  }

class BlogItem extends Component {
  static propTypes = {
    coverImageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string.isRequired)
  }

  render() {
    const {
      coverImageUrl,
      title,
      url,
      datePosted,
      categories
    }
    = this.props

  return (
    <div className='item blog-item'>
      <div className='image'>
        <img src={coverImageUrl} alt="blog-img"/>
      </div>
      <div className='content'>
        <a className='header'>{title}</a>
        <div className='meta'>
          <span className='posted'>投稿日: </span>
          <span className='date'>{datePosted}</span>
        </div>
        <div className='meta category-list'>
          <p className='title'>カテゴリー：{linkCategoryContent()} </p>
        </div>
      </div>
    </div>

  )
  }
}

export default BlogItem
