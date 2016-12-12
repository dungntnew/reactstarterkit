import $ from 'jquery';
import React, {PropTypes} from 'react';


import 'semantic-ui-rating/rating.min.css'
import '../css/UserAvatar.css';


$.rating = require('semantic-ui-rating')

const UserAvatar = (props) => {

  return (
    <div className='user-avatar'>
      <a classname='image cover-img-avatar' href={url}>
        <img src={props.user.avatarUrl} className='circle-image' alt='img-avatar'/>
      </a>
      <h4 className='avatar-name'>{props.user.displayName}</h4>

      <div class="ui star rating" data-rating="0" data-max-rating="5"></div>
    </div>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })
}
export default UserAvatar;
