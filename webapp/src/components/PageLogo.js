import React from 'react';

import '../css/PageLogo.css';

const Logo = (props) => (
  <img className='page-logo'
       alt='Page-Logo'
       src={process.env.PUBLIC_URL + '/img/logomark.png'}
       style={props.style}
       />
)

export default Logo
