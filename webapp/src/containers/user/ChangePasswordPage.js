import React, {Component} from 'react';
import {connect} from 'react-redux';


import ChangePasswordForm from '../../components/auth-forms/ChangePasswordForm';

class ChangePasswordPage extends Component {
    render() {
      return (
        <div className='change-password-page'>
            <ChangePasswordForm
              onSubmit={()=>{console.log("change password .....")}}
             />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps,
                       mapDispatchToProps)(ChangePasswordPage)
