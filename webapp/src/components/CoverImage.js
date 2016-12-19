import React, {PropTypes} from 'react';
import classNames from 'classnames';

import '../css/CoverImage.css';


const CoverImage = (props) => {
  const classes = classNames({
    'cover-image': true
  })

  const style = {
    backgroundImage: `url("${props.backgroundUrl}")`
  }

  console.log("style: ", style)
  return (
    <div className={classes} style={style}>
       {props.children}
    </div>
  )
}

CoverImage.propTypes = {
  backgroundUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default CoverImage
