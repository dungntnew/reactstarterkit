import $ from 'jquery'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/TestPage.css';

import 'semantic-ui-dropdown/dropdown.min.css'
import 'semantic-ui-transition/transition.min.css'


$.fn.transition = require('semantic-ui-transition')
$.fn.dropdown = require('semantic-ui-dropdown')

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


const event = {
  "title": "event-2",
  "price": 312,
  "address": "Tokyo 123",
  "tags": ["Tabehodai", "Dinner"],
  "target": "Onokomiyaki",
  "targetName": "Onokomiyaki",
  "joinerCount": 15,
  "joinerLimit": 20,
  "joinerIds": ["user-1", "user-2", "user-3"],
  "openDate": "20160112",
  "registrationDateStart": "20160102",
  "registrationDateEnd": "20160102",
  "url": "/events/event-2",
  "coverImageUrl": "/img/event-2.jpg",
  "eventImageUrls": ["img/event/event2-1.png", "img/event/event2-2.png"],
  "ownerId": "user-2",
  "ownerUserName": "user-2",
  "ownerFullName": "User-2",
  "ownerAvatarUrl": "https://placeholdit.imgix.net/~text?txtsize=10&txt=100%C3%97100&w=100&h=100"
}

/* Put your component to here to view */
class TestPage extends Component {

  componentDidMount() {
    $(this.refs.targetSelector).dropdown()
  }

  renderTargetSelector() {
    const targetList = [{
      id: 'id1',
      title: 'Target-1'
    },{
      id: 'id2',
      title: 'Target-2'
    },
    {
      id: 'id3',
      title: 'Target-3'
    }]

    return(

     <div className="field">
      <label>Mokuteki</label>

      <div className='ui  search selection dropdown' ref='targetSelector'>
         <input type='hidden' name='target' />
         <i className='dropdown icon'></i>
         <div className='default text'>目的</div>
         <div className='menu'>
         {
           targetList.map(t => (
             <div key={t.id} className="item" data-value={t.id}>{t.title}</div>
           ))
         }
         </div>
      </div>
      </div>
    )
  }

  render() {


    return (
      <div>
         <p> This is TestPage, you can quick place your component to view</p>
         <pre>
              "TestComponent"  => "YourComponent"
         </pre>
         <hr/>
         <div className='test-page-wrapper'>
          <div className="ui form segment">

              {this.renderTargetSelector()}
          </div>

         </div>
      </div>
    )
  }
}

export default TestPage
