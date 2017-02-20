import React, {Component} from 'react';
import {connect} from 'react-redux';


import SignupForm from '../../components/auth-forms/SignupForm';

class SignupPage extends Component {
    render() {
      return (
        <div className='signup-page'>
            <SignupForm
              onSubmit={()=>{console.log("sigup .....")}}
             />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps,
                       mapDispatchToProps)(SignupPage)
