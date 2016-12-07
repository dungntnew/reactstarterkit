import React, {Component} from 'react';
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
          <div className="ui secondary menu lp-header-nav">
             <Logo/>
             <div className="right menu">
              <TopNav />
             </div>
          </div>
          <div className="title-introduce">
            <h1 className="title-header">食べる作る集まる。きっと何かはじまる。</h1>
            <p className="title-des">グルメのためのフードイベントサービス</p>
          </div>
          <Exploder location={this.props.location} params={this.props.params}/>

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
