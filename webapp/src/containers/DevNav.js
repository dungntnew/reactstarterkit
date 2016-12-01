import React from 'react'
import {Link} from 'react-router'


export default (props) => (
  <div className='dev-nav'>
      <span> Quick Link Debug Nav </span>:
      <Link to='/test'>Test Page</Link> |
      <Link to='/'>Top</Link> |
      <Link to='/about'>About</Link>
  </div>
)
