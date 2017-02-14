import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import '../css/FriendList.css';

class FriendList extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      displayNoti: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired
    })),
    link: PropTypes.string.isRequired
  }

  render() {

    const {friends, link} = this.props

    const items = friends.map((friend, index)=>(
      <div className='item' key={index}>
        <div className='ui avatar image'>
          <Link to={friend.url}>
             <img className='img-avatar' src={friend.avatarUrl} alt='avatar'/>
          </Link>
        </div>
        <div className="content">
          {friend.displayNoti}
          <p className='date'>{friend.updated}</p>
        </div>
      </div>

    ))

    return(
      <div className='ui segment friend-list'>
        <div className='ui text container'>
          <h3 className='right title'>お知らせ</h3>
          <div className='ui middle aligned divided list'>
             {items}
          </div>
          <a href={link} className='text-link text-orange'>もっと見る</a>
        </div>
      </div>
    )
  }

}

export default FriendList

