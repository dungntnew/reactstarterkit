import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';

import '../css/EventDetailCover.css';

import CoverImage from '../components/CoverImage';
import UserAvatar from '../components/UserAvatar';

class EventDetailCover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  static propTypes = {
  }

  backgroundUrl() {
    const {activeIndex} = this.state
    const {images} = this.props
    if (images && images[activeIndex]) {
      return images[activeIndex]
    }else {
      return `${process.env.PUBLIC_URL}/img/cover-01.jpg`
    }
  }

  showMore() {
    console.log('show more images')
  }

  renderImageThumbnail() {
    const moreLink = (
      <div className='item' onClick={()=>{this.showMore()}}>
        <div className='show-more'>
          <i className="eye icon show" aria-hidden="true"></i>
          <span className='text-show'>もっとみる</span>
        </div>
      </div>
    )

    const thumbnails = this.props.images.map((url, index)=>(
      <div
        className={classNames({
          'item': true,
          'active': index === this.state.activeIndex
        })}
        key={index}
      >
      <img
          className={
            classNames({
              'ui small bordered image': true,
            })
          }

          src={url}
          onClick={
            ()=> this.setState({activeIndex: index})
          }/>
      </div>
    ))

    return (
      <div className='ui horizontal selection list thumbnails'>
         {thumbnails}
         {moreLink}
      </div>
    )
  }

  renderUserAvar() {
    return (
      <UserAvatar {...this.props.user}/>
    )
  }

  render() {
    const backgroundUrl = this.backgroundUrl()

    return (
      <div className="event-detail-cover">
        <CoverImage backgroundUrl={backgroundUrl}>
           {this.renderUserAvar()}
           {this.renderImageThumbnail()}
        </CoverImage>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {selectedEvent} = state
  return {
    images: [
      '/img/event-1.jpg',
      '/img/event-2.jpg',
      '/img/event-3.jpg',
    ],
    user: {
      avatarUrl: '/img/avatar-01.png',
      displayName: 'Kirito',
      url: '/member/kirito',
      rank: 4,
      createdEventCount: 24,
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailCover)
