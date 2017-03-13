import _ from 'lodash'
import React, { Component, PropTypes } from 'react'

import '../css/Pagination.css';

import { Link } from 'react-router'

class Pagination extends Component {

  static propTypes = {
    query: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onChanged: PropTypes.func.isRequired,
  }

  render() {
    const {
      totalPages,
      currentPage,
      pathname,
      query, onChanged} = this.props

    const hasNext = currentPage < totalPages
    const hasPrev = currentPage > 1
    let skipBefore = false
    let skipAfter = false

    const mergedQuery = Object.assign({}, query, {currentPage})


    const indices = _.range(1, totalPages).map(i => {

      // active index
      if (i === currentPage) {
        return (
          <a key={i} className='active item'>{i}</a>
        )
      }
      //
      else if (
        // top first n items
        (i <= 4)
        // top last n items
        || (i >= totalPages - 4)
        //3 items arround of active item
        || (i > currentPage - 2 && i < currentPage + 2)

      ) {
        return (
          <Link className='item'
            key={i}
            to={{
              pathname: pathname,
              query: Object.assign({}, mergedQuery, { currentPage: i })
            }}
            onClick={()=> onChanged()}
            >{i}
            
          </Link>)
      }

      // skip first active item
      else if (!skipBefore && i > 1 && i < currentPage) {
        skipBefore = true
        return (
          <a key={i} className="disabled item before-skip">
            ...
          </a>
        )
      }
      // skip last active item
      else if (!skipAfter && i < totalPages && i > currentPage) {
        skipAfter = true
        return (
          <a key={i} className="disabled item after-skip">
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
            <Link className='pagination-icon'
              to={
                {
                  pathname: pathname,
                  query: Object.assign({}, mergedQuery, { currentPage: currentPage - 1 })
                }
              }
              onClick={()=> onChanged()}
              >
              <i className='chevron left icon'></i>
            </Link>
          }

          {indices}

          {hasNext &&
            <Link className='pagination-icon'
              to={
                {
                  pathname: pathname,
                  query: Object.assign({}, mergedQuery, { currentPage: currentPage + 1 })
                }
              }
              onClick={()=> onChanged()}
              >
              <i className='chevron right icon'></i>
            </Link>
          }
        </div>
      </div>
    )
  }
}

export default Pagination;
