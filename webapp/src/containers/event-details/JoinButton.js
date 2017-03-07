import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import '../../css/JoinButton.css';

import {getEventData} from '../../flux/modules/resource'

import {createPayment, getPaymentStatus, getCreatingPaymentData} from '../../flux/modules/resource';


class JoinButton extends Component {
  
  componentDidMount() {
    this.checkPaymentStatus()
  }

  componentDidUpdate() {
    this.checkPaymentStatus()
  }

  checkPaymentStatus() {
    const {paymentStatus} = this.props;
    const {step, data} = paymentStatus
    if (step >= 2 && data) {
      const {paymentId} = data
      const {push} = this.props;
      push(`/payments/${paymentId}`)
    }
  }

  render() {
    const buttonTitle = this.props.isParticipator ? 'キャンセル': '参加'
      const buttonClasses = classNames({
        'ui button': true,
        'btn-orange': true,
        'btn-bottom': true,
        'join-button': !this.props.isParticipator,
        'cancel-button': this.props.isParticipator
      })

      const onClickFunc = this.props.isParticipator ? this.props.onCancel: this.props.onJoin
      return (this.props.authenticated &&
         <button className={buttonClasses} onClick={onClickFunc}>{buttonTitle}</button>
       )
  }
};


JoinButton.propTypes = {
  isParticipator: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {

  const {isFetching, data} = getEventData(state)
  const {auth} = state
  const {authenticated, user} = auth

  if (!authenticated) {
      console.error("pre-required authenticate")
  }

  const paymentStatus = getPaymentStatus(state);

  console.log("PAYMENT DATA: ", paymentStatus);

  setTimeout(()=>{
    console.log("PAYMENT DATA LATER: ", getPaymentStatus(state));
  }, 100);


  if (!isFetching && authenticated && user) {
    const {isParticipator, id} = data
    const userId = user.id

    return {
      authenticated: authenticated,
      userId: userId,
      user: user,
      isParticipator: isParticipator,
      eventId: id,
      isFetching: false,
      paymentStatus: paymentStatus,
    }
  }
  else {
    return {
      joining: false,
      isFetching: true,
      authenticated: authenticated,
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps
  const {eventId, userId} = stateProps
  const {push} = ownProps

  return Object.assign({}, ownProps,
    Object.assign({}, stateProps, {
      onCancel: ()=> {
        push(`/cancelJoin/${userId}/${eventId}`)
      },
      onJoin: ()=> {
        dispatch(createPayment(eventId));
      }
    })
  )
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(JoinButton)
