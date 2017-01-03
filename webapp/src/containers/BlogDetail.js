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
    coverImg: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string.isRequired),
  }



  render() {
    const = {
      content,
      coverImg,
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
        </div>

        <div className='blog-footer'>
          <p>カテゴリー：{categories}</p>
        </div>
      </div>
    )
  }

}

export default BlogDetail
