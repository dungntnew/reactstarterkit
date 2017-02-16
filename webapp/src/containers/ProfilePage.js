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
import {fetchUserDetailIfNeed, getUserData} from '../flux/modules/resource';

import {eventListForTabId} from '../helpers/query_builder';


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
		if (!userProfile) {
			return;
		}
		
		const {userId, filter} = this.props.params

		const {query, pagging} = eventListForTabId(userId, filter)
		const pathname = `/members/${userId}/${filter}`

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
				pagging={pagging}
				paginated={true}
				pathname={pathname}
				listClassName='ui link three stackable cards block-events-content'
				/>
			</div>
		)
	}

	render() {
		return (
			<div className='profile-page'>
				<PageHeader>
					<Logo color={true} />
					<QuickSearchBar location={this.props.location} params={this.props.params} />
					<TopNav />
				</PageHeader>
				{this.renderPageContent()}
				<PageFooter />
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const {isSaving, data} = getUserData(state)

	return {
		//user-profile state
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
