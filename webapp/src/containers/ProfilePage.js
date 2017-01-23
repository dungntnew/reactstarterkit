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

import {fetchUserDetailIfNeed} from '../flux/modules/selected_user'

class ProfilePage extends Component {

	componentDidMount(){
	   const {userId} = this.props.params
	   this.props.loadUser(userId)
	}

	renderLoading() {
		return (
		  <div> loading.. </div>
		)
	}

	renderPageContent() {
		const {userProfile, isSaving, updateProfile} = this.props

		return (
			<div>
			  <EditableMemberProfile
				   data={userProfile}
				   isSaving={isSaving}
				   onSubmit={updateProfile}
			  />
			</div>
		)
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
  const {selectedUser} = state
  const {isFetching, isSaving, errorMessage, data} = selectedUser

  return {
	userProfile: data,
	isSaving: isSaving,
	isFetching: isFetching,
	errorMessage: errorMessage,
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
