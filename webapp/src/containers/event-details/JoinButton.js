import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {Link} from 'react-router';

import '../../css/JoinButton.css';

import {commingSoon} from '../../helpers/';

import {getEventData} from '../../flux/modules/resource'

import {createPayment, getPaymentStatus, getCreatingPaymentData} from '../../flux/modules/resource';



import auth from '../../helpers/auth'



class JoinButton extends Component {
  
  componentDidMount() {
    const {authenticated} = this.props
    if (authenticated) {
      this.checkPaymentStatus()
    }
  }

  componentDidUpdate() {
    const {authenticated} = this.props
    if (authenticated) {
      this.checkPaymentStatus()
    }
  }

  checkPaymentStatus() {
    const {paymentStatus} = this.props;
    const {paymentId, 
           isLoading} = paymentStatus
    console.log("CHECKING>>>>>>: ", )
    if (paymentId) {
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
      if (this.props.authenticated) {
        return (
          <button className={buttonClasses} onClick={onClickFunc}>{buttonTitle}</button>
        )
      }
      else {
        return (
          <button 
             className={buttonClasses} 
             onClick={()=>{
                this.props.replace({
                    pathname: '/login',
                    query: {
                        return_to: this.props.router.location.pathname,
                    }
                  })
             }}
            >{buttonTitle}</button>
        )
      }
  }
};


JoinButton.propTypes = {
  isParticipator: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {

  const authenticated = auth.loggedIn()

  if (!authenticated) {
      return {
        isFetching: false,
        isParticipator: false,
        authenticated: false,
      }
  }


  const {isFetching, data} = getEventData(state)
  const paymentStatus = getPaymentStatus(state);

  if (data) {
    const {isParticipator, id, currentUser} = data

    return {
      authenticated,
      isParticipator: currentUser.isParticipator,
      paymentStatus: paymentStatus,
      isFetching: false,
    }
  }
  else {
    return {
      isFetching: true,
      authenticated,
    }
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {eventId} = ownProps.params
  const {push} = ownProps

  const {dispatch} = dispatchProps

  return Object.assign({}, ownProps,
    Object.assign({}, stateProps, {
      eventId,
      onCancel: ()=> {
        commingSoon();
      },
      onJoin: ()=> {
        dispatch(createPayment(eventId));
      }
    })
  )
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(JoinButton)
