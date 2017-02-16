import React, {PropTypes} from 'react'

import '../../css/fqa/Policy.css'

const Policy = (props) => {
  return(

    <div className='ui container terms-of-service'>
      <h3 className='center'>プライバシーポリシー</h3>
      <div className='content'>
        <p>{props.content}</p>
      </div>

    </div>
  )
}

Policy.propTypes = {
  content: PropTypes.string.isRequired,
}


export default Policy
