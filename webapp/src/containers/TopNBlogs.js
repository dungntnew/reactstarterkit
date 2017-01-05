import _ from 'lodash';
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';

import BlogItem from '../components/TopBlogItem';

import '../css/TopNBlogs.css';

class TopNBlogs extends Component {

  static PropTypes = {
    filter: PropTypes.string.isRequired,
    linkTitle: PropTypes.string.isRequired,
    limit: PropTypes.string.isRequired
  }

  componentDidMount() {
    this.props.refresh()
  }

  renderLink(filter, linkTitle) {
    return (
      <Link to = {`/blogs/${filter}`}>{linkTitle}</Link>
    )
  }

  renderLoading() {
    return (
      <h4>Loading</h4>
    )
  }

  renderEmpty() {
    return (
      <h4>Empty</h4>
    )
  }

  renderBlogItems(filter, limit) {
    const {isFetching, blogs} = this.props

    if (isFetching) {
      return this.renderLoading()
    }
    else if (!blogs || blogs.length ===0) {
      return this.renderEmpty()
    }
    else {
      const keys= _.keys(blogs)
      return keys.map((key, index) => (
        <TopBlogItem key={key} {...blogs[key]}/>
      ))
    }
  }

  render() {
    const {filter, linkTitle, limit} = this.props
    const link = this.renderLink(filter, linkTitle)
    const blockContent = this.renderBlogItems(filter, limit)

    return (

      <div className='topn-blogs'>
        <div className='block-header'>
          <h2 className='header'>テーブルレポート</h2>
          <div className='see-more'>{link}</div>
        </div>
        <div className='ui six doubling cards'>
            {blockContent}
        </div>
      </div>
    )

  }
}

export default TopNBlogs
