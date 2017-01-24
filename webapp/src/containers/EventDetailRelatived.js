import _ from 'lodash'
import React, { Component,
                PropTypes } from 'react'

import { connect } from 'react-redux'

import EventItem from '../components/EventItem';
import '../css/TopNEvents.css';
import '../css/EventDetailRelatived.css';

import {fetchRelativedEventsIfNeed} from '../flux/modules/relatived_event'

class EventDetailRelatived extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    from: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const {eventId, limit, from} = this.props
    this.props.refresh(eventId, limit, from)
  }

  renderLoading() {
    return (
      <h4>Loading...</h4>
    )
  }

  renderEmpty() {
    return (
      <h4>Empty</h4>
    )
  }

  renderEventItems(eventId, limit) {
    const {isFetching, events} = this.props

    if (isFetching) {
      return this.renderLoading()
    } else if (!events || events.length === 0){
      return this.renderEmpty()
    }
    else {
      const keys = _.keys(events)
      return keys.map((key, index) => (
        <EventItem key={key} {...events[key]}/>
      ))
    }
  }

  render() {
    const {eventId, limit} = this.props
    const blockContent = this.renderEventItems(eventId, limit)

    return (
      <div className='top-n-events'>
        <div className='block-events-header'>
           <div className='block-events-title'>関連するテーブル</div>
        </div>
         <div className="ui link three stackable cards block-events-content">
             {blockContent}
         </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {eventId, limit} = ownProps
  const {relativedEvent} = state
  const {isFetching} = relativedEvent

  if (isFetching) {
    return {
      isFetching: true,
    }
  }
  else {
    const {errorMessage, events, total, current} = relativedEvent
    return {
      limit: limit,
      isFetching: false,
      errorMessage: errorMessage,
      eventId: eventId,
      events: events,
      total: total,
      current: current
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: (eventId, limit, from)=> {
    dispatch(fetchRelativedEventsIfNeed(eventId, limit, from))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailRelatived)
