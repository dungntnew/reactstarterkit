import $ from 'jquery';
import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';

import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'

import '../css/EventDetailCover.css';

import CoverImage from '../components/CoverImage';
import UserAvatar from '../components/UserAvatar';
import EventImageSlider from '../components/EventImageSlider';

$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.modal = require('semantic-ui-modal')

class EventDetailCover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }

  backgroundUrl() {
    const {activeIndex} = this.state
    const {images, coverImageUrl} = this.props
    if (images && images[activeIndex]) {
      return images[activeIndex]
    }else {
      return coverImageUrl
    }
  }

  showMore() {
    $(this.refs.eventImageSlider).modal('show')
  }

  renderEventImageSlider() {
    const {images} = this.props
    const {activeIndex} = this.state

    return (
      <div className='ui basic modal' ref='eventImageSlider'>
          <div className="actions">
            <div className="ui basic cancel inverted">
              <i className="remove icon big"></i>
            </div>
          </div>
          <div className='content'>
            <EventImageSlider images={images} startIndex={activeIndex}/>
          </div>
      </div>
    )
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

    const thumbnails = this.props.images.slice(0, 4).map((url, index)=>(
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

  renderLoading() {
    return (
      <div> loading.. </div>
    )
  }

  render() {
    const {isFetching} = this.props
    if (!isFetching) {
      const backgroundUrl = this.backgroundUrl()

      return (
        <div className="event-detail-cover">
          <CoverImage backgroundUrl={backgroundUrl}>
             {this.renderUserAvar()}
             {this.renderImageThumbnail()}
          </CoverImage>
          {this.renderEventImageSlider()}
        </div>
      )
    }
    else {
      return this.renderLoading()
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const {selectedEvent} = state
  const {isFetching, data} = selectedEvent

  if (!isFetching) {
    const {eventImageUrls, coverImageUrl} = data
    const {owner} = data

    return {
      isFetching: false,
      images: eventImageUrls,
      coverImageUrl: coverImageUrl,
      user: owner
    }
  }
  else {
    return {
      isFetching: true
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailCover)
