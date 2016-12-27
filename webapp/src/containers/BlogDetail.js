import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import '../css/BlogDetail.css';





class BlogDetail extends Component {
  constructor(props) {
    super(props)
  }

  static PropTypes = {
    title: PropTypes.string.isRequired,
    updated: PropTypes.string.isRequired,

  }


  renderHeader() {
    <div className='blog-heder'>
      <h3 className="ui header">{title}</h3>
      <div >
      </div>

    </div>
  }

  render() {
    return(
      <div className='blog-detail'>
      </div>
    )
  }

}

export default BlogDetail
