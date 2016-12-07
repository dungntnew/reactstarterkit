import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/TopLandingPage.css'

import Logo from '../components/PageLogo';
import LPHeader from '../components/LPHeader';
import TopNav from '../containers/TopNav';
import Exploder from '../containers/Exploder';
import LPBaner01 from '../components/LPBaner01';
import LPBaner02 from '../components/LPBaner02';
import PageFooter from '../components/PageFooter';
import TopNEvents from '../containers/TopNEvents';

import {EventFilterTypes} from '../actions';

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
          <Exploder location={this.props.location} params={this.props.params}/>

        </LPHeader>

        <LPBaner01/>

        <div className='lp-main'>
           <TopNEvents title='スペシャル'
                       linkTitle='ALL'
                       filter={EventFilterTypes.SPECIAL}
                       limit={4}
           />
           <TopNEvents title='トレンドテーブル'
                       linkTitle='ALL'
                       filter={EventFilterTypes.TREND}
                       limit={4}
           />
           <TopNEvents title='最新テーブル'
                       linkTitle='ALL'
                       filter={EventFilterTypes.LATEST}
                       limit={4}
           />
        </div>

        <LPBaner02/>
        <PageFooter/>
      </div>
    )
  }
}
/*
TODO: mapping auth state to disable Banner-01, Banner-02
*/

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(TopLandingPage)
