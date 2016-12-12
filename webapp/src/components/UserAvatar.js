import React, {PropTypes} from 'react';
import Rank from '../components/Rank';

import '../css/UserAvatar.css';

const UserAvatar = (props) => {
  return (
    <div className='user-avatar'>
      <a classname='image cover-img-avatar' href={url}>
        <img src={props.user.avatarUrl} className='circle-image'/>
      </a>
      <h4 className='avatar-name'>{props.user.displayName}</h4>
      <Rank rank={props.rank}/>
    </div>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    rank:PropTypes.string.isRequired
  })
}
export default UserAvatar;
