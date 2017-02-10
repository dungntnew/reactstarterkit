import _ from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames'

import '../css/LikeButton.css';

import {getEventData} from '../flux/modules/resource'

const LikeButton = (props) => {
  const buttonTitle = classNames({
    'red heart': props.liked,
    'white heart': !props.liked,
    'icon':  true
  })
  const buttonClasses = classNames({
    'ui button': true,
    'btn-bottom': true,
    'like-button': !props.liked,
    'unlike-button': props.liked
  })
  const onClickFunc = props.liked ? props.onLike: props.onUnlike
  return (
    <button className={buttonClasses} onClick={onClickFunc}>
       <i className={buttonTitle}></i>
    </button>
  )
}

LikeButton.propTypes = {
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
 
  const {isFetching, data} = getEventData(state)
  if (!isFetching) {
    const {liked} = data
    return {
      liked: liked,
      isFetching: false
    }
  }
  else {
    return {
      liked: false,
      isFetching: true
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLike: ()=> { console.log('on Like')},
  onUnlike: ()=> { console.log('on Unlike')}
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(LikeButton)
