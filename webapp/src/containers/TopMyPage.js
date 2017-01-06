import React, {Component} from 'react'
import {Link} from 'react-router'

class TopMyPage extends Component {

  renderQuickLinks() {
    const links = [
      <Link to='/mypage/host'> Hosted Events Page </Link>,
      <Link to='/mypage/passed'> Passed Events Page </Link>
    ]
    return (
      <div className='ui list'>
      {
        links.map((item, index)=>
          <div className='item' key={index}>
          {item}
          </div>
        )
      }
      </div>
    )
  }

  render() {
    return (
      <div className='top-mypage'>
      {this.renderQuickLinks()}
      </div>
    )
  }
}

export default TopMyPage
