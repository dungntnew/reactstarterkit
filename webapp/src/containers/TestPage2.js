import React, {Component} from 'react';
import {connect} from 'react-redux';

import CreditCard from '../components/credit-card/CreditCard';
import TermsOfService from '../components/fqa/TermsOfService';
import Terms from '../components/fqa/Terms';
import Policy from '../components/fqa/Policy';
import CancelPolicy from '../components/fqa/CancelPolicy';
import Question from '../components/fqa/Question';
import Answer from '../components/fqa/Answer';


// import SignupForm from '../components/auth-forms/SignupForm';
import '../css/TestPage.css';

const test = {
  content: 'fbeg feuig erusigiuegfue gfgue'
}
const content = {
  content: 'fbeg feuig erusigiuegfue gfgue'
}

const policy = {
  content: '標準キャンセルポリシーだお。標準キャンセルポリシーだお。リシーだお。標準キャンセルポリシーだお。'
}

const tests = {
  content: '標準キャンセルポリシーだお。標準キャンセルポリシーだお。リシーだお。標準キャンセルポリシーだお。標準キャンセルポリシーだお。標準キャンセルポリシーだお。リシーだお。標準キャンセルポリシーだお。標準キャンセルポリシーだお。標準キャンセルポリシーだお。リシーだお。標準キャンセルポリシーだお。'
}

const item = {
  'lists': [
  {
    title: 'ngoctien',
    text: 'dhug gwwugfwqu wwugf w'
  },
  {
    title: 'Jollydiem',
    text: 'dhug gwwugfwqu wwugf w'
  },
  {
    title: 'diem khong',
    text: 'dhug gwwugfwqu wwugf w'
  },

  ]
}

const testcontent = {
  content: '標準キャンセルポリシーだお。標準キャンセルポリシーだお。リシーだお。標準キャンセルポリシーだお。標準キャンセルポリシーだお。標準キャンセルポリシーだお。リシーだお。標準キャンセルポリシーだお'
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
        <TermsOfService {...test}/>
        <Terms {...content}/>
        <Policy {...policy}/>
        <CancelPolicy {...tests}/>
        <Question {...item}/>
        <Answer {...testcontent}/>

     </div>
  </div>
)
