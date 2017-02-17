import _ from 'lodash'
import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/JoinPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import CreditCardAddForm from '../containers/CreditCardAddForm';
import CreditCardOk from '../components/credit-card/CreditCardOk';
import JoinEventPayment from '../components/payment/JoinEventPayment';
import JoinEventPaymentFinish from '../components/payment/JoinEventPaymentFinish';

import {fetchEventDetail,
        fetchEventDetailIfNeed,
        getEventData} from '../flux/modules/resource';

import {fetchCreditsIfNeed} from '../flux/modules/credit';
import {changeJoinStep, execPayment} from '../flux/modules/joinEvent';
import {JoinEventStep} from '../flux/modules/constant';

class JoinPage extends Component {

    backToEventDetail() {
      this.props.setStep(JoinEventStep.BEGIN)
      this.props.router.go(-1)
    }

    componentDidMount(){
       const {userId, eventId} = this.props.params
       const {router, isAuthenticated} = this.props
       if (!isAuthenticated) {
         router.push({
           pathname: '/login',
           query: {
             next: `/join/${userId}/${eventId}`
           }
         })
         return;
       }
       this.props.init()
       this.props.fetchEvent(eventId)
       this.props.fetchCredits(userId)
    }

    refreshCreditCards() {
       const {userId} = this.props.params
       this.props.fetchCredits(userId)
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

    renderAddCreditFinish() {
      return (
        <CreditCardOk onNext={()=> {
          this.props.setStep(JoinEventStep.SELECT_PAYMENT)
        }}/>
      )
    }

    renderAddCredit() {
      return (
        <CreditCardAddForm next={()=> {}} />
      )
    }

    renderPaymentFinish() {
      return (
        <JoinEventPaymentFinish />
      )
    }

    renderContent() {
      const {step} = this.props
      let content

      switch (step) {
        case JoinEventStep.ADD_CREDIT:
          content = this.renderAddCredit()
          break;
        case JoinEventStep.ADD_CREDIT_DONE:
          content = this.renderAddCreditFinish()
          break;
        case JoinEventStep.SELECT_PAYMENT:
          content = this.renderPaymentInfo()
          break;
        case JoinEventStep.DONE:
          content = this.renderPaymentFinish()
          break;
        default:
          content = (
            <div> ERROR ? </div>
          )
      }
      return content
    }

    componentWillReceiveProps(nextProps) {
      const {step} = this.props
      const {credits} = nextProps
      const creditIds = _.keys(credits)
      console.log("componentWillReceiveProps: creditIds", creditIds)
      console.log("componentWillReceiveProps: step", step, "NEXT: ", nextProps.step)

      if (step === JoinEventStep.DONE) {
        return;
      }

      if ((step === JoinEventStep.BEGIN
          || nextProps.step === JoinEventStep.BEGIN) && creditIds.length > 0){
        this.props.setStep(JoinEventStep.SELECT_PAYMENT)
      }else if (nextProps.step === JoinEventStep.BEGIN && creditIds.length === 0) {
        this.props.setStep(JoinEventStep.ADD_CREDIT)
      }
      else if (step === JoinEventStep.ADD_CREDIT && creditIds.length > 0){
        this.props.setStep(JoinEventStep.ADD_CREDIT_DONE)
      }

    }

    render() {
      const {isFetching, errorMessage} = this.props
      let content

      if (isFetching) {
        content = (
          <div> Loading... </div>
        )
      }
      else if (!isFetching && errorMessage) {
        content = (
          <div> System Error: {errorMessage} </div>
        )
      }
      else {
        content = this.renderContent()
      }

      return (
        <div className='join-page'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>
          {content}
          <div>
          </div>
          <PageFooter />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  const {joinEvent} = state
  const {step} = joinEvent

  const {auth} = state
  const {authenticated, user} = auth

  const selectedEvent = getEventData(state)
  const {credit} = state

  const isFetching = selectedEvent.isFetching || credit.isFetching
  const errorMessage = selectedEvent.errorMessage || credit.errorMessage

  if (!authenticated || !user) {
    return {
      isFetching: false,
      isAuthenticated: false
    }
  }
  if (isFetching) {
    return {
      isFetching: true,
      isAuthenticated: true
    }
  }
  console.log('STEP: ', step)

  return {
    step: step,
    isFetching: false,
    isAuthenticated: true,
    errorMessage: errorMessage,
    eventData: selectedEvent.data,
    credits: credit.credits,
    user: user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => {
  },
  setStep: (step) => {
    dispatch(changeJoinStep(step));
  },
  fetchEvent: (eventId) => {
    dispatch(fetchEventDetailIfNeed(eventId))
  },
  fetchCredits: (userId) => {
    dispatch(fetchCreditsIfNeed(userId))
  },
  doPayment: (eventId, userId, credit) => {
    dispatch(execPayment(eventId, userId, credit))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(JoinPage)
