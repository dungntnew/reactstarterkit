import React, {Component, PropTypes} from 'react'


import '../css/ReportTable.css'

class ReportTable extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    comment: PropTypes.string.isRequired
  }

  render() {
    const {comment} = this.props

    return(
      <div className='ui text container report-table'>
        <div className='ui segment centered'>
           <h2 className='title center'>このコンテンツを Your Table に掲載しないほうがいいとお考えですか？</h2>
           <div className='line'></div>
           <p className='content'>{comment}</p>
           <form className='ui form form-input' onSubmit={(e)=>{
                e.preventDefault()
                this.addNewComment()
                }}>
              <div className="field field-input">
                <label>コンテンツが不適切だと思われる理由を入力してください</label>
                <input type="text" name="title"/>
              </div>

              <div className='ui two column stackable grid btn-group'>
                <div className='column eight wide center aligned'>
                  <button className="ui button btn-wid70 btn-orange">報告する</button>
                </div>
                <div className='column eight wide center aligned'>
                  <button className="ui button btn-wid70">キャンセルする</button>
                </div>
               </div>
           </form>
        </div>
      </div>
    )
  }
}

export default ReportTable
