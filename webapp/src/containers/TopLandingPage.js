import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/TopLandingPage.css'

import Logo from '../components/PageLogo';
import LPHeader from '../components/LPHeader';
import TopNav from '../containers/TopNav';

class TopLandingPage extends Component {
  static propTypes = {
    authenticated:  PropTypes.bool.isRequired
  }

  render() {
    return (
      <div className='top-lp'>
        <LPHeader>
           <Logo style={{marginTop: 10, marginLeft: 10}}/>
           <TopNav />
        </LPHeader>

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
