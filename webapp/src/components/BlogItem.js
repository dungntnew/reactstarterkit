import React, {Component, PropTypes}from 'react'
import {Link} from 'react-router';

import '../css/BlogItem.css';


class BlogItem extends Component {
  static propTypes = {
    coverImageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string.isRequired)
  }

  linkCategories() {
    const links = [
      <Link to='/category/#1'>角煮</Link>,
      <Link to='/category/#2'>フェス</Link>,
      <Link to='/category/#3'>会員制</Link>
    ]

    return links.map((link, index) => (
      <span key={index} className='cetegory'>{link}</span>
    ))

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
            <p className='title'>カテゴリー：{this.linkCategories()} </p>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogItem
