import React, {PropTypes} from 'react';

import '../css/LPHeader.css';

const style = {
  backgroundImage: `url("${process.env.PUBLIC_URL}/img/cover-01.jpg")`
}

const LPHeader = (props) => (
  <div className='lp-header' style={style}>
     {props.children}
  </div>
)

LPHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export default LPHeader
