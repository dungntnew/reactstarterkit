import _ from 'lodash'
import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/JoinPage.css';

import JoinEventPayment from '../components/payment/JoinEventPayment';
import JoinEventPaymentFinish from '../components/payment/JoinEventPaymentFinish';

class JoinPage extends Component {

    backToEventDetail() {
      this.props.router.go(-1)
    }

    componentDidMount(){
       const {eventId} = this.props.params
    }

    renderPaymentInfo() {
      const {credits} = this.props
      const creditIds = _.keys(credits)
      const credit = credits[_.first(creditIds)]

      const {eventData} = this.props
      const {title, price, coverImageUrl} = eventData

      const {userId, eventId} = this.props.params

      return (
        <JoinEventPayment credit={credit}
                          desc={title}
                          price={price}
                          imageUrl={coverImageUrl}
                          cancel={()=> {this.backToEventDetail()}}
                          next={()=> {this.props.doPayment(eventId, userId,credit)}}
        />
      )
    }

    render() {
      return (
        <div className='join-page'>
           TODO:
           <h2> 決済フォーム</h2>
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(JoinPage)
