import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import '../css/EventDetailHeader.css';

import InviteButton from './InviteButton';
import JoinButton from './JoinButton';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';

const EventDetailHeader = (props) => (
  <div className="ui three column grid event-detail-header">
    <div className='row'>
        {/* colum 1*/}
        <div className='column'>
           <h3> {props.title} </h3>
           <p>{props.entryDealine}</p>
           <p>{props.genre}</p>
        </div>

        {/* colum 2*/}
        <div className='column'>
           <p>
             金額 <span>{props.entryFee}</span>
           </p>
           <p>
             参加人数
             <span>{props.joinerCount}</span>
             /
             <span>{props.joinerLimit}</span>
           </p>
        </div>

        {/* colum 3*/}
        <div className='column'>
          <InviteButton />
          <JoinButton />
          <ShareButton />
          <LikeButton />
        </div>
   </div>
  </div>
)

EventDetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  entryDealine: PropTypes.string.isRequired,
  openDateTime: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  entryFee: PropTypes.string.isRequired,
  joinerCount: PropTypes.number.isRequired,
  joinerLimit: PropTypes.number.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const {selectedEvent} = state
  return {
    title: 'Test Event',
    entryDealine: '10月5日 2:00PM',
    openDateTime: '10月6日 2:00~8:00PM',
    genre: '結婚記念日',
    entryFee: '8,000円',
    joinerCount: 25,
    joinerLimit: 30
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailHeader)
