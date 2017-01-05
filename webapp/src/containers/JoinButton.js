import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';

import '../css/JoinButton.css';

import {joinToEvent} from '../flux/modules/selected_event'

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
  return (
    <button className={buttonClasses} onClick={onClickFunc}>{buttonTitle}</button>
  )
}


JoinButton.propTypes = {
  joining: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onJoin: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const {selectedEvent} = state
  const {isFetching, data} = selectedEvent
  if (!isFetching) {
    const {joined} = data
    return {
      joining: joined,
      isFetching: false
    }
  }
  else {
    return {
      joining: false,
      isFetching: true
    }
  }
}

// TODO: mapping state to dispatch to get event id, user id
const mapDispatchToProps = (dispatch, ownProps) => ({
  onCancel: ()=>{ console.log('on Cancel')},
  onJoin: ()=>{
    dispatch(joinToEvent('event-1', 'user-1'))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(JoinButton)
