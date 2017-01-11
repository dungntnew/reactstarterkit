import React from 'react';

import {Link} from 'react-router'

const JoinEventPaymentFinish = (props) => (
  <div className='ui segment join-event-payment-finish'>
     <div>Your Payment FInished!!!!!</div>
     <Link to='/mypage' className='ui orange button'>マイページへ</Link>
  </div>
)

export default JoinEventPaymentFinish;
