import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/TestPage.css';

import EventEditSteps from '../components/EventEditSteps';

import {fetchTopNEventsIfNeed} from '../flux/modules/top_event'

const loadButton = (props) => (
  <button onClick={(e) => {
    e.preventDefault()
    props.exec()
  }}>
  Load
  </button>
);

const BTN = connect((state)=>({}), (dispatch) => ({
  'exec': ()=> {
    console.log("running: ", dispatch)
    dispatch(fetchTopNEventsIfNeed('latest', 10))
    dispatch(fetchTopNEventsIfNeed('trend', 10))
    dispatch(fetchTopNEventsIfNeed('special', 10))
  }
}))(loadButton)

const steps = [
  {
    title: "Input",
    desc: "Input your name",
    completed: true,
    active: false
  },
  {
    title: "Confirm",
    desc: "Confimr your name",
    completed: true,
    active: false
  },
  {
    title: "Finish",
    desc: "Already",
    completed: false,
    active: true
  }
]
/* Put your component to here to view */
export default (props) => (
  <div>
     <p> This is TestPage, you can quick place your component to view</p>
     <pre>
          "TestComponent"  => "YourComponent"
     </pre>
     <hr/>
     <div className='test-page-wrapper'>
     <EventEditSteps steps={steps}/>
     </div>
  </div>
)
