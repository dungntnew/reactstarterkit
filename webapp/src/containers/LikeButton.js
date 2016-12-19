import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames'

import '../css/LikeButton.css';

const LikeButton = (props) => {
  const buttonTitle = props.liked ? 'Unlike': 'Like'
  const buttonClasses = classNames({
    'ui button': true,
    'like-button': !props.liked,
    'unlike-button': props.liked
  })
  const onClickFunc = props.liked ? props.onLike: props.onUnlike
  return (
    <button className={buttonClasses} onClick={onClickFunc}>{buttonTitle}</button>
  )
}

LikeButton.propTypes = {
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    liked: false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLike: ()=> { console.log('on Like')},
  onUnlike: ()=> { console.log('on Unlike')}
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(LikeButton)
