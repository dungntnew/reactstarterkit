
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory, Link} from 'react-router';
import classNames from 'classnames';

import '../css/EventListMyPage.css';

import EventListItem from '../components/EventListItem'

import { FetchableEventList } from '../containers/event/FetchableEventList';

import { eventListForMyPageTabId } from '../helpers/query_builder';

import {EVENT_LIST_TITLES, EVENT_STATUS_TITLES} from '../flux/modules/constant';


class EventListMyPage extends Component {

  renderStatusFilters() {
    const {service, status} = this.props.params // for ex: created/stopped

    const filterMenuItems = _.keys(EVENT_STATUS_TITLES).map((filter, index) => (
      <a className={classNames({
        'item': true,
        'active': filter === status
      })
      }
        key={index}
        onClick={() => {
          const pathname = `/mypage/events/${service}/${filter}`
          browserHistory.push({
            pathname,
          })
        }}
      >
        {EVENT_STATUS_TITLES[filter]}
      </a>
    ))

    return (
      <div className="ui secondary menu status-filter-menu">
        {filterMenuItems}
        <div className="right menu">
          <Link to='/create'
            className="ui orange icon button">
            <i className="plus icon"></i>
            新規登録
             </Link>
        </div>
      </div>
    )
  }

  render() {
    const {userId} = this.props // load from auth state
    const {service, status} = this.props.params // for ex: created/stopped

    const {query, pagging} = eventListForMyPageTabId(userId, service, status)
    const pathname = `/mypage/events/${service}/${status}`

    return (
      <div className='event-list-mypage'>
        <div className='event-list-title'>
          {EVENT_LIST_TITLES[service]}
        </div>

        <div className='block-content'>
          {this.renderStatusFilters()}
          <div className="ui section divider"></div>
          <FetchableEventList
            router={this.props.router}
            location={this.props.location}
            query={query}
            pagging={pagging}
            paginated={true}
            pathname={pathname}
            listClassName='ui link two stackable cards block-events-content'
            itemRender={(item, index, className) => {
              return (<EventListItem
                key={index} {...item}
                closeEvent={() => this.props.closeEvent(item.id)}
                requestProfit={() => this.props.requestProfit(item.id)}
                unLike={() => { }}
              />)
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeEvent: (eventId) => {
    console.log("request close event: ", eventId)
  },
  requestProfit: (eventId) => {
    console.log("requet profit for: ", eventId)
  },
  unLike: (eventId) => {
    console.log("unLike  for: ", eventId)
  }
})

export default connect(mapStateToProps,
  mapDispatchToProps)(EventListMyPage)
