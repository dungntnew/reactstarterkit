import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import BlogHeader from '../components/BlogHeader';

import '../css/BlogDetail.css';




class BlogDetail extends Component {
  constructor(props) {
    super(props)
  }

  static PropTypes = {
    content: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string.isRequired),
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
      content,
      coverImage,
      categories
    }
    = this.props

    return(
      <div className='ui text container blog-detail'>
        <BlogHeader />

        <div className='blog-content'>
          <p>{content}</p>
          <img
             alt='blog-cover-img'
             src={coverImage}
          />
          <p>{content}</p>
        </div>

        <div className='blog-footer'>
          <p>カテゴリー：{this.linkCategories()}</p>
        </div>
      </div>
    )
  }
}

export default BlogDetail
