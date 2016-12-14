import React, {PropTypes} from 'react';
import classNames from 'classnames';

import '../css/EventEditSteps.css';

const EventEditSteps = (props) => (
  <div className="ui ordered steps event-edit-steps">
  {
    props.steps.map((step, index)=>(
      <div className={
        classNames({
          completed: step.completed,
          active: step.active,
          step: true,
        })
      }
      key={index}
      >
        <div className="content">
          <div className="title">{step.title}</div>
          {step.desc &&
            <div className="description">{step.desc}</div>
          }
        </div>
      </div>
    ))
  }
  </div>
)

EventEditSteps.propTypes = {
  steps : PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
  })).isRequired
}

export default EventEditSteps
