import React, {PropTypes, Component} from 'react';
import '../css/UserAvatar.css';

const UserAvatar = (props) => {
  return (
    <div className='user-avatar'>
      <img src={props.user.avatarUrl} className='circle-image'/>
      <h4 className='avatar-name'>{props.user.displayName}</h4>
      <Rank rank={props.rank}/>
    </div>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })
}
export default UserAvatar;
