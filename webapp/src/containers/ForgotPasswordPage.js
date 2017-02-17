import React, {Component} from 'react';
import {connect} from 'react-redux';


import InputMailForm from '../components/auth-forms/InputMailForm';

class ForgotPasswordPage extends Component {
    render() {
      return (
        <div className='forgot-password-page'>
            <InputMailForm
              onSubmit={()=>{console.log("reset password .....")}}
             />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps,
                       mapDispatchToProps)(ForgotPasswordPage)
