
import React, {Component, PropTypes} from 'react';
import '../css/TestPage.css';

import InputRange from 'react-input-range';
import 'react-input-range/dist/react-input-range.css';

/* Put your component to here to view */
class TestPage extends Component {
  componentDidMount() {
  }

  constructor() {
    super()
    this.state = {value: 5}
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


         <InputRange
            maxValue={20}
            minValue={0}
            value={this.state.value}
            onChange={(c, v)=>{
              this.setState({value: v})
            }}
          />

         </div>
      </div>
    )
  }
}

export default TestPage
