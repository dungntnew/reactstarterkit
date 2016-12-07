import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';
import '../css/Exploder.css';

import RangedDateSelector from '../components/RangedDateSelector';
import KeywordInput from '../components/KeywordInput';
import TargetSelector from '../containers/TargetSelector';

import * as helpers from '../helpers';

class Exploder extends Component {
  constructor(props) {
    super(props)

    const {location} = props;
    const {query} = location;
    const params = helpers.normalizeSearchParams(query)
    const {startDate, endDate, keyword, target} = params

    this.state = {
      dateSelecting: false,
      targetSelecting: false,
      startDate,
      endDate,
      keyword,
      target
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
    return helpers.displayDatePair(startDate, endDate, '~', '時間')
  }

  renderDateSelectors() {
    const datePicker = this.state.dateSelecting ? (
      <RangedDateSelector
         startDate={this.state.startDate　|| null}
         endDate={this.state.endDate || null}

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
          selectedIds={[this.state.target]}
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
    const {target} = this.state

    return _.filter(targetItems, item => _.includes([target], item.id)).map(t => t.label).join(',')
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
    const normalizedQuery = helpers.paramsToQueryObject(this.state)

    const mergedQuery = Object.assign({}, query, normalizedQuery)

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
