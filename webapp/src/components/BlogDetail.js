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
    coverImageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  }


  linkCategories() {
    const {tags} = this.props
    const links = tags.map((c) =>
      <Link to={`/blogs/tag/${c}`} >{c}</Link>
    )

    return links.map((link, index) => (
      <span key={index} className='cetegory'>{link}</span>
    ))
  }

  render() {
    const {title, lastUpdate, content, coverImageUrl} = this.props

    return(
      <div className='ui text container blog-detail'>
        <BlogHeader title={title} lastUpdate={lastUpdate} />

        <div className='blog-content'>
          <p>{content}</p>
          <img alt='blog-cover-img' src={coverImageUrl} />
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
