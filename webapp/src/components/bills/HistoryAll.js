import $ from 'jquery';
import React, {Component, PropTypes} from 'react'


import 'semantic-ui-form/form.min.css'
import '../../css/bills/HistoryAll.css'

$.fn.form = require('semantic-ui-form')

import {InvoiceStatus} from '../../flux/modules/constant'

class HistoryAll extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    listInvoice: PropTypes.arrayOf(PropTypes.shape({
      submitDate: PropTypes.string.isRequired,
      bankName: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    }).isRequired).isRequired
  }

  renderStatus() {

    const {status} = this.props
    let nextAction

    switch (status) {
      case InvoiceStatus.PROCESSING:
        nextAction = (
          <button className="ui button btn-orange btn-wid-full">申請中</button>
        )
        break;

      case InvoiceStatus.SENT:
        nextAction = (
          <button className="ui button btn-wid-full">振込済</button>
        )
        break;

      case InvoiceStatus.ERROR:
        nextAction = (
          <button className="ui button btn-error btn-wid-full">エラー</button>
        )
        break;

      default:
    }

    return (
      <td className='center aligned status'>
        {nextAction}
      </td>
    )
  }

  render() {

    const {listInvoice} = this.props

    const content = listInvoice.map((invoice, index)=>(

        <tr className='invoice-info' key={index}>
          <td className='des-date'>
            <p>{invoice.submitDate} (月)</p>
            <p>{invoice.bankName}</p>
          </td>
          <td className='right aligned des-amount'>
            <p>¥ {invoice.amount}</p>
            <p>{invoice.accountName}</p>
            </td>
          {this.renderStatus()}
        </tr>
      )
    )


    return(

      <div className='ui text container history-all'>
        <h3 className='title'>振込申請履歴</h3>

        <table className='ui very basic unstackable table list-invoice'>
          <tbody>
            {content}
          </tbody>
        </table>
      </div>
    )
  }

}

export default HistoryAll

