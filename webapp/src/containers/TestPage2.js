import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/TestPage.css';



// import BlogItem from '../components/BlogItem';
// import TopNBlogs from '../containers/TopNBlogs';

// const blog = {
//   coverImageUrl: 'ngoctien/blog1',
//   title: 'Duong thi ngoc tien'
// }
// const blogitem = {
//   filter: 'ngoc/tien',
//   linkTitle: 'All',
//   limit: 5
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

        <h3> put your code here </h3>


     </div>
  </div>
)
