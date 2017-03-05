import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../css/LoginPage.css';

import LoginForm from '..//../components/auth-forms/LoginForm';

import {asyncAuthByEmailAndPassword} from '..//../flux/modules/auth';
import {commingSoon} from '../../helpers';

// TODO: cannot go login page after have an error message
// FIX IT!
class LoginPage extends Component {

    componentDidMount() {
      const {authenticated} = this.props
      if (authenticated) {
          const {router, location} = this.props;
          const return_to = location.query.return_to || '/';
          console.log("return to: ",return_to);
          router.push(return_to);
          return null;
        }
    }

    componentDidUpdate() {
      const {authenticated} = this.props
      if (authenticated) {
          const {router, location} = this.props;
          const return_to = location.query.return_to || '/';
          console.log("return to: ",return_to);
          router.push(return_to);
          return null;
        }
    }

    render() {
      const {authencating, errorMessage} = this.props
      if (authencating) return null;
    
      return (
        <div className='login-page'>
            <LoginForm
              error={errorMessage}
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
    commingSoon(data);
 },
 onGGAuth: (data) => {
   commingSoon(data);
 },
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(LoginPage)
