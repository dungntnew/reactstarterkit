import _ from 'lodash'
import React, {Component, PropTypes}from 'react'
import {Link} from 'react-router';
import classNames from 'classnames';

import '../css/Pagination.css';

import {parsePaggingParams} from '../helpers/params'

class Pagination extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
  }

  buildUrlToPage(pathname, mergedQuery, i) {
    return {
      pathname: pathname,
      query:Object.assign({}, mergedQuery, {from: i})
    }
  }

  render() {
    const {total, current, pathname} = this.props
    const hasNext = current < total
    const hasPrev = current > 1
    let skipBefore = false
    let skipAfter = false

    const {location} = this.props
    const {query} = location
    const {from, limit} = parsePaggingParams(location, 25)

    const mergedQuery = Object.assign({}, query, {from, limit})


    const indices = _.range(1, total).map(i => {

      // active index
      if (i === current) {
        return (
          <a key={i} className='active item'>{i}</a>
        )
      }
      //
      else if (
           // top first n items
           (i <= 4)
           // top last n items
           || (i >= total - 4)
           //3 items arround of active item
           || (i > current - 2 && i < current + 2)

         ) {
        return (
          <Link key={i} className='item' to={this.buildUrlToPage(pathname, mergedQuery, i)}>{i}</Link>
        )
      }

      // skip first active item
      else if (!skipBefore && i > 1 && i < current) {
        skipBefore = true
        return (
          <a  key={i} className="disabled item before-skip">
            ...
          </a>
        )
      }
      // skip last active item
      else if (!skipAfter && i < total  && i > current) {
        skipAfter = true
        return (
          <a  key={i} className="disabled item after-skip">
            ...
          </a>
        )
      }
    })


    return (
      <div className='pagination'>

        <div className=" ui borderless menu">
          {hasPrev &&
            <Link className='pagination-icon'
                  to={this.buildUrlToPage(pathname, mergedQuery, current-1)}>
                  <i className='chevron left icon'></i>
            </Link>
          }

          {indices}

          {hasNext &&
            <Link className='pagination-icon'
                  to={this.buildUrlToPage(pathname, mergedQuery, current+1)}>
                  <i className='chevron right icon'></i>
            </Link>
          }
        </div>
      </div>
    )
  }
}

export default Pagination;
