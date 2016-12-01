import React, {Component} from 'react';
import {connect} from 'react-redux';

class TopLandingPage extends Component {
  render() {
    return (
      <div>
              <h2> Hi Toi la Landing Page </h2>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(TopLandingPage)
