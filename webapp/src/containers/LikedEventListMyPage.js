import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router';

import '../css/LikedEventListMyPage.css';

import {parsePaggingParams} from '../helpers/params'

import EventListItem from '../components/EventListItem'
import Pagination from '../components/Pagination'

import {fetchLikedEventsIfNeed} from '../flux/modules/liked_event'

// TODO: move const to consts file
const DEFAULT_MAX_EVENT_PER_PAGE = 25


class LikedEventListMyPage extends Component {
	constructor(props) {
	  super(props)

	  this.state = {
		filterTag: 'all'
	  }
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
		<div className='block-content'>
		  {this.renderStatusFilters()}

		  <div className="ui section divider"></div>

		  <div className="ui link two stackable cards block-events-content">
			{
			  keys.map((key, index) => (
				<EventListItem key={key} {...eventItems[key]}
							   unLike={()=> this.props.unLikeEvent(key)}
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
			 pathname={'/mypage/events/liked'}
			 location={this.props.location}
			 onChanged={(i)=> this.fetchPage(i)}
			 total={total}
			 current={current}/>
		)
	}

	renderPageTitle() {
	  return (
		<div className='event-list-title'>
		   気に入ったテーブル
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

			{this.renderPageTitle()}
			{content}


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
  const {likedEvent} = state
  const {isFetching} = likedEvent
  if (isFetching) {
	return {
	  isFetching: true,
	}
  }
  else {
	const {errorMessage, events, total, current} = likedEvent
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
	dispatch(fetchLikedEventsIfNeed(filter, limit, from))
  },
  unLikeEvent: (eventId) => {
	console.log('request unlike: ', eventId)
  },
  closeEvent: (eventId) => {
	console.log("request close event: ", eventId)
  },
  requestProfit: (eventId) => {
	console.log("requet profit for: ", eventId)
  }
})

export default connect(mapStateToProps,
					   mapDispatchToProps)(LikedEventListMyPage)
