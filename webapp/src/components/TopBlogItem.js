import React, {Component, PropTypes} from 'react';

import '../css/TopBlogItem.css';


class TopBlogItem extends Component {
  static PropTypes = {
    coverImagesUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }
  render() {
    const {
      coverImagesUrl,
      title
    }
    = this.props

    return(
      <div className='card top-blog-item'>
        <div className='image'>
          <img src={coverImagesUrl} alt='blog-img'/>
        </div>
        <h3 className='title'>{title}</h3>
      </div>

    )
  }
}

export default TopBlogItem;
