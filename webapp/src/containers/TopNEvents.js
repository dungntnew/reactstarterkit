import React, { Component,
                PropTypes } from 'react'

import { connect } from 'react-redux'
import {Link} from 'react-router';

import EventItem from '../components/EventItem';
import '../css/TopNEvents.css';

const event = {
    coverImageUrl: '/img/event.png',
    price: 100,
    title: 'Test Event',
    address: 'Yokohama Tokyo',
    tags: ['A', 'B', 'C'],
    target: 'niku',
    targetName: '肉',
    joinerCount: 5,
    joinerLimit:　10,
    openDate: '20160112',
    registrationDateStart: '20160112',
    registrationDateEnd:'20160112',
    url: '/events/1',
}

class TopNEvents extends Component {
  static propTypes = {
  }

  renderLink(filter, linkTitle) {
    return  (
      <Link to={`/events/${filter}`}>{linkTitle}</Link>
    )
  }

  renderEventItems(filter, limit) {
    const events = [1, 2, 3, 4]
    return events.map((e, index) => (
      <EventItem key={index} {...event}/>
    ))
  }

  render() {
    const {title, filter, linkTitle, limit} = this.props
    const link = this.renderLink(filter, linkTitle)
    const blockContent = this.renderEventItems(filter, limit)

    return (
      <div className='top-n-events'>
        <div className='block-events-header'>
           <div className='block-events-title'>{title} </div>
           <div className='block-events-link'>{link} </div>
        </div>
         <div className="ui link cards block-events-content">
             {blockContent}
         </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(TopNEvents)
