import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import EventTags from '../components/EventTags';

import 'semantic-ui-progress/progress.min.css'
import '../css/EventItem.css';
import '../css/EventListItem.css';

$.fn.progress = require('semantic-ui-progress')

import {
  formatPrice,
  formatDateAndTimeStr
} from '../helpers/event';

import {EventStatus} from '../flux/modules/constant'

class EventListItem extends Component {
  static propTypes = {
    coverImageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired),
    joinerCount: PropTypes.number.isRequired,
    joinerLimit:　PropTypes.number.isRequired,
    openDate: PropTypes.string.isRequired,
    registrationDateStart: PropTypes.string.isRequired,
    registrationDateEnd: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,

    owned: PropTypes.bool.isRequired,
    unLike: PropTypes.func.isRequired,
    closeEvent: PropTypes.func.isRequired,
    requestProfit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const percent = this.joinPercent()
    $(this.refs.joinProgress).progress({
      percent: percent * 100,
      showActivity: false,
    })
  }

  joinPercent() {
    const {joinerCount, joinerLimit} = this.props
    const total = joinerLimit > 1 ? joinerLimit : 1
    return joinerCount / total;
  }

  showError() {
    alert("ERROR---")
  }

  renderActions() {

    const {status} = this.props

    let nextAction;

    switch (status) {
      case EventStatus.OPENING:
        nextAction = (
          <button className='ui red button' onClick={()=> this.props.closeEvent()}>終了申請</button>
        )
        break;
      case EventStatus.CLOSED:
        nextAction = (
          <button className='ui green button' onClick={() => this.props.requestProfit()}>売上申請</button>
        )
        break;
      case EventStatus.CLOSE_FAILED:
        nextAction = (
          <button className='ui red button' onClick={() => this.showError()}>エラー</button>
        )
        break;
      case EventStatus.PROFIT_CONFIRMING:
        nextAction = (
          <button className='ui orange button disabled'>売上申請中</button>
        )
        break;
      case EventStatus.PROFIT_CONFIRMED:
        nextAction = (
          <button className='ui blue button disabled'>売上申請承認済み</button>
        )
        break;
      case EventStatus.PROFIT_CONFIRM_FAILED:
        nextAction = (
          <button className='ui red button disabled'>売上申請失敗</button>
        )
        break;
      default:
    }

    return (
      <div className='event-actions'>
      {nextAction}
      </div>
    )
  }

  renderRemoveBookmark() {
    return (
      <div className="ui orange ribbon label"
        onClick={()=> {this.props.unLike()}}
        >
        <i className="remove bookmark icon"></i>
      </div>
    )
  }

  render() {
    const {
      url,
      title,
      coverImageUrl,
      price,
      address,
      joinerCount,
      joinerLimit,
      openDate,
      registrationDateEnd,
      tags,
      target,
      targetName,
      owned,
      liked,
    }
    = this.props

    const percent = this.joinPercent()

    const progressClasses = classNames({
      'ui bottom attached green progress': percent < 0.5,
      'ui bottom attached orange progress': (percent >= 0.5 && percent < 0.7),
      'ui bottom attached red progress': percent >= 0.7,
    })

    return (
      <div className='card event-item'>

        <a className='image event-cover-img'
           href={url}>
          {!owned && liked &&
            this.renderRemoveBookmark()}
          <img alt='event-cover-img' src={coverImageUrl}/>
        </a>
        <div className="ui top right attached label price text-orange">
           {formatPrice(price)}
        </div>


        <div className="content">
           <a className="header-item" href={url}>{title}</a>

           <div className="address">
             {address}
           </div>
           <EventTags tags={tags} target={target} targetName={targetName} limit={4}/>
           <div className="meta joiner-info">
             <span className='title'>参加人数:</span>
             <span className='joiner-count'>{joinerCount}</span>
              /
              <span className='joiner-limit'>{joinerLimit}</span>
           </div>

           <div className="meta open-date">
             <span className='title date'>開催日:</span>
             <span>{formatDateAndTimeStr(openDate)}</span>
           </div>

           <div className="meta registration-info">
             <span className='title'>参加期限:</span>
             <span className='registration-end'>
                {formatDateAndTimeStr(registrationDateEnd)}
             </span>
           </div>
        </div>

        <div className='extra content'>
        {owned && this.renderActions()}
        </div>

        <div ref='joinProgress' className={progressClasses}>
          <div className="bar"></div>
        </div>

      </div>
    )
  }
}

export default EventListItem
