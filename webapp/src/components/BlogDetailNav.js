import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import '../css/BlogDetailNav.css'

const BlogDetailNav = (props) => (
  <div className='ui three column stackable grid  blog-detail-nav'>
      <a className="column previous" href="#" onClick={()=> props.onPreLink() }>
          <i className="angle left icon"></i>前の記事
      </a>
      <Link className="column " to='/blogs/latest'>テーブルレポート一覧</Link>
      <a className="column next" href="#" onClick={()=> props.onNextLink() }>
         次の投稿
         <i className="angle right icon"></i>
      </a>
  </div>
)

BlogDetailNav.propTypes = {
  onPreLink: PropTypes.func.isRequired,
  onNextLink: PropTypes.func.isRequired,
}

export default BlogDetailNav
