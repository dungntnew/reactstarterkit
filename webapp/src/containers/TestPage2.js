import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/TestPage.css';
import LoginForm from '../components/auth-forms/LoginForm';
import SignupForm from '../components/auth-forms/SignupForm';
import InputMailForm from '../components/auth-forms/InputMailForm';
import ResetPassForm from '../components/auth-forms/ResetPassForm';
import SendMailOk from '../components/auth-forms/SendMailOk';
import ResetPassOk from '../components/auth-forms/ResetPassOk';



/* Put your component to here to view */
export default (props) => (
  <div>
     <p> This is TestPage, you can quick place your component to view</p>
     <pre>
          "TestComponent"  => "YourComponent"
     </pre>
     <hr/>
    <div className='ui middle aligned center aligned grid'>
      <div className='column'>

        <h3> put your code here </h3>
        <LoginForm />
        <SignupForm />
        <InputMailForm />
        <ResetPassForm />
        <SendMailOk />
        <ResetPassOk />
      </div>
    </div>
  </div>
)
