import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';

import '../css/EventDetailCommentForm.css';

import EventCommentBox from './EventCommentBox';

class EventDetailCommentForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
  }

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
