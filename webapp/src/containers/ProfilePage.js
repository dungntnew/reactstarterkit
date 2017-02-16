import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/ProfilePage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import EditableMemberProfile from '../components/EditableMemberProfile'
import {FetchableEventList} from '../containers/event/FetchableEventList';
import {isLoading} from '../flux/modules/loading';
import {fetchUserDetailIfNeed} from '../flux/modules/selected_user';

const MAX_EVENT_PER_PAGE = 25

class ProfilePage extends Component {

	componentDidMount() {
		const {userId} = this.props.params
		this.props.loadUser(userId)
	}

	renderLoading() {
		return (
			<div> loading.. </div>
		)
	}

	renderErrors(errorMessage) {
		return (
			<div> System Error: {errorMessage} </div>
		)
	}

	renderPageContent() {
		const {userProfile, isSaving, updateProfile} = this.props
		const {userId, filter} = this.props.params
        
		const pathname = `/members/${userId}/${filter}`
		
		let query = {}
		if (filter === 'joined') {
			query = Object.assign({}, query, {joiners: [userId]})
		}
		else if (filter === 'created') {
			query = Object.assign({}, query, {createdBy: userId})
		}
		else if (filter === 'liked') {
			query = Object.assign({}, query, {likes: [userId]})
		}

		return (
			<div>
				<EditableMemberProfile
					data={userProfile}
					isSaving={isSaving}
					filter={filter}
					onSubmit={updateProfile}
				/>
				<FetchableEventList 
				router={this.props.router}
				location={this.props.location}
				query={query}
				pagging={{limit: MAX_EVENT_PER_PAGE}}
				paginated={true}
				pathname={pathname}
				listClassName='ui link three stackable cards block-events-content'
				/>
			</div>
		)
	}


	render() {
		const {isFetching, errorMessage} = this.props
		let content

		if (isFetching) {
			content = this.renderLoading()
		}
		else if (!isFetching && errorMessage) {
			content = this.renderErrors(errorMessage)
		}
		else {
			content = this.renderPageContent()
		}

		return (
			<div className='profile-page'>
				<PageHeader>
					<Logo color={true} />
					<QuickSearchBar location={this.props.location} params={this.props.params} />
					<TopNav />
				</PageHeader>
				{content}
				<PageFooter />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const {selectedUser} = state

	if (selectedUser.isFetching || isLoading(state)) {
		return {isFetching: true}
	}

    const {data, isSaving} = selectedUser

	return {
		// global state
		isFetching: false,
		errorMessage: selectedUser.errorMessage,

		// user-profile state
		userProfile: data,
		isSaving: isSaving,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadUser: (userId) => {
		dispatch(fetchUserDetailIfNeed(userId))
	},
	updateProfile: (data) => {
		console.log("saving: ", data)
	}
})

export default connect(mapStateToProps,
	mapDispatchToProps)(ProfilePage)
