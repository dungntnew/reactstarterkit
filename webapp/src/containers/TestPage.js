import React from 'react';

import '../css/TestPage.css';

// import Logo from '../components/PageLogo';
// import LPHeader from '../components/LPHeader';
// import TopNav from '../containers/TopNav';
// import UserMenu from '../components/UserMenu';
import PageFooter from '../components/PageFooter';


// const user = {
//   avatarUrl: '/img/avatar.png',
//   name: 'Nguyen Tri Dung',
//   id: '1',
//   url: '/user/dungntnew'
// }

/* Put your component to here to view */
export default (props) => (
  <div>
     <p> This is TestPage, you can quick place your component to view</p>
     <pre>
          "TestComponent"  => "YourComponent"
     </pre>
     <hr/>
     <div className='test-page-wrapper'>
      <PageFooter />
     </div>
  </div>
)
