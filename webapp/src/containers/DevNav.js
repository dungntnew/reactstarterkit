import React from 'react'
import {Link} from 'react-router'


export default (props) => (
  <div className='dev-nav'>
      <span> Quick Link Debug Nav </span>:
      <Link to='/'>Top</Link> |
      <Link to='/create'>Create Event</Link> |
      <Link to='/blogs/latest'>Blog List</Link> |
      <Link to='/members/user-1/joined'>User Profile</Link> |
      <Link to='/events/event-1'>Event Detail</Link> |
      <Link to='/mypage/events/created'>MyPage</Link> |
      <Link to='/test'>Test Page A</Link> |
      <Link to='/test2'>Test Page B</Link> |

      <Link to='/about'>About</Link>
  </div>
)
