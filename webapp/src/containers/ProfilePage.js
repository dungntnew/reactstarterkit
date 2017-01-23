import _ from 'lodash';
import $ from 'jquery';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/ProfilePage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import EditableMemberProfile from '../components/EditableMemberProfile'

import EventListItem from '../components/EventListItem'
import Pagination from '../components/Pagination'

import {parsePaggingParams} from '../helpers/params'

import {fetchUserDetailIfNeed} from '../flux/modules/selected_user'

import {fetchJoinedEventsIfNeed} from '../flux/modules/joined_event'
import {fetchCreatedEventsIfNeed} from '../flux/modules/created_event'
import {fetchLikedEventsIfNeed} from '../flux/modules/liked_event'


// TODO: add links:
// /members/userId/joined -> Tab Link in Cover Module
// /members/userId/liked
// /members/userId/created
// TODO: add userId as params for fetch event APIs

// TODO: move const to consts file
const DEFAULT_MAX_EVENT_PER_PAGE = 25

class ProfilePage extends Component {

	componentDidMount(){
	   const {userId, filter} = this.props.params
	   const params = this.parsePrams()
	   const {from, limit} = params

	   this.props.loadUser(userId)
	   this.props.loadEvents(userId, filter, from, limit)
	}

	renderLoading() {
		return (
		  <div> loading.. </div>
		)
	}

	renderPageContent() {
		const {userProfile, isSaving, updateProfile} = this.props
		const {filter} = this.props.params

		return (
			<div>
			  <EditableMemberProfile
				   data={userProfile}
				   isSaving={isSaving}
				   filter={filter}
				   onSubmit={updateProfile}
			  />
			  {this.renderEventList()}
			</div>
		)
	}

	renderEventList() {
	  const {filter} = this.props.params
	  const {eventItems} = this.props
	  const keys= _.keys(eventItems)

	  return (
		<div className='ui container block-content'>
		  <div className="ui link three stackable cards">
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
	  const {userId} = this.props.params
	  let {filter} = this.props.params
	  filter = filter || 'joined'

	  const pathName = `/members/${userId}/${filter}`

	  return (
		  <Pagination
			 router={this.props.router}
			 pathname={pathName}
			 location={this.props.location}
			 onChanged={(i)=> this.fetchPage(i)}
			 total={total}
			 current={current}/>
		)
	}

	parsePrams() {
	  const {location} = this.props
	  return parsePaggingParams(location, DEFAULT_MAX_EVENT_PER_PAGE)
	}

	fetchPage(page) {
	  const {userId, filter} = this.props.params
	  const params = this.parsePrams()
	  const {limit} = params

	  this.props.loadUser(userId)
	  this.props.loadEvents(userId, filter, page, limit)
	}

	render(){
	  const {isFetching, errorMessage} = this.props
	  let content

	  if (isFetching) {
		content = this.renderLoading()
	  }
	  else if (!isFetching && errorMessage) {
		content = (
		  <div> System Error: {errorMessage} </div>
		)
	  }
	  else {
		content = this.renderPageContent()
	  }

	  return (
		<div className='profile-page'>
		  <PageHeader>
			<Logo color={true}/>
			<QuickSearchBar location={this.props.location} params={this.props.params}/>
			<TopNav />
		  </PageHeader>
		  {content}
		  <PageFooter />
		</div>
	  )
	}
 }

const mapStateToProps = (state, ownProps) => {
  const {filter} = ownProps.params
  const {selectedUser} = state


  // get event list seperated by current filter
  // filter in [hosted, created, liked, joined]
  let eventStateBlock = state.joinedEvent

  if (filter === 'hosted' || filter === 'created') {
	eventStateBlock = state.createdEvent
  }
  else if (filter == 'liked') {
	eventStateBlock = state.likedEvent
  }

  if (selectedUser.isFetching || eventStateBlock.isFetching) {
	return {
	  isFetching: true,
	}
  }
  else {
	const {errorMessage, events, total, current} = eventStateBlock
	const {data, isSaving} = selectedUser
	return {

	  // global state
	  isFetching: false,
	  errorMessage: errorMessage || selectedUser.errorMessage,

	  // event list state
	  eventItems: events,
	  total: total,
	  current: current,

	  // user-profile state
	  userProfile: data,
	  isSaving: isSaving,
	}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadUser: (userId) => {
		dispatch(fetchUserDetailIfNeed(userId))
	},
	loadEvents: (userId, filter, page, limit) => {
		// todo add userId as params to fetch event func

		if (filter === 'hosted' || filter === 'created') {
			dispatch(fetchCreatedEventsIfNeed('all', limit, page))
		}
		else if (filter === 'liked') {
			dispatch(fetchLikedEventsIfNeed('all', limit, page))
		}
		else {
			dispatch(fetchJoinedEventsIfNeed('all', limit, page))
		}
	},
	unLikeEvent: (eventId) => {
	  console.log('request unlike: ', eventId)
	},
	closeEvent: (eventId) => {
	  console.log("request close event: ", eventId)
	},
	requestProfit: (eventId) => {
	  console.log("requet profit for: ", eventId)
	},
	updateProfile: (data) => {
	  console.log("saving: ", data)
	},
})

export default connect(mapStateToProps,
					   mapDispatchToProps)(ProfilePage)
