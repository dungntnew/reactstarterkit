import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import 'semantic-ui-sticky/sticky.min.css'

$.fn.sticky = require('semantic-ui-sticky')

import '../css/DetailPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import EventDetailHeader from '../containers/EventDetailHeader';
import EventDetailCover from '../containers/EventDetailCover';
import EventDetailBlocks from '../containers/EventDetailBlocks';
import EventDetailCommentForm from '../containers/EventDetailCommentForm';
import EventDetailRelatived from '../containers/EventDetailRelatived';

class DetailPage extends Component {
    static propTypes = {
    }

    componentDidMount(){
      console.log('page detail: params = ', this.props.params)

      const {quickAccessMenu} = this.refs
      $(quickAccessMenu).sticky({
          context: '#context'
        });

    }

    componentDidUpdate() {
    }

    /* TODO: fix quick access menu
       it not rendered by semantic-ui-sticky now >_<
    */

    renderQuickAccessMenu() {
      return (
          <div className='two wide computer two wide tablet thirteen wide mobile column left-nav'>
            <div className="ui" ref='quickAccessMenu'>
                <a className='link' href='#images'>写真</a>
                <a className='link' href='#members'>参加者</a>
                <a className='link' href='#info'>テーブルについて</a>
                <a className='link' href='#maps'>会場地図</a>
                <a className='link' href='#comments'>コメント</a>
            </div>
          </div>
      )
    }

    render() {
      return (
        <div className='detail-page'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>

          <EventDetailHeader />
          <EventDetailCover />
          <div className='ui grid detail-content'>
            {this.renderQuickAccessMenu()}

            <div className='thirteen wide computer thirteen wide tablet thirteen wide mobile column'>
              <div className='ui detail-event' id='context'>
                <EventDetailBlocks />
                <EventDetailCommentForm />
                <EventDetailRelatived limit={4}/>
              </div>
            </div>
          </div>
          <PageFooter />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(DetailPage)
