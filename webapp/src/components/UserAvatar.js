import $ from 'jquery';
import React, {PropTypes, Component} from 'react';


import 'semantic-ui-rating/rating.min.css'
import '../css/UserAvatar.css';


$.rating = require('semantic-ui-rating')

class UserAvatar extends Component {
  static propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const ratingRef = this.refs.ratingRef
    $(ratingRef).rating({
      initialRating: 0,
      maxRating: 5
    })
  }



  render() {
    const {
      url,
      avatarUrl,
      displayName
    }
    = this.props

    return (
      <div className='user-avatar'>
        <a classname='image cover-img-avatar' href={url}>
          <img src={avatarUrl} className='circle-image' alt='img-avatar'/>
        </a>
        <h4 className='avatar-name'>{displayName}</h4>

        <div className="ui star rating" ref="ratingRef"></div>
      </div>
    )
  }

}


export default UserAvatar;
