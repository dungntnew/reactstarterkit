import React, {Component} from 'react';
import {connect} from 'react-redux';

import CreditCard from '../components/credit-card/CreditCard';
import RegisterProfile from '../components/credit-card/RegisterProfile';
import RegisterOk from '../components/credit-card/RegisterOk';
import CreditCardOk from '../components/credit-card/CreditCardOk';
// import SignupForm from '../components/auth-forms/SignupForm';
import '../css/TestPage.css';

const test = {
  url: 'ngoctien/1',
  urlRegister: 'register/1'
}

/* Put your component to here to view */
export default (props) => (
  <div>
     <p> This is TestPage, you can quick place your component to view</p>
     <pre>
          "TestComponent"  => "YourComponent"
     </pre>
     <hr/>
     <div className='test-page-wrapper'>

        <CreditCard />
        <RegisterProfile />
        <RegisterOk {...test}/>
        <CreditCardOk />
     </div>
  </div>
)
