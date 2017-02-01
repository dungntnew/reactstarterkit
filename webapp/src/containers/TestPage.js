
import React, {Component, PropTypes} from 'react';
import '../css/TestPage.css';

import 'react-input-range/dist/react-input-range.css';

import {fetchCategories,
        fetchCategoryDetail} from '../flux/modules/resource';

import {connect} from 'react-redux';

const Btn = (props) => (
   <div className='ui segment'>
     <div>
        Loading: {props.isFetching}
     </div>
     <button className='ui orange button'
             onClick={()=> {props.load()}}>Load</button>
     <button className='ui green button'
       onClick={()=> {props.detail()}}>Detail</button>
   </div>
)

const LoadBtn = connect((state)=>{
     return {}
  },
  (dispatch)=>({
    load: ()=>{
       dispatch(fetchCategories())
    },
    detail: ()=> {
       dispatch(fetchCategoryDetail('11'))
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
