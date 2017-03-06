import _ from 'lodash';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import '../../css/EventDetailHeader.css';

import InviteButton from './InviteButton';
import JoinButton from './JoinButton';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';

import {formatDateAndTimeStr,
        formatPrice} from '../../helpers/event';
import {getEventData} from '../../flux/modules/resource';

const EventDetailHeader = (props) => (
  <div className="ui stackable grid event-detail-header">
    {!props.isFetching &&
    <div className='three column row'>
        {/* colum 1*/}
        <div className='column title-header'>
           <h3 className='title-event'> {props.title} </h3>
           <p className='note-event'>{props.entryDealine}</p>
           <p className='note-event'>{props.genre.name}</p>
        </div>

        {/* colum 2*/}
        <div className='column detail-header'>
           <p className='des'>
             参加費 <span className='count'>{props.entryFee}</span>
           </p>
           <p className='des'>
             参加人数
             <span className='count'>{props.joinerCount}</span>
             /
             <span className='limit'>{props.joinerLimit}</span>
           </p>
        </div>

        {/* colum 3*/}
        <div className='column group-likes'>
          <InviteButton />
          <JoinButton push={props.router.push}/>
          <ShareButton />
          <LikeButton />
        </div>
   </div>
  }
  </div>
)

EventDetailHeader.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  title: PropTypes.string,
  entryDealine: PropTypes.string,
  openDateTime: PropTypes.string,
  genre: PropTypes.object.isRequired,
  entryFee: PropTypes.string,
  joinerCount: PropTypes.number,
  joinerLimit: PropTypes.number,
  router: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {

  const {isFetching, data} = getEventData(state)

  if (!isFetching) {
    const {id,
           name,
           startedRegistrationAt,
           openedAt,
           genre,
           entryFee,
           joinersCount, joinersLimit} = data
    return {
      eventId: id,
      isFetching: false,
      title: name,
      entryDealine: formatDateAndTimeStr(startedRegistrationAt),
      openDateTime: formatDateAndTimeStr(openedAt),
      genre: genre,
      entryFee: formatPrice(entryFee),
      joinerCount: joinersCount,
      joinerLimit: joinersLimit
    }
  }
  else {
    return {
      isFetching: true,
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailHeader)
