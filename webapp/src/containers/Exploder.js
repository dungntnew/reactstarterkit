import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
import '../css/Exploder.css';

import RangedDateSelector from '../components/RangedDateSelector';
import KeywordInput from '../components/KeywordInput';
import TargetSelector from '../containers/TargetSelector';

class Exploder extends Component {
  constructor() {
    super()
    this.state = {
      dateSelecting: false,
      targetSelecting: false
    }
  }

  static propTypes = {
    fromDate: PropTypes.object,
    toDate: PropTypes.object,
    keyword: PropTypes.string,
    targets: PropTypes.arrayOf(PropTypes.object),
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
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
             this.props.onChange({startDate})}
           }

         handleChangeEnd={
           (endDate) => {
             this.setState({dateSelecting: false});
             this.props.onChange({endDate})}
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
        <TargetSelector
          selectedTargets={this.props.targets}
          onChange={(targets) => {
            this.props.onChange({targets})
            this.activeOne()
          }}
        />
      )
    }
  }

  formatedTarget() {
    return this.props.targets.map(target => target.name).join(',')
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
        this.props.onSearch()
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
          <KeywordInput onChange={(keyword) => {this.props.onChange({keyword})}}
                        value={this.props.keyword}
                        onClick={(e)=> {
                          this.activeOne()
                        }}/>
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
  endDate: moment(),
  keyword: 'keyword..',
  targets: [{
    id: 1,
    name: 'Niku'
  }, {
    id: 2,
    name: 'Sashimi'
  }]
};

const mapStateToProps = (state, ownProps) => ({
  startDate: store['startDate'],
  endDate: store['endDate'],
  keyword: store['keyword'],
  targets: store['targets']
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (data) => {
    data = _.pickBy(data, v => !_.isNull(v))
    console.log(data);
  },
  onSearch: () => {
    console.log('start search');
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Exploder)
