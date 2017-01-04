import React, {Component, PropTypes}from 'react'


import '../css/BlogItem.css';


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
    <div className='item'>
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
          <span className='title'>カテゴリー： </span>
          <span className='category'>{categories}</span>
        </div>
      </div>
    </div>

  )
  }
}

export default BlogItem
