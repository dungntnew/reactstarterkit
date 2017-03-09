import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/TopLandingPage.css'

import TopNEvents from '../containers/TopNEvents';
import LPBaner01 from '../components/LPBaner01';
import LPBaner02 from '../components/LPBaner02';

class TopLandingPage extends Component {
  render() {
      return (
        <div className='top-lp'>
          <LPBaner01/> 
          <div className='lp-main'>
            <div className='ui container'>
              <TopNEvents title='スペシャル'
                          linkTitle='ALL'
                          query={{special: true}}
                          limit={4}
              />
              <TopNEvents title='トレンドテーブル'
                          linkTitle='ALL'
                          query={{trend: true}}
                          limit={4}
              />
              <TopNEvents title='最新テーブル'
                          linkTitle='ALL'
                          query={{latest: true}}
                          limit={4}
              />
            </div>
          </div>
          <LPBaner02/>
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
