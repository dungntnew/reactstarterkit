import React, {PropTypes}from 'react'

import '../../css/fqa/CancelPolicy.css'

const CancelPolicy = (props) => {
  return(

    <div className='ui container cancel-policy'>
      <h3 className='center'>キャンセルポリシー</h3>
      <div className='content'>
        <p>{props.content}</p>
      </div>

    </div>
  )
}

CancelPolicy.propTypes = {
  content: PropTypes.string.isRequired,
}

export default CancelPolicy
