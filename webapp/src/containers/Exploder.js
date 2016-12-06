import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';
import '../css/Exploder.css';

import RangedDateSelector from '../components/RangedDateSelector';
import KeywordInput from '../components/KeywordInput';
import TargetSelector from '../containers/TargetSelector';

class Exploder extends Component {
  constructor(props) {
    super(props)

    const {location} = props;
    const {query} = location;

    let startDate = query.startDate ? moment(query.startDate, 'YYYYMMDD') : moment()
    let endDate = query.endDate ? moment(query.endDate, 'YYYYMMDD') : moment()
    let keyword = query.keyword || ''
    let targets = query.targets || ''

    if (! (targets instanceof Array)) {
      targets = targets.split(',')
    }
    targets = targets.map(t=> parseInt(t, 10))

    if (keyword instanceof Array) {
      keyword = keyword.join(' ')
    }

    this.state = {
      dateSelecting: false,
      targetSelecting: false,
      startDate,
      endDate,
      keyword,
      targets
    }
  }

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.object.isRequired
    }).isRequired
  }

  onChange(data) {
    data = _.pickBy(data, v => !_.isNull(v))
    this.setState({
      ...data
    })
  }

  formatedDateRange() {
    const {startDate, endDate} = this.state
    const start = startDate.locale('ja').format('MMMDo')
    const end = endDate.locale('ja').format('MMMDo')
    return `${start}~${end}`
  }

  renderDateSelectors() {
    const datePicker = this.state.dateSelecting ? (
      <RangedDateSelector
         startDate={this.state.startDate}
         endDate={this.state.endDate}

         handleChangeStart={
           (startDate) => {
             this.setState({dateSelecting: false});
             this.onChange({startDate})}
           }

         handleChangeEnd={
           (endDate) => {
             this.setState({dateSelecting: false});
             this.onChange({endDate})}
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
          items={this.props.targetItems}
          selectedIds={this.state.targets}
          fetching={this.props.fetching}
          placeHolderText='Type to filter'
          loadingText='loading target'
          onClose={()=>{
            this.activeOne()
          }}
          onChange={(targets) => {
            this.onChange({targets})
            this.activeOne()
          }}
        />
      )
    }
  }

  formatedTarget() {
    const {targetItems} = this.props
    const {targets} = this.state

    return _.filter(targetItems, item => _.includes(targets, item.id)).map(t => t.label).join(',')
  }

  activeOne(key=undefined) {
    this.setState({
      targetSelecting: key === 'targetSelecting',
      dateSelecting: key === 'dateSelecting'
    })
  }

  buildSearchLink() {
    const {location} = this.props
    const {query} = location

    const mergedQuery = Object.assign({}, query, {
      startDate: this.state.startDate.format('YYYYMMDD'),
      endDate: this.state.endDate.format('YYYYMMDD'),
      keyword: this.state.keyword,
      targets: this.state.targets,
    })

    return {
      pathname: '/search',
      query: mergedQuery
    }
  }

  render() {;
    const dateSelectors = this.renderDateSelectors();
    const targetSelectors = this.renderTargetSelectors();

    return (
      <div className='exploder'>
      <form onSubmit={(e) => {
        e.preventDefault()
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
          <KeywordInput onChange={(keyword) => {this.onChange({keyword})}}
                        value={this.state.keyword}
                        onClick={(e)=> {
                          this.activeOne()
                        }}/>
          <Link
            to={this.buildSearchLink()}
            className='ui button'
          >Search</Link>
      </div>

      {dateSelectors}
      {targetSelectors}

      </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {target} = state
  const {fetching, items} = target;

  return {
    fetching: fetching,
    targetItems: items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(Exploder)
