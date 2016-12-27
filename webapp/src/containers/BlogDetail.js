import React, {Component, PropTypes} from 'react';

import '../css/BlogDetail.css';


class BlogDetail extends Component {
  constructor(props) {
    super(props)
  }

  static PropTypes = {
    title: PropTypes.string.isRequired,

  }

  renderHeader() {
    <div className='blog-heder'>
      <h3 className="ui header">{title}</h3>

    </div>
  }

}
