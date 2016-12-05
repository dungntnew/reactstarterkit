import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import '../css/Exploder.css';

import RangedDateSelector from '../components/RangedDateSelector';

class Exploder extends Component {
  constructor() {
    super()
    this.state = {
      dateSelecting: false,
      targetSelecting: false
    }
  }

  static propTypes = {
  }

  onSubmit() {
    console.log('form submit.');
  }

  formatedDateRange() {
    const start = this.props.startDate ? this.props.startDate.locale('ja').format('MMMDo'): ''
    const end = this.props.endDate ? this.props.endDate.locale('ja').format('MMMDo'): ''
    return `${start}~${end}`
  }

  renderDateSelectors() {
    const datePicker = this.state.dateSelecting ? (
      <RangedDateSelector
         startDate={this.props.startDate}
         endDate={this.props.endDate}

         handleChangeStart={
           (startDate) => {
             this.setState({dateSelecting: false});
             this.props.handleChangeStart(startDate)}
           }

         handleChangeEnd={
           (endDate) => {
             this.setState({dateSelecting: false});
             this.props.handleChangeEnd(endDate)}
           }
      />
    ): null;

    return (
      <div> {datePicker} </div>
    )
  }

  renderTargetSelectors() {
    if (this.state.targetSelecting) {
      return (
        <div> Target Selector </div>
      )
    }
  }

  formatedTarget() {
    return 'a, b, c';
  }

  activeOne(key=undefined) {
    this.setState({
      targetSelecting: key === 'targetSelecting',
      dateSelecting: key === 'dateSelecting'
    })
  }

  render() {
    const dateSelectors = this.renderDateSelectors();
    const targetSelectors = this.renderTargetSelectors();

    return (
      <div className='exploder'>
      <form onSubmit={(e) => {
        e.preventDefault()
        this.onSubmit()
      }}>

      <div className='form-elements'>
          <button type='button'
                  className='formated-date-range'
                  onClick={(e)=> {
                    e.preventDefault();
                    this.activeOne('dateSelecting')
                  }}
                  >{this.formatedDateRange()}
          </button>

          <button type='button'
                  className='formated-target-name'
                  onClick={(e)=> {
                    e.preventDefault();
                    this.activeOne('targetSelecting')
                  }}
                  >{this.formatedTarget()}
          </button>

          <button type='submit' value='Search'>Search</button>
      </div>

      {dateSelectors}
      {targetSelectors}

      </form>
      </div>
    )
  }
}

/* TODO: binding value and dispatch functions */
// fetch store
const store = {
  startDate: moment(),
  endDate: moment()
};

const mapStateToProps = (state, ownProps) => ({
  startDate: store['startDate'],
  endDate: store['endDate']
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChangeStart: (startDate) => {
    console.log(`selected start date=${startDate}`);
  },
  handleChangeEnd: (endDate) => {
    console.log(`selected end date=${endDate}`);
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Exploder)
