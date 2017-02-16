import React, {PropTypes} from 'react'

import '../../css/fqa/TermsOfService.css'

const TermsOfService = (props) => {
  return(

    <div className='ui container terms-of-service'>
      <h3 className='center'>ゲスト利用規約</h3>
      <div className='content'>
        <p>{props.content}</p>
      </div>
      <div className='btn-center'>
        <a className='ui button btn-orange'
          href={props.link}>テーブル作成へ戻る</a>
      </div>

    </div>
  )
}

TermsOfService.propTypes = {
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}


export default TermsOfService
