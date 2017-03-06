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
    rank: PropTypes.number.isRequired,
    createdEventsCount: PropTypes.number.isRequired,
    editable: PropTypes.bool,
    onEdit: PropTypes.func,
  }

  componentDidMount() {
    const {ratingRef} = this.refs
    const {rank} = this.props

    $(ratingRef).rating({
      initialRating: rank,
      maxRating: 5
    })
    .rating('disable', true)
  }

  renderEditButton() {
    return (
      <div className='edit'>
        <a onClick={()=>{
          if (this.props.onEdit)
            this.props.onEdit()
        }}>Edit</a>
      </div>
    )
  }

  render() {
    const {
      url,
      avatarUrl,
      displayName,
      createdEventsCount
    }
    = this.props

    return (
      <div className='user-avatar'>
        <a className='image cover-img-avatar' href={url}>
          <img src={avatarUrl} className='circle-image' alt='img-avatar'/>
        </a>
        {this.props.editable&& this.renderEditButton()}
        <div className='user-description'>
          <h3 className='avatar-name'>{displayName}</h3>
          <div className="ui star rating" ref="ratingRef"></div>
          <div className='createdEventCount'>テーブル数 {createdEventsCount}</div>
        </div>
      </div>
    )
  }
}

export default UserAvatar;
