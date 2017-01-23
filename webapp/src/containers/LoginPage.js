import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/LoginPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import LoginForm from '../components/auth-forms/LoginForm';

import {asyncAuthByEmailAndPassword} from '../flux/modules/auth';

// TODO: cannot go login page after have an error message
// FIX IT!
class LoginPage extends Component {

    componentDidMount(){
    }

    componentDidUpdate() {
    }

    renderLoginForm() {
      return <LoginForm
         onSubmit={this.props.onEmailAuth}
         onFBAuth={this.props.onFBAuth}
         onGGAuth={this.props.onGGAuth}
      />
    }

    render() {
      const {authencating, errorMessage} = this.props
      let content

      if (authencating) {
        content = (
          <div> Authenticating... </div>
        )
      }
      else if (!authencating && errorMessage) {
        content = (
          <div> Authentication Error: {errorMessage} </div>
        )
      }
      else {
        content = this.renderLoginForm()
      }

      return (
        <div className='login-page'>
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
};

const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  const {authenticating, authenticated, errorMessage, data} = auth

  return {
    authenticating,
    authenticated,
    errorMessage,
    data: data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
 onEmailAuth: ({email, password}) => {
    dispatch(asyncAuthByEmailAndPassword(email, password))
 },
 onFBAuth: (data) => {
    console.log('not impl auth fb yet')
 },
 onGGAuth: (data) => {
   console.log('not impl auth gg yet')
 },
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(LoginPage)
