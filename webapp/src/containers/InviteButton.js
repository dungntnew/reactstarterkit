import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import '../css/InviteButton.css';

const InviteButton = (props) => (
  <button className='ui button invite-button' onClick={props.onInvite}>Invite</button>
)

InviteButton.propTypes = {
  onInvite: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onInvite: ()=>{ console.log('on Invite')}
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(InviteButton)
