import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/EventDetailCommentForm.css';

import EventCommentBox from './EventCommentBox';

class EventDetailCommentForm extends Component {

  render() {

    return (
      <div className="event-detail-comment-form">
      <EventCommentBox
         eventId={this.props.eventId}
         limit={this.props.limit}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = "test-event-id";

  return {
    eventId: eventId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailCommentForm)
