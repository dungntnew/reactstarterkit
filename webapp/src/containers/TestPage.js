
import React, {Component} from 'react';
import '../css/TestPage.css';

import EditableMemberProfile from '../components/EditableMemberProfile'

/* Put your component to here to view */
class TestPage extends Component {
  componentDidMount() {
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
           <EditableMemberProfile data={{
              coverUrl: '/img/cover-01.jpg',
              displayName: 'Dungntnew',
              avatarUrl: '/img/avatar-01.png',
              url: '/members/dungntnew',
              rank: 3,
              createdEventCount: 11,
              isSelf: true
           }}
           isSaving={true}
           onSubmit={(data)=>{
            console.log("save data: ", data)
           }}
           />
         </div>
      </div>
    )
  }
}

export default TestPage
