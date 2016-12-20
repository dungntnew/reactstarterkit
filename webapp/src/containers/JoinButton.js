import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
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
  return {
    joining: true
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCancel: ()=>{ console.log('on Cancel')},
  onJoin: ()=>{ console.log('on Join')}
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(JoinButton)
