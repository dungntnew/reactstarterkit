import _ from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/InviteButton.css';

const InviteButton = (props) => (
  <button className='ui button btn-bottom invite-button' onClick={props.onInvite}>Invite</button>
)

InviteButton.propTypes = {
  onInvite: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onInvite: ()=>{
    console.log('on Invite')
    alert('not support yet!')
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(InviteButton)
