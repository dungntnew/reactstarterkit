import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import '../css/EventEditForm.css';


class EventEditForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  static propTypes = {
    event: PropTypes.shape({
      // todo
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render() {
    const {event} = this.props


    return (
      <div className='event-edit-form'>
            <form className="ui form">
              <div className="field">
                <label>First Name</label>
                <input type="text" name="first-name" placeholder="First Name"/>
              </div>
              <div className="field">
                <label>Last Name</label>
                <input type="text" name="last-name" placeholder="Last Name"/>
              </div>
              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" tabIndex="0" className="hidden"/>
                  <label>I agree to the Terms and Conditions</label>
                </div>
              </div>
              <button className="ui button" type="submit">Submit</button>
            </form>
      </div>
    )
  }
}

export default EventEditForm
