import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import '../css/EventTags.css';


const EventTags = (props) => (
  <div className="ui labels event-tags">
  {/* render target first */}
  {
    props.target && props.targetName &&
      <Link key='target'
            to={`/events/${props.target}`}
            className='ui label'>{`#${props.targetName}`}</Link>
  }
  {/* render tags list */}
  {
    _.slice(props.tags,0, props.limit)
      .map((tag, index) => (
      <Link key={index}
            to={`/events/?tag=${tag}`}
            className='ui label'>#{tag}</Link>
    ))
  }
</div>
)

EventTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  target: PropTypes.string,
  targetName: PropTypes.string,
  limit: PropTypes.number.isRequired
}

export default EventTags
