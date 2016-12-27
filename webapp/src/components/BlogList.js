import React, {Component, PropTypes} from 'react';
// import Categories from '../components/Categories';

import  '../css/BlogList.css';


class BlogList extends Component {
  constructor(props) {
    super(props)

  }

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string.isRequired),
    blogs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      coverImageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }))
  }

  componentDidMount() {

  }

  renderBlogItems() {
    const {blogs, categories} = this.props

    const item = blogs.map((blog, index)=>(
      <div class='item'>
        <div className='image'>
          <img src={blog.coverImageUrl} alt="blog-img"/>
        </div>
        <div className='content'>
          <a className='header'>{blog.title}</a>
          <div className='meta'>
            <span className='posted'>投稿日: </span>
            <span className='date'>{blog.updated}</span>
          </div>
          <div className='meta category-list'>
            <span className='title'>カテゴリー： </span>
            <span className='category'>{categories}</span>
          </div>

        </div>
      </div>
    ))

    return (
      <div className='ui items'>
        {item}
      </div>
    )
  }
  render() {

    return (
      <div className='blog-list'>
        {this.renderBlogItems()}
      </div>
    )
  }
}

export default BlogList
