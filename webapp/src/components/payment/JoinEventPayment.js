import React, {PropTypes} from 'react';

import {formatPrice} from '../../helpers/event'
import {encryptFirstN} from '../../helpers/payment'

import '../../css/payment/JoinEventPayment.css';

const JoinEventPayment = (props) => (
  <div className='ui segment container join-event-payment'>
    <h3 className='title'>支払い手続き</h3>

    <div className='ui items description'>
      <div className='item'>
        <div className='image'>
          <img src={props.imageUrl} alt='item-thumbnail'/>
        </div>
        <div className='content'>
          <div className='desc'>
            <p>{props.desc}</p>
          </div>
        </div>
      </div>
    </div>

    <table className='ui very basic unstackable table'>
      <tbody>
        
         {props.credit &&
          <tr className='payment-info'>
          <td className='six wide center aligned text-des'>支払い方法:</td>
          <td className='three wide right aligned content-des'>
            <div>{props.credit.method}</div>
            <div>{encryptFirstN(props.credit.number)}</div>
            <div>有効期限  {props.credit.exprMonth}/{props.credit.exprYear}</div>
          </td>
          <td className='three wide no-sp'></td>
          </tr>
          }
          
        <tr className='price-info'>
          <td className='six wide center aligned text-des'>支払い金額:</td>
          <td className='three wide right aligned content-des'>
            <div>{formatPrice(props.price)}</div>
          </td>
          <td className='three wide no-sp'></td>
        </tr>

        <tr className='btn-group'>
          <td className='six wide center aligned'>
            <button className='ui button' onClick={()=> props.cancel()}>戻る</button>
          </td>
          <td className='six wide right aligned mobile only'>
            <button className='ui orange button' onClick={()=> props.next()}>支払う</button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
)

JoinEventPayment.propTypes = {
  credit: PropTypes.object,
  imageUrl: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}

export default JoinEventPayment
