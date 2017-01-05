import $ from 'jquery'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/TestPage.css';

import 'semantic-ui-dropdown/dropdown.min.css'
import 'semantic-ui-transition/transition.min.css'


import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'


$.fn.transition = require('semantic-ui-transition')
$.fn.dropdown = require('semantic-ui-dropdown')

$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.modal = require('semantic-ui-modal')

import {fetchTopNEventsIfNeed} from '../flux/modules/top_event'

import {joinToEvent} from '../flux/modules/selected_event'

import MemberList from '../components/MemberList';
import EventImageSlider from '../components/EventImageSlider';

import Pagination from '../components/Pagination';

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

const joinButton = (props) => (
  <button onClick={(e) => {
    e.preventDefault()
    props.exec()
  }}>
  JOIN EVENT
  </button>
)

const JOIN = connect((state)=>({}), (dispatch) => ({
  'exec': ()=> {
    console.log("running: ", dispatch)
    dispatch(joinToEvent('event-1', 'user-1'))
  }
}))(joinButton)


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

const MemberListW = connect(()=>({
  members: [
    {
      id: 'user-1',
      url: '/members/user-1',
      userAvatar: '/img/avatar.png',
      displayName: 'Dung 1'
    },
    {
      id: 'user-2',
      url: '/members/user-2',
      userAvatar: '/img/avatar.png',
        displayName: 'Dung 2'
    },
    {
      id: 'user-3',
      url: '/members/user-3',
      userAvatar: '/img/avatar.png',
        displayName: 'Dung 3'
    }
  ]
}), ()=>({
  onRemove: (memberId) => {
    console.log('remove member: ', memberId)
  }
}))(MemberList)

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

  renderMemberList() {
    return (<MemberListW />)
  }

  renderImageSlider() {
    const images = [
      '/img/event-1.jpg',
      '/img/event-2.jpg',
      '/img/event-3.jpg',
      '/img/event-4.jpg',
      '/img/event-1.jpg',
      '/img/event-2.jpg',
      '/img/event-3.jpg',
      '/img/event-4.jpg',
      '/img/event-1.jpg',
      '/img/event-2.jpg',
      '/img/event-3.jpg',
      '/img/event-4.jpg',
      '/img/event-1.jpg',
      '/img/event-2.jpg',
      '/img/event-3.jpg',
      '/img/event-4.jpg'
    ]
    return (
      <div className='ui basic modal' ref='eventImageSlider'>
          <div className="actions">
            <div className="ui basic cancel inverted button">
              <i className="remove icon"></i>
            </div>
          </div>
          <div className='content'>
            <EventImageSlider images={images}/>
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
         <Pagination total={100} current={15}
           onNextClick={()=> console.log("Next page")}
           onPrevClick={()=> console.log("Prev page")}
           onChangePage={(i)=> console.log("Select page: " , i)}
         />

         </div>
      </div>
    )
  }
}

export default TestPage
