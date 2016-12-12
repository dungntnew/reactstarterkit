import $ from 'jquery';
import React, {PropTypes, Component} from 'react';


import 'semantic-ui-rating/rating.min.css'
import '../css/UserAvatar.css';


$.fn.rating = require('semantic-ui-rating')

class UserAvatar extends Component {
  static propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired
  }

  componentDidMount() {
    const ratingRef = this.refs.ratingRef
    $(ratingRef).rating({
      initialRating: this.props.rank,
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
        <a className='image cover-img-avatar' href={url}>
          <img src={avatarUrl} className='circle-image' alt='img-avatar'/>
        </a>
        <div className='user-description'>
          <h3 className='avatar-name'>{displayName}</h3>
          <div className="ui star rating" ref="ratingRef"></div>
          <div className='createdEventCount'>テーブル数</div>
        </div>

      </div>
    )
  }
}

export default UserAvatar;
