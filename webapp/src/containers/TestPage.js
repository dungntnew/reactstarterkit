import React from 'react';

import '../css/TestPage.css';

// import Logo from '../components/PageLogo';
// import LPHeader from '../components/LPHeader';
// import TopNav from '../containers/TopNav';
// import UserMenu from '../components/UserMenu';
import EventItem from '../components/EventItem';
import EventTags from '../components/EventTags';


// const user = {
//   avatarUrl: '/img/avatar.png',
//   name: 'Nguyen Tri Dung',
//   id: '1',
//   url: '/user/dungntnew'
// }

const event = {
    coverImageUrl: '/img/avatar.png',
    price: 100,
    title: 'Test Event',
    address: 'Yokohama Tokyo',
    tags: ['A', 'B', 'C'],
    joinerCount: 5,
    joinerLimit:　10,
    openDate: '20160112',
    registrationDateStart: '20160112',
    registrationDateEnd:'20160112',
    url: '/events/1',
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
         <div className="ui link cards">
          <EventItem {...event} />
          <EventItem {...event} />
          <EventItem {...event} />
          <EventItem {...event} />
          </div>

     </div>
  </div>
)
