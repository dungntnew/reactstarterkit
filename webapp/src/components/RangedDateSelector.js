import React, {PropTypes} from 'react';
import 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/RangedDateSelector.css';

const RangedDateSelector = (props) => (
  <div className='ranged-date-selector'>
  <DatePicker
    inline
    locale='ja'
    todayButton='本日'
    className='date-selector'
    selected={props.startDate}
    selectsStart
    startDate={props.startDate}
    endDate={props.endDate}
    onChange={props.handleChangeStart}
  />

  <DatePicker
    inline
    locale='ja'
    todayButton='本日'
    className='date-selector'
    selected={props.endDate}
    selectsEnd
    startDate={props.startDate}
    endDate={props.endDate}
    onChange={props.handleChangeEnd}
  />

  <div>
    <button className='ui button'
            onClick={(e) => props.onClose()}>Close</button>
  </div>
  </div>
)

RangedDateSelector.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  handleChangeStart: PropTypes.func,
  handleChangeEnd: PropTypes.func,
  onClose: PropTypes.func.isRequired
}

export default RangedDateSelector
