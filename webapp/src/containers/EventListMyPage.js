import _ from 'lodash';
import React, { Component } from 'react'

import { connect } from 'react-redux';
import classNames from 'classnames';
import { browserHistory, Link } from 'react-router';

import '../css/EventListMyPage.css';

import { parsePaggingParams,
         parseFilterStatusParams } from '../helpers/params'

import EventListItem from '../components/EventListItem'
import Pagination from '../components/Pagination'

import { fetchEventsWithServiceName, 
         getEventsWithServiceName} from '../flux/modules/resource'

// TODO: move const to consts file
const MAX_EVENT_PER_PAGE = 25

const PAGE_TITLES = {
  created: '作ったテーブル',
  joined: '参加したテーブル',
  liked: '気に入ったテーブル'
}

const FILTER_NAMES = {
  all: 'すべて',
  opening: '公開中',
  stopped: '停止中'
}

class EventListMyPage extends Component {

  parsePrams() {
    const {params, location} = this.props
    const {service, status} = params
    const pagging = parsePaggingParams(location, MAX_EVENT_PER_PAGE)

    return {
      service,
      status,
      pagging,
    }
  }

  componentDidMount() {
    this.loadEvents()
  }

  componentWillReceiveProps(nextProps) {
    const lastParams = this.parsePrams()
    const {params, location} = this.props
    const {service, status} = params
    if (service != lastParams.service) {
      console.log("service changed...")
      setTimeout(()=> {this.loadEvents()}, 100)
    }
    else {
      console.log("service not change")
    }
  }

  renderEventList() {
    const {eventItems} = this.props
    const keys = _.keys(eventItems)

    return (
      <div className='block-content'>
        {this.renderStatusFilters()}

        <div className="ui section divider"></div>

        <div className="ui link two stackable cards block-events-content">
          {
            keys.map((key, index) => (
              <EventListItem key={key} {...eventItems[key]}
                closeEvent={() => this.props.closeEvent(key)}
                requestProfit={() => this.props.requestProfit(key)}
                unLike={() => { }}
              />
            ))
          }
        </div>

        {this.renderPagination()}
      </div>
    )
  }

  renderPagination() {
    const {total, current} = this.props
    return (
      <Pagination
        router={this.props.router}
        pathname={'/mypage/events/created'}
        location={this.props.location}
        onChanged={(i) => this.fetchPage(i)}
        total={total}
        current={current} />
    )
  }

  renderPageTitle() {
    const {params} = this.props
    const {service} = params

    return (
      <div className='event-list-title'>
        {PAGE_TITLES[service]}
      </div>
    )
  }

  renderStatusFilters() {
    const {router} = this.props 
    const params = this.parsePrams()
    const filter_keys = _.keys(FILTER_NAMES)

    const menuItems = filter_keys.map((filter, index) => (
      <a  className={classNames({
            'item': true,
            'active': filter === params.status 
          })}
          key={index}
          onClick={()=>{
            const url = `/mypage/events/${params.service}/${filter}`
            browserHistory.push({
              pathname: url,
            })
            setTimeout(()=>{
              this.loadEvents()
            }, 100)
          }}
      >
        {FILTER_NAMES[filter]}
      </a>
    ))

    return (
      <div className="ui secondary menu status-filter-menu">
        {menuItems}

        <div className="right menu">
          <Link to='/create'
            className="ui orange icon button">
            <i className="plus icon"></i>
            新規登録
             </Link>
        </div>
      </div>
    )
  }

  fetchPage(page) {
    let params = this.parsePrams()
    params = Object.assign({}, params, {
      pagging: Object.assign({}, params.pagging, {
        from: page
      })
    })
    this.props.fetchEvents({...params})
  }

  loadEvents() {
    const params = this.parsePrams()
    this.props.fetchEvents({...params})
  }

  render() {
    const {isFetching, errorMessage} = this.props
    let content

    if (isFetching) {
      content = (
        <div> Loading... </div>
      )
    }
    else if (!isFetching && errorMessage) {
      content = (
        <div> System Error: {errorMessage} </div>
      )
    }
    else {
      content = this.renderEventList()
    }

    return (
      <div className='event-list-mypage'>
        {this.renderPageTitle()}
        {content}
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {

  const {params} = ownProps
  const {service, status} = params

  const createdEvent = getEventsWithServiceName(state, service, 'admin', status)
  const {isFetching} = createdEvent
  if (isFetching) {
    return {
      isFetching: true,
    }
  }
  else {
    const {errorMessage, events, total, current} = createdEvent
    return {
      isFetching: false,
      errorMessage: errorMessage,
      eventItems: events,
      total: total,
      current: current
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEvents: ({service, status, pagging={}}) => {
    dispatch(fetchEventsWithServiceName({
      service: service,
      pagging: pagging,
      query: {
        userId: 'admin',
        status: status
      }
    }))
  },
  closeEvent: (eventId) => {
    console.log("request close event: ", eventId)
  },
  requestProfit: (eventId) => {
    console.log("requet profit for: ", eventId)
  }
})

export default connect(mapStateToProps,
  mapDispatchToProps)(EventListMyPage)
