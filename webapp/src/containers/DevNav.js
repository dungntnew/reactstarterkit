import React from 'react'
import {Link} from 'react-router'


export default (props) => (
  <div className='dev-nav'>
      <span> Quick Link Debug Nav </span>:
      <Link to='/test'>Test Page A</Link> |
      <Link to='/test2'>Test Page B</Link> |
      <Link to='/'>Top</Link> |
      <Link to='/about'>About</Link>
  </div>
)
