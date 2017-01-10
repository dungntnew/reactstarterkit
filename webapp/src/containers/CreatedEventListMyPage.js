import _ from 'lodash';
import React, {Component, PropTypes} from 'react'

import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router';
import '../css/CreatedEventListMyPage.css';

import {parsePaggingParams} from '../helpers/params'

import EventListItem from '../components/EventListItem'
import Pagination from '../components/Pagination'

import {fetchCreatedEventsIfNeed} from '../flux/modules/created_event'


// TODO: move const to consts file
const DEFAULT_MAX_EVENT_PER_PAGE = 25


class CreatedEventListMyPage extends Component {
    constructor(props) {
      super(props)

      this.state = {
        filterTag: 'all'
      }
    }

    static propTypes = {

    }

    parsePrams() {
      const {location} = this.props
      return parsePaggingParams(location, DEFAULT_MAX_EVENT_PER_PAGE)
    }

    componentDidMount(){
      const params = this.parsePrams()
      const {from, limit} = params
      this.props.fetchEvents(limit, from, 'all')
    }

    fetchPage(page) {
      const params = this.parsePrams()
      const {limit} = params
      this.props.fetchEvents(limit, page, 'all')
    }

    componentDidUpdate() {

    }

    renderEventList() {
      const {eventItems} = this.props
      const keys= _.keys(eventItems)

      return (
        <div>
          {this.renderStatusFilters()}

          <div className="ui section divider"></div>

          <div className="ui items">
            {
              keys.map((key, index) => (
                <EventListItem key={key} {...eventItems[key]}
                               closeEvent={()=> this.props.closeEvent(key) }
                               requestProfit={()=> this.props.requestProfit(key) }
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
             onChanged={(i)=> this.fetchPage(i)}
             total={total}
             current={current}/>
        )
    }

    renderPageTitle() {
      return (
        <div className='event-list-title'>
           登録したテーブル
        </div>
      )
    }

    renderStatusFilters() {
      const filters = ["all", "opening", "stopped"]
      const filterNames = ["すべて", "公開中", "停止中"]

      const menuItems = filters.map((filter, index)=>(
        <a className={classNames({
          "item": true,
          "active": this.state.filterTag === filter
        })}
          onClick={()=> this.execFilter(filter)}
          key={index}
        >
        {filterNames[index]}
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

    execFilter(filter) {

      console.log("dispatch filter event list")
      this.setState({
        filterTag: filter
      })
      const params = this.parsePrams()
      const {from, limit} = params
      this.props.fetchEvents(limit, from, filter)
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
        <div className='created-event-list-mypage'>
          <div className='ui text container'>
            {this.renderPageTitle()}
            {content}
          </div>

          <div>
            <button onClick={
                ()=> {this.props.fetchEvents()}}>
                refresh
            </button>
          </div>
        </div>
      )
    }
}


const mapStateToProps = (state, ownProps) => {
  const {createdEvent} = state
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
  fetchEvents: (limit, from, filter)=> {
    dispatch(fetchCreatedEventsIfNeed(filter, limit, from))
  },
  closeEvent: (eventId) => {
    console.log("request close event: ", eventId)
  },
  requestProfit: (eventId) => {
    console.log("requet profit for: ", eventId)
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(CreatedEventListMyPage)
