import _ from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import '../../css/ShareButton.css';

const ShareButton = (props) => (
  <button className='ui button btn-bottom share-button' onClick={props.onShare}><i className="share icon"></i></button>
)

ShareButton.propTypes = {
  onShare: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onShare: ()=> {
    console.log('on Share')
    alert("not support yet!")
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(ShareButton)
