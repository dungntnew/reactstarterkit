import React, {PropTypes}from 'react'

import '../../css/fqa/Answer.css'

const Answer = (props) => {
  return(
    <div className='ui text container answer'>
      <div className='ui grid'>
        <div className='one column'>
          <h4>Q</h4>
        </div>
        <div className='fifteen wide column'>
          <h4>Your Tableとは</h4>
        </div>
      </div>
      <div className='ui grid'>
        <div className='one column'>
          <h4>A</h4>
        </div>
        <div className='fifteen wide column'>
          <p className='content'>{props.content}</p>
        </div>
      </div>

    </div>
  )

}

Answer.PropTypes = {
  content: PropTypes.string.isRequired
}


export default Answer
