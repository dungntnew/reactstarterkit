import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/LoginPage.css';

import LoginForm from '../components/auth-forms/LoginForm';

import {asyncAuthByEmailAndPassword} from '../flux/modules/auth';

// TODO: cannot go login page after have an error message
// FIX IT!
class LoginPage extends Component {

    render() {
      const {authencating} = this.props
      if (authencating) return null;

      return (
        <div className='login-page'>
            <LoginForm
              onSubmit={this.props.onEmailAuth}
              onFBAuth={this.props.onFBAuth}
              onGGAuth={this.props.onGGAuth}
             />
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
    console.log('この機能は開発中です！')
 },
 onGGAuth: (data) => {
   console.log('この機能は開発中です！')
 },
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(LoginPage)
