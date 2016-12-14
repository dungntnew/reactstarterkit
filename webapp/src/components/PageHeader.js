import React, {PropTypes} from 'react';

import '../css/PageHeader.css';


const PageHeader = (props) => (
  <div className='page-header'>
     {props.children}
  </div>
)

PageHeader.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageHeader
