import _ from 'lodash'
import React, { Component,
                PropTypes } from 'react'

import { connect } from 'react-redux'
import {Link} from 'react-router';

import EventItem from '../components/EventItem';
import '../css/TopNEvents.css';

import {fetchTopNEvents, getTopNEvents} from '../flux/modules/resource'

class TopNEvents extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    linkTitle: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired
  }

  componentDidMount() {
    this.props.refresh()
  }

  renderLink(filter, linkTitle) {
    return  (
      <Link to={`/events/${filter}`}>{linkTitle}</Link>
    )
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

  renderEventItems(filter, limit) {
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
    const {title, filter, linkTitle, limit} = this.props
    const link = this.renderLink(filter, linkTitle)
    const blockContent = this.renderEventItems(filter, limit)

    return (
      <div className='top-n-events'>
        <div className='block-events-header'>
           <div className='block-events-title'>{title} </div>
           <div className='block-events-link'>{link} <i className="angle right icon"></i></div>
        </div>
         <div className="ui link three stackable cards block-events-content">
             {blockContent}
         </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {filter} = ownProps
  const {isFetching, events} = getTopNEvents(state, filter)

  return {
    isFetching,
    events
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  refresh: ()=> {
    const {filter, limit} = ownProps
    dispatch(fetchTopNEvents({pagging: {limit: limit}, query:{[filter]: 1}}))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(TopNEvents)
