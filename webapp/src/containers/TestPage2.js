import React, {Component} from 'react';
import {connect} from 'react-redux';

import CreditCard from '../components/CreditCard';
import '../css/TestPage.css';



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
     </div>
  </div>
)
