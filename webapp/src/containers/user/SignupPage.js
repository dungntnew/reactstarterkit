import React, {Component} from 'react';
import {connect} from 'react-redux';


import SignupForm from '../../components/auth-forms/SignupForm';
import {commingSoon} from '../../helpers';
import {syncRegisterByEmailAndPassword} from '../../flux/modules/auth';

class SignupPage extends Component {
    render() {
      return (
        <div className='signup-page'>
            <SignupForm
              onSubmit={this.props.onEmailAuth}
              onFBAuth={this.props.onFBAuth}
              onGGAuth={this.props.onGGAuth}
             />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => ({
})

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
