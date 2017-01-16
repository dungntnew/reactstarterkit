import $ from 'jquery';
import React, {Component} from 'react';
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

import {fetchEventDetailIfNeed} from '../flux/modules/selected_event';

class DetailPage extends Component {

    componentDidMount(){
      const {quickAccessMenu} = this.refs
      $(quickAccessMenu).sticky({
          context: '#context'
        });
        const {eventId} = this.props.params
        this.props.fetchEvent(eventId)
    }

    componentDidUpdate() {
    }

    /* TODO: fix quick access menu
       it not rendered by semantic-ui-sticky now >_<
    */

    renderQuickAccessMenu() {
      return (
          <div className='two wide computer two wide tablet sixteen wide mobile column left-nav'>
            <div className="ui" ref='#'>
                <a className='link' href='#images'>写真</a>
                <a className='link' href='#members'>参加者</a>
                <a className='link' href='#info'>テーブルについて</a>
                <a className='link' href='#maps'>会場地図</a>
                <a className='link' href='#comments'>コメント</a>
            </div>
          </div>
      )
    }

    renderEventDetail() {
      return (
        <div className='blok-content'>
          <EventDetailHeader router={this.props.router}/>
          <EventDetailCover/>
          <div className='ui grid detail-content'>
            {this.renderQuickAccessMenu()}

            <div className='thirteen wide computer thirteen wide tablet sixteen wide mobile column'>
              <div className='ui detail-event' id='context'>
                <EventDetailBlocks />
                <EventDetailCommentForm />
                <EventDetailRelatived limit={4}/>
              </div>
            </div>
          </div>
        </div>
      )
    }

    render() {
      const {isFetching, errorMessage} = this.props
      let content

      if (isFetching) {
        content = (
          <div> Loading... </div>
        )
      }
      else if (!isFetching && errorMessage) {
        content = (
          <div> System Error: {errorMessage} </div>
        )
      }
      else {
        content = this.renderEventDetail()
      }

      return (
        <div className='detail-page'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>
          {content}
          <div>
          <button onClick={()=> {this.props.fetchEvent("event-1")}}>refresh</button
          >
          </div>
          <PageFooter />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  const {selectedEvent} = state
  const {isFetching, errorMessage} = selectedEvent

  return {
    isFetching: isFetching,
    errorMessage: errorMessage,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEvent: (eventId)=> {
    dispatch(fetchEventDetailIfNeed(eventId))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(DetailPage)
