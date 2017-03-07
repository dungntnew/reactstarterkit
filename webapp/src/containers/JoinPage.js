import _ from 'lodash'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import '../css/JoinPage.css';
import '../css/payment/JoinEventPayment.css';

import {formatPrice} from '../helpers/event'
import {encryptFirstN} from '../helpers/payment'


import JoinEventPayment from '../components/payment/JoinEventPayment';
import JoinEventPaymentFinish from '../components/payment/JoinEventPaymentFinish';

import {fetchPaymentDetail, getPaymentDetailData, syncRequestCreditCardToken, getCreditCardDetail, updatePayment, clearPaymentSession} from '../flux/modules/resource';

import CreditCard from '../components/credit-card/CreditCard';

const style = {
  textAlign: 'center',
  minHeight: '320px',
  padding: '20px',
  paddingTop: '100px',
}

class JoinPage extends Component {

    backToEventDetail() {
      this.props.router.go(-1)
      
    }

    cancel() {
    }

    pay(data) {
        this.props.validateCreditCard({
          card_number: data.number,
          card_exp_month: data.exprMonth,
          card_exp_year: data.exprYear,
          card_cvv: data.securityCode,
        });
    }

    componentDidMount(){
      this.processed = false;
      this.props.clearSession();
      this.props.fetchPayment();
    }

    componentDidUpdate() {
      // process payment after token got
      const {loadingPayment, 
             processingPayment, 
             paymentStatus, 
             token} = this.props;
      if (!loadingPayment 
                   && !processingPayment 
                   && token 
                   && paymentStatus === 'UNPAID') {
      
           if (!this.processed) {
             this.processed = true;
             this.props.execPayment(token);
           }
           else {
             console.log("WHAT FUCK ? ", this.props)
           }
      }
    }
    
    renderPaymentFinish() {
        return (
          <div className='join-page'>
              <div className='ui segment join-event-payment-finish' style={style}>
                <h3>決済完了しました！</h3>
                <Link to='/events/1' className='ui orange button'>当イベントへ戻る</Link>
              </div>
          </div>
        )
    }

    renderProcessPayment() {
        return (
          <div className='join-page' style={style}>
              <div className='ui segment join-event-payment-finish' style={style}>
                <div>Your Payment Processing...</div>
              </div>
          </div>
        )
    }
    
    renderPaymentItems() {
      const {credit, paymentItem, tokenErrorMessage, processingPayment} = this.props
    
      return (
         <div className='join-page'>
            
            <div className='ui segment container join-event-payment' >
                <h3 className='title'>支払い手続き</h3>

                <div className='ui items description'>
                  <div className='item'>
                    <div className='image'>
                      <img src={paymentItem.imageUrl} alt='item-thumbnail'/>
                    </div>
                    <div className='content'>
                      <div className='desc'>
                        <p>{paymentItem.title}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <table className='ui very basic unstackable table'>
                  <tbody>
                    
                    <tr className='price-info'>
                      <td className='six wide center aligned text-des'>支払い金額:</td>
                      <td className='three wide right aligned content-des'>
                        <div>{formatPrice(paymentItem.price)}</div>
                      </td>
                      <td className='three wide no-sp'></td>
                    </tr>
                  </tbody>
                </table>

                {!processingPayment && 
                      <CreditCard
                          data={credit}
                          processing={false}
                          errorMessage={tokenErrorMessage}
                          onSubmit={(data)=>{
                            this.pay(data)
                          }}
                        />
                  }

              </div>
         </div>
      )
    }

    renderErrors(errorMessage) {
      return (
        <div className='join-page'>
         <div className='ui segment join-event-payment-finish' style={style}>
              <div className='ui error visible message'>
                {errorMessage}
              </div>
                <Link to='/events/1' className='ui orange button'>当イベントへ戻る</Link>
              </div>
        </div>
      )
    }

   renderLoading() {
      return (
        <div className='join-page' style={style}>
          <div className=''>
            <h4>Loading..</h4>
          </div>
        </div>
      )
    }

    render() {
      if (this.props.paymentStatus === 'PAID') {
        return this.renderPaymentFinish();
      }

      
      // loading payment data
      if (this.props.loadingPayment) {
        return this.renderLoading();
      }

      // show any error if cannot load payment item
      if (this.props.paymentItemErrorMessage) {
        return this.renderErrors(this.props.paymentItemErrorMessage);
      }


      // processing payment with token id
      if (this.props.processingPayment) {
        return this.renderProcessPayment();
      }
      
      // show payment content
      return this.renderPaymentItems();
    }
};

const mapStateToProps = (state, ownProps) => {
  const {paymentId} = ownProps.params
  const paymentDetail = getPaymentDetailData(state, paymentId)
  const creditDetail = getCreditCardDetail(state)

  // loading payment item data
  if (paymentDetail.isLoading) {
    return {
      loadingPayment: true
    } 
  }

  // any payment data load error
  if (!paymentDetail.isLoading && paymentDetail.errorMessage) {
    return {
      loadingPayment: false,
      paymentItemErrorMessage: paymentDetail.errorMessage,
    }
  }

  // check payment status
  if (paymentDetail.payment && paymentDetail.payment.status === 'PAID') {
    return {
      paymentStatus: 'PAID'
    }
  }

  // check processing payment
  if (creditDetail.isFetching) {
    return {
      processingPayment: true
    }
  }

  // return payment content data 
  const {payment} = paymentDetail
  const paymentItem = payment ? {
    title: payment.event.name,
    imageUrl: payment.event.coverImageUrl,
    price: payment.amount,
  }: null
  const paymentStatus = payment ? payment.status : 'UNKNOWN';

  return {
    paymentStatus: paymentStatus,
    credit: creditDetail.credit,
    token: creditDetail.token,
    tokenErrorMessage: creditDetail.errorMessage,
    paymentItem: paymentItem,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {paymentId} = ownProps.params
  return {
    clearSession: ()=> dispatch(clearPaymentSession()),
    fetchPayment: ()=> dispatch(fetchPaymentDetail(paymentId)),
    validateCreditCard: (data) => dispatch(syncRequestCreditCardToken(data)), 
    execPayment: (creditToken)=> {
      dispatch(updatePayment(paymentId, creditToken))
    }
  }
}

export default connect(mapStateToProps,
                       mapDispatchToProps)(JoinPage)
