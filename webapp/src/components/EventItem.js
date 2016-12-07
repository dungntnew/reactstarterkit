import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import '../css/EventItem.css';

import {
  formatPrice,
  formatOpenDate,
  formatRegistrationDateTime
} from '../helpers/event';

class EventItem extends Component {
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
  }

  componentDidMount() {
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
      registrationDateStart,
      registrationDateEnd
    }
    = this.props

    return (
      <div className='card event-item'>
        <a className='image event-cover-img'
           href={url}
            >
          <img
             alt='event-cover-img'
             src={coverImageUrl}
          />
        </a>
        <div className="ui top right attached white label price">
           {formatPrice(price)}
        </div>

        <div className="content">
           <a className="header" href={url}>{title}</a>

           <div className="meta address">
             {address}
           </div>
           <div className="meta joiner-info">
             参加人数:
             <span className='joiner-count'>{joinerCount}</span>
              /
              <span className='joiner-limit'>{joinerLimit}</span>
           </div>

           <div className="meta open-date">
             開催日:
             <span>{formatOpenDate(openDate)}</span>
           </div>

           <div className="meta registration-info">
             参加期限:
             <span className='registration-start'>
                {formatRegistrationDateTime(registrationDateStart)}
             </span>
             ~
             <span className='registration-end'>
                {formatRegistrationDateTime(registrationDateEnd)}
             </span>
           </div>
        </div>

        <div ref='joinProgress'
             className="ui bottom attached violet progress"
             data-value="50" data-total="200"
          >
          <div className="bar">
             <div className="progress"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default EventItem;
