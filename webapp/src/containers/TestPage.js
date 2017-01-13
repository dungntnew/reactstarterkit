
import React, {Component} from 'react';
import '../css/TestPage.css';


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
         </div>
      </div>
    )
  }
}

export default TestPage
