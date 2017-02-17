import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/ProfilePage.css';

import EditableMemberProfile from '../components/EditableMemberProfile'
import {FetchableEventList} from '../containers/event/FetchableEventList';

import {fetchUserDetailIfNeed, getUserData} from '../flux/modules/resource';
import {eventListForTabId} from '../helpers/query_builder';

class ProfilePage extends Component {
	componentDidMount() {
		const {userId} = this.props.params
		this.props.loadUser(userId)
	}

	render() {
		const {userProfile, isSaving, updateProfile} = this.props
		if (!userProfile) {
			return null
		}

		const {userId, filter} = this.props.params
		const {query, pagging} = eventListForTabId(userId, filter)
		const pathname = `/members/${userId}/${filter}`

		return (
			<div className='profile-page'>
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
}

const mapStateToProps = (state, ownProps) => {
	const {isSaving, data} = getUserData(state)
	return {
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
