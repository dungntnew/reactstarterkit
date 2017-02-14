import React, {PropTypes, Component} from 'react'


import '../css/CancelTable.css';

class CancelTable extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
      sumMoney: PropTypes.string.isRequired,
      policyUrl: PropTypes.string.isRequired
  }

  render() {
    const {sumMoney, policyUrl} = this.props

    return(
      <div className='ui text container-customize cancel-table'>
        <div className='ui segment centered'>
           <h2 className='title center'>テーブル参加のキャンセル</h2>
           <div className='line'></div>
           <p className='content'>キャンセルポリシーに基づいたいい感じの納得感のある文章入れる。
           キャンセルポリシーに基づいたいい感じの納得感のある文章入れる。キ</p>
           <a href={policyUrl} className='not-text'>キャンセルポリシー詳細</a>
           <p className='sum center'>払い戻し金額<span>¥ {sumMoney}</span></p>
           <div className='line'></div>

           <div className='ui two column stackable grid btn-group'>
            <div className='column eight wide center aligned'>
              <button className="ui button btn-wid70">閉じる</button>
            </div>
            <div className='column eight wide center aligned'>
              <button className="ui button btn-wid70">キャンセルする</button>
            </div>
           </div>
        </div>
      </div>

    )
  }

}

export default CancelTable;
