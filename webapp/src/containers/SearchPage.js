import React from 'react';

import '../css/TestPage.css';

import Exploder from '../containers/Exploder';


export default (props) => (
  <div>
     <p> This is Search Page, you can quick place your component to view</p>
     
     <hr/>
     <div className='test-page-wrapper'>
      <Exploder />
     </div>
  </div>
)
