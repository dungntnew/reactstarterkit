import React, {PropTypes} from 'react'


import '../../css/bills/RequestOk.css'

const RequestOk = (props) => {

    return(
      <div className='ui text container request-ok'>
        <h3 className='title'>振込申請完了</h3>
        <p className='text'> 振込申請が完了しました。</p>
        <a class="comfirm" href={props.url}>振込申請スケジュールを確認する</a>
      </div>
    )
}

RequestOk.propTypes = {
  url: PropTypes.string.isRequired
}

export default RequestOk

