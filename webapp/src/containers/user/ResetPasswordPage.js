import React, {Component} from 'react';
import {connect} from 'react-redux';


import ResetPassForm from '../../components/auth-forms/ResetPassForm';

class ResetPasswordPage extends Component {
    render() {
      return (
        <div className='reset-password-page'>
            <ResetPassForm
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
                       mapDispatchToProps)(ResetPasswordPage)
