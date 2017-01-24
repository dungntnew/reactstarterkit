
import React, {Component, PropTypes} from 'react';
import '../css/TestPage.css';
import EditableAvatar from '../components/EditableAvatar'

/* Put your component to here to view */
class TestPage extends Component {
  componentDidMount() {
  }

  constructor() {
    super()
    this.state = {
      url: ''
    }
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
           <EditableAvatar
             avatarUrl={''}
             defaultAvatarUrl={'/img/avatar-01.png'}
             onSubmit={(url)=>{
              this.setState({url})
             }}
           />

           <hr />
           <div>
           <img className='ui image' src={this.state.url} />
           </div>
         </div>
      </div>
    )
  }
}

export default TestPage
