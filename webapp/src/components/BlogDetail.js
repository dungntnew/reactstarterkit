import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import BlogHeader from '../components/BlogHeader';

import '../css/BlogDetail.css';

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

class BlogDetail extends Component {
  constructor(props) {
    super(props)
  }

  static PropTypes = {
    content: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string.isRequired),
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
          <p>カテゴリー：{linkCategoryContent()}</p>
        </div>
      </div>
    )
  }

}

export default BlogDetail
