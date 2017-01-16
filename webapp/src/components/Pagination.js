import _ from 'lodash'
import React, {Component, PropTypes}from 'react'

import '../css/Pagination.css';

import {parsePaggingParams} from '../helpers/params'

class Pagination extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChanged: PropTypes.func.isRequired,
  }

  buildUrlToPage(pathname, mergedQuery, i) {
    const url= {
      pathname: pathname,
      query:Object.assign({}, mergedQuery, {from: i})
    }
    this.props.router.push(url)
    this.props.onChanged(i)
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
          <a key={i} className='item' onClick={()=> {this.buildUrlToPage(pathname, mergedQuery, i)}}>{i}</a>
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
      else {
        return null
      }
    })


    return (
      <div className='pagination'>

        <div className=" ui borderless menu">
          {hasPrev &&
            <a className='pagination-icon'
                  onClick={()=> this.buildUrlToPage(pathname, mergedQuery, current-1)}>
                  <i className='chevron left icon'></i>
            </a>
          }

          {indices}

          {hasNext &&
            <a className='pagination-icon'
                  to={()=> this.buildUrlToPage(pathname, mergedQuery, current+1)}>
                  <i className='chevron right icon'></i>
            </a>
          }
        </div>
      </div>
    )
  }
}

export default Pagination;
