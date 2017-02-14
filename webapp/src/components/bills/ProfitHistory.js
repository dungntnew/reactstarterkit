import $ from 'jquery';
import React, {Component, PropTypes} from 'react'


import 'semantic-ui-form/form.min.css'
import '../../css/bills/ProfitHistory.css'

$.fn.form = require('semantic-ui-form')

class ProfitHistory extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    profitTotal: PropTypes.number.isRequired,
    eventCount: PropTypes.number.isRequired,
    listEvent: PropTypes.arrayOf(PropTypes.shape({
      event_title: PropTypes.string.isRequired,
      event_price: PropTypes.number.isRequired
    }).isRequired).isRequired
  }

  render() {

    const {profitTotal, eventCount} = this.props
    const {listEvent} = this.props

    const content = listEvent.map((event, index)=>(
        <tr className='des-info' key={index}>
          <td className='center aligned title'>{event.event_title}</td>
          <td className='center aligned price'>{event.event_price}円</td>
        </tr>
      )
    )

    return(

      <div className='ui text container profit-history'>
        <h3 className='title'>売上履歴</h3>

        <div className='ui two column stackable grid container'>
          <div className="column">
            <div className="sum-info">総売上金額<span>¥ {profitTotal}</span></div>
          </div>
          <div className="column">
            <div className="sum-info">合計件数<span>{eventCount} 件</span></div>
          </div>
        </div>

        <table className='ui very basic unstackable table list-event'>
          <tbody>
            <tr className='btn-group'>
              <td className='six wide center aligned'>
                <button className="ui button btn-wid-full">テーブル</button></td>
              <td className='six wide center aligned'>
                <button className="ui button btn-wid-full">売上金額</button></td>
            </tr>
            {content}
          </tbody>
        </table>

      </div>
    )
  }
}

export default ProfitHistory
