import React, {PropTypes} from 'react';

import {formatPrice} from '../../helpers/event'
import {encryptFirstN} from '../../helpers/payment'

import '../../css/payment/JoinEventPayment.css';

const JoinEventPayment = (props) => (
  <div className='ui segment join-event-payment'>
     <div className='title'>支払い手続き</div>
     <div className='ui image'>
       <img src={props.imageUrl}/>
     </div>
     <div className='desc'>
      {props.desc}
     </div>

     <div className='ui divider'></div>
     <div className='payment-info'>
        支払い方法:
          <div>
              <div>{props.credit.method}</div>
          </div>
          <div>
              <div>{encryptFirstN(props.credit.number)}</div>
          </div>
          <div>
              <div>有効期限  {props.credit.exprMonth}/{props.credit.exprYear}</div>
          </div>
      </div>

      <div className='price-info'>
          支払い金額: {formatPrice(props.price)}
      </div>

      <div>
      <button className='ui button' onClick={()=> props.cancel()}>戻る</button>
      <button className='ui orange button' onClick={()=> props.next()}>支払う</button>
      </div>
     </div>
)

JoinEventPayment.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  credit: PropTypes.shape({
    method: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    exprYear: PropTypes.string.isRequired,
    exprMonth: PropTypes.string.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
}

export default JoinEventPayment
