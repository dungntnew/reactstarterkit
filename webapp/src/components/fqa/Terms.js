import React, {PropTypes} from 'react'

import '../../css/fqa/Terms.css'

const Terms = (props) => {
  return(

    <div className='ui container terms'>
      <h3 className='center'>標準キャンセルポリシー</h3>
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

Terms.propTypes = {
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}


export default Terms
