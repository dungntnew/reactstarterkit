import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import '../css/QuickSearchBar.css';

import KeywordInput from '../components/KeywordInput';

import * as helpers from '../helpers';

class QuickSearchBar extends Component {
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

    return (
      <div className='quick-search-bar'>
        <form className='ui form' onSubmit={(e) => {
          e.preventDefault()
        }}>
          <KeywordInput onChange={(keyword) => {this.onChange({keyword})}}
                        value={this.state.keyword}
          />
          <Link
              to={this.buildSearchLink()}>
              <i className='search icon'></i>
          </Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(QuickSearchBar)
