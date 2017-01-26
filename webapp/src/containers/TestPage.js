
import React, {Component, PropTypes} from 'react';
import '../css/TestPage.css';

import 'react-input-range/dist/react-input-range.css';

import {fetchQuote} from '../flux/modules/todo';

import {connect} from 'react-redux';

const Btn = (props) => (
   <div className='ui segment'>
     <div>
        Loading: {props.isFetching}
     </div>
     <button className='ui orange button'
             onClick={()=> {props.load()}}>Load</button>
   </div>
)

const LoadBtn = connect((state)=>{
    const {quotes} = state;
    return {
      isFetching: quotes.isFetching,
      quote: quotes.quotes,
    }
  },
  (dispatch)=>({
    load: ()=>{
       dispatch(fetchQuote())
    }
}))(Btn);


/* Put your component to here to view */
class TestPage extends Component {
  componentDidMount() {
  }

  constructor() {
    super()
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

         <LoadBtn />

         </div>
      </div>
    )
  }
}

export default TestPage
