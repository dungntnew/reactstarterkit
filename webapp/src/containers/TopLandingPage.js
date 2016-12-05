import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/TopLandingPage.css'

import Logo from '../components/PageLogo';
import LPHeader from '../components/LPHeader';
import TopNav from '../containers/TopNav';
import Exploder from '../containers/Exploder';

class TopLandingPage extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div className='top-lp'>
        <LPHeader>
           <Logo style={{marginTop: 10, marginLeft: 10}}/>
           <TopNav />
           <Exploder />

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
