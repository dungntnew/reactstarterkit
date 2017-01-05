import _ from 'lodash'
import React, { Component,
                PropTypes } from 'react'

import { connect } from 'react-redux'
import {Link} from 'react-router';

import EventItem from '../components/EventItem';
import '../css/TopNEvents.css';
import '../css/EventDetailRelatived.css';

import {fetchTopNEventsIfNeed} from '../flux/modules/top_event'

class EventDetailRelatived extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired
  }

  componentDidMount() {
    this.props.refresh()
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

/*
TODO:// change top event data to truly related events
// now for test UI using templ Top N event data
*/

const mapStateToProps = (state, ownProps) => {
  // const {eventId} = ownProps
  const block = state.topEvent["special"]
  const eventId = "test-event-1"
  return {
    eventId: eventId,
    limit: 3,
    isFetching: false,
    events: block.events
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: ()=> {
    const {eventId, limit} = ownProps
    dispatch(fetchTopNEventsIfNeed("special", 3))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailRelatived)
