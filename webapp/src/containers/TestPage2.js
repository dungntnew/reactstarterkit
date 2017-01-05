import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/TestPage.css';


import BlogHeader from '../components/BlogHeader';
import TopBlogItem from '../components/TopBlogItem';
import BlogItem from '../components/BlogItem';
import BlogDetail from '../components/BlogDetail';
import BlogDetailNav from '../components/BlogDetailNav';

const blog = {
  update: '2016年12月10日',
  title: '会員制限定　角煮フェスに潜入！！ 奏でろ！迸る肉汁ハーモニー♪'
}
const topblogitem = {
  coverImagesUrl: '/img/event-1.jpg',
  title: 'jollydiem'
}

const blogitem = {
  coverImageUrl: '/img/event-1.jpg',
  title: 'ngoctien',
  url: 'ngoctien.abc',
  datePosted: 2016,
  categories:'fish'
}
const blogdetail = {
  content: '説明が入ります。説明が入ります。説明が入ります。説明が入ります。説明が入ります',
}



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
      <div className='ui text container'>
        <BlogHeader {...blog}/>
        <TopBlogItem {...topblogitem}/>
        <div className="ui items">
          <BlogItem {...blogitem}/>
          <BlogDetail {...blogdetail}/>
          <BlogDetailNav />
        </div>
      </div>

    </div>
  </div>
)
