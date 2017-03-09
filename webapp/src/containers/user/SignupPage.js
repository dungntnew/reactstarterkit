import React, {Component} from 'react';
import {connect} from 'react-redux';


import SignupForm from '../../components/auth-forms/SignupForm';
import {commingSoon} from '../../helpers';
import {syncRegisterByEmailAndPassword} from '../../flux/modules/auth';

class SignupPage extends Component {
    
    componentDidMount() {
      const {router, registered, user} = this.props;
      if (registered) {
        router.push('/login')
      } 
    }

    componentDidUpdate() {
      const {router, registered, user} = this.props;
      if (registered) {
        router.push('/login')
      } 
    }


    render() {
      const {errorMessage} = this.props;
      return (
        <div className='signup-page'>
            <SignupForm
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
  const {registering, registered, errorMessage, user} = auth

  return {
    registering, registered, errorMessage, user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
   onEmailAuth: (data) => {
     dispatch(syncRegisterByEmailAndPassword(data))
    },
    onFBAuth: (data) => {
        commingSoon(data);
    },
    onGGAuth: (data) => {
      commingSoon(data);
    },
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(SignupPage)
