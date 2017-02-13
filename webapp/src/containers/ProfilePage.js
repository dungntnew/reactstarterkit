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

import { fetchUserDetailIfNeed } from '../flux/modules/selected_user'


// TODO: move const to consts file
const DEFAULT_MAX_EVENT_PER_PAGE = 25

class ProfilePage extends Component {

	componentDidMount() {
		const {userId, filter} = this.props.params
		const params = this.parsePrams()
		const {from, limit} = params

		this.props.loadUser(userId)
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
	const {filter} = ownProps.params
	const {selectedUser} = state

	if (selectedUser.isFetching) {
		return {
			isFetching: true,
		}
	}
	else {
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
