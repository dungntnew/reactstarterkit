import $ from 'jquery';
import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'

import '../../css/EventDetailCover.css';

import CoverImage from '../../components/CoverImage';
import UserAvatar from '../../components/UserAvatar';
import EventImageSlider from '../../components/EventImageSlider';

$.fn.transition = require('semantic-ui-transition')
$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.modal = require('semantic-ui-modal')

import {getEventData} from '../../flux/modules/resource';

class EventDetailCover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  backgroundUrl() {
    const {activeIndex} = this.state
    const {images, coverImageUrl} = this.props
    const eventImages = [{id: -1, photoUrl: coverImageUrl}, ...images]
    
    if (eventImages[activeIndex]) {
      return eventImages[activeIndex].photoUrl
    }else {
      return coverImageUrl
    }
  }

  showMore() {
    $(this.refs.eventImageSlider).modal('show')
  }

  renderEventImageSlider() {
    const {activeIndex} = this.state

    const {images, coverImageUrl} = this.props
    const eventImages = [{id: -1, photoUrl: coverImageUrl}, ...images]

    return (
      <div className='ui basic modal' ref='eventImageSlider'>
          <div className="actions">
            <div className="ui basic cancel inverted">
              <i className="remove icon big"></i>
            </div>
          </div>
          <div className='content'>
            <EventImageSlider images={eventImages} startIndex={activeIndex}/>
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

    const {images, coverImageUrl} = this.props
    const eventImages = [{id: -1, photoUrl: coverImageUrl}, ...images]

    const thumbnails = eventImages.slice(0, 5).map((image, index)=>(
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

          src={image.photoUrl}
          onClick={
            ()=> this.setState({activeIndex: index})
          }
          alt='thumbnail'
          />
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
  const {isFetching, data} = getEventData(state)

  if (!isFetching) {
    const {eventImages, coverImageUrl} = data
    const {owner} = data
    const user = Object.assign({}, owner, {
      url: '/members/' + owner.id,
      rank: _.floor(owner.rating || 0),
    })

    return {
      isFetching: false,
      images: eventImages,
      coverImageUrl: coverImageUrl,
      user: user,
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
