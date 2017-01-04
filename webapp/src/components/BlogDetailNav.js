import React, {Component} from 'react'
import {Link} from 'react-router';


class BlogDetailNav extends Component {
  constructor(props) {
    super(props);
    this.onPreLink = this.onPreLink.bind(this);
    this.onNextLink = this.onNextLink.bind(this);

  }

  onPreLink() {

  }

  onNextLink() {

  }

  render() {


    return(

      <div className='blog-detail-nav'>
          <a className="previous"href="#" onClick={this.onPreLink}><i className="angle left icon"></i>前の記事</a>
          <a className="center" href="#">テーブルレポート一覧</a>
          <a className="next" href="#" onClick={this.onNextLink}>次の投稿<i className="angle right icon"></i></a>
      </div>

    )
  }
}

export default BlogDetailNav
