import React from 'react';

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

/* test page wrapper style default is full page with red border */
const style = {
  width: '100%',
  height: '80%',
  padding: 0,
  margin: 0,
  border: '1px solid red',
}

/* Put your component to here to view */
export default (props) => (
  <div>
     <p> This is TestPage, you can quick place your component to view</p>
     <pre>
          "TestComponent"  => "YourComponent"
     </pre>
     <hr/>
     <div className='test-page-wrapper' style={style}>
        <TestComponent />
     </div>
  </div>
)
