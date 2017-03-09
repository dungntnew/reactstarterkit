import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import '../css/EventTags.css';

import {commingSoon} from '../helpers/';

const EventTags = (props) => (
  <div className="ui labels event-tags">
  {/* render target first */}
  {
    props.target &&
      <Link onClick={(e)=> commingSoon(e)}
            key='target'
            to={`/events/?target=${props.target.id}`}
            className='ui label'>{`#${props.target.name}`}</Link>
  }
  {/* render tags list */}
  {
    _.slice(props.tags,0, props.limit)
      .map((tag, index) => (
      <Link onClick={(e) => commingSoon(e)}
            key={index}
            to={`/events/?tag=${tag.id}`}
            className='ui label'>#{tag.name}</Link>
    ))
  }
</div>
)

EventTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  target: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired
}

export default EventTags
