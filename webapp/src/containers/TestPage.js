import React from 'react';

import '../css/TestPage.css';

import Logo from '../components/PageLogo';
import LPHeader from '../components/LPHeader';
import TopNav from '../containers/TopNav';

/* example component */
const TestComponent = (props) => (
  <div className='test-wrapper'>
    <form>
        UserName: <input /><br/>
        Password: <input /><br/>
        <input type='submit' value='Submit'/>
    </form>
  </div>
)

/* Put your component to here to view */
export default (props) => (
  <div>
     <p> This is TestPage, you can quick place your component to view</p>
     <pre>
          "TestComponent"  => "YourComponent"
     </pre>
     <hr/>
     <div className='test-page-wrapper'>
      <TopNav />
     </div>
  </div>
)
