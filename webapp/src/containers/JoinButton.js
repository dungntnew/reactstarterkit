import _ from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import '../css/JoinButton.css';

const JoinButton = (props) => {
  const buttonTitle = props.joining ? 'キャンセル': '参加'
  const buttonClasses = classNames({
    'ui button': true,
    'btn-orange': true,
    'btn-bottom': true,
    'join-button': !props.joining,
    'cancel-button': props.joining
  })
  const onClickFunc = props.joining ? props.onCancel: props.onJoin
  return (props.authenticated &&
    <button className={buttonClasses} onClick={onClickFunc}>{buttonTitle}</button>
  )
}


JoinButton.propTypes = {
  joining: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const {selectedEvent} = state
  const {auth} = state
  const {authenticated, user} = auth

  if (!authenticated) {
      console.error("pre-required authenticate")
  }

  const {isFetching, data} = selectedEvent
  if (!isFetching && authenticated && user) {
    const {joined, id} = data
    const userId = user.id

    return {
      authenticated: authenticated,
      userId: userId,
      user: user,
      joining: joined,
      eventId: id,
      isFetching: false
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
  const {eventId, userId} = stateProps
  const {push} = ownProps

  return Object.assign({}, ownProps,
    Object.assign({}, stateProps, {
      onCancel: ()=> {
        push(`/cancelJoin/${userId}/${eventId}`)
      },
      onJoin: ()=> {
        push(`/join/${userId}/${eventId}`)
      }
    })
  )
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(JoinButton)
