import React, {Component, PropTypes}from 'react'
import {Link} from 'react-router';

import {formatDateTime} from '../helpers/blog'

import '../css/BlogItem.css';


class BlogItem extends Component {
  static propTypes = {
    coverImageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired)
  }

  linkCategories() {
    const {tags} = this.props
    const links = tags.map((tag, index)=>(
      <Link key={index} to={`/blogs/tags/${tag}`}>{tag}</Link>
    ))

    return links.map((link, index) => (
      <span key={index} className='cetegory'>{link}</span>
    ))

  }

  render() {
    const {
      coverImageUrl,
      title,
      url,
      lastUpdate,
      tags
    }
    = this.props

    return (
      <div className='item blog-item'>
        <div className='image'>
          <img src={coverImageUrl} alt="blog-img"/>
        </div>
        <div className='content'>
          <a className='header' href={url}>{title}</a>
          <div className='meta'>
            <span className='posted'>投稿日: </span>
            <span className='date'>{formatDateTime(lastUpdate)}</span>
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
