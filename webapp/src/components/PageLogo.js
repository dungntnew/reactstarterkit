import React from 'react';

import '../css/PageLogo.css';

const toLogoUrl = (props) =>
  props.color ? process.env.PUBLIC_URL + '/img/logomark_color.png'
              : process.env.PUBLIC_URL + '/img/logomark.png'


const Logo = (props) => (
  <img className='page-logo'
       alt='Page-Logo'
       src={toLogoUrl(props)}
       style={props.style}
       />
)

export default Logo
