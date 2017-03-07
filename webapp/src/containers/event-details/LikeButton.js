import _ from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames'

import '../../css/LikeButton.css';

import {getEventData} from '../../flux/modules/resource'

import {commingSoon} from '../../helpers/';

const LikeButton = (props) => {
  const buttonTitle = classNames({
    'red heart': props.isPreferencer,
    'white heart': !props.isPreferencer,
    'icon':  true
  })
  const buttonClasses = classNames({
    'ui button': true,
    'btn-bottom': true,
    'like-button': !props.isPreferencer,
    'unlike-button': props.isPreferencer
  })
  const onClickFunc = props.isPreferencer ? props.onLike: props.onUnlike
  return (
    <button className={buttonClasses} onClick={onClickFunc}>
       <i className={buttonTitle}></i>
    </button>
  )
}

LikeButton.propTypes = {
  isPreferencer: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
 
  const {isFetching, data} = getEventData(state)
  if (!isFetching) {
    const {currentUser} = data
    return {
      isPreferencer: currentUser.isPreferencer,
      isFetching: false
    }
  }
  else {
    return {
      isPreferencer: false,
      isFetching: true
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLike: ()=> { commingSoon() },
  onUnlike: ()=> { commingSoon() }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(LikeButton)
