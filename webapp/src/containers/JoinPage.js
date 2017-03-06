import _ from 'lodash'
import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/JoinPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import JoinEventPayment from '../components/payment/JoinEventPayment';
import JoinEventPaymentFinish from '../components/payment/JoinEventPaymentFinish';




class JoinPage extends Component {

    backToEventDetail() {
      this.props.router.go(-1)
    }

    componentDidMount(){
       const {userId, eventId} = this.props.params
       this.props.init()
       this.props.execJoinEvent(eventId)
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
      const {isFetching, errorMessage} = this.props
      if (isFetching) {
        return null;
      }

      return (
        <div className='join-page'>
          
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
