import React, {Component} from 'react';
import {connect} from 'react-redux';

import CreditCard from '../components/credit-card/CreditCard';
import CreditCardOk from '../components/credit-card/CreditCardOk';
import BillCreateForm from '../components/bills/BillCreateForm';
import ProfitHistory from '../components/bills/ProfitHistory';
import BillList from '../components/bills/BillList';
import RequestOK from '../components/bills/RequestOK';
// import SignupForm from '../components/auth-forms/SignupForm';
import '../css/TestPage.css';

const test = {
  url: 'ngoctien/1',
  amount: 5
}

const content = {
  profitTotal: 5,
  eventCount: 10,
  listEvent: [
    {
    event_title: 'nfiaguifeegiu',
    event_price: 234
    },

    {
    event_title: 'nfiaguifeegiu',
    event_price: 234
    }
  ]
}

const history = {
  listInvoice: [
  {
    submitDate: '45/23/4',
    bankName: 'tienbank',
    accountName: 'ngoctien',
    amount: 123
  },
  {
    submitDate: '45/23/4',
    bankName: 'tienbank',
    accountName: 'ngoctien',
    amount: 123
  },
  {
    submitDate: '45/23/4',
    bankName: 'tienbank',
    accountName: 'ngoctien',
    amount: 123
  }

  ]
}

const text = {
  url: 'ngoc/tien'
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
        <CreditCardOk />
        <BillCreateForm {...test}/>
        <ProfitHistory {...content}/>
        <BillList {...history}/>
        <RequestOK {...text}/>
     </div>
  </div>
)
