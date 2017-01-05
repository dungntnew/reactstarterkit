import _ from 'lodash'
import React, {Component, PropTypes}from 'react'
import {Link} from 'react-router';
import classNames from 'classnames';

import '../css/Pagination.css';

class Pagination extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
  }

  onPrevClick() {

  }

  onNextClick() {

  }

  render() {
    const {total, current} = this.props
    const hasNext = current < total
    const hasPrev = current > 1
    let skipBefore = false
    let skipAfter = false

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
           (i <= 5)
           // top last n items
           || (i >= total - 5)
           //3 items arround of active item
           || (i > current - 2 && i < current + 2)

         ) {
        return (
          <a  onClick={()=> this.props.onChangePage(i)}
              key={i}
              className='item'>{i}</a>
        )
      }

      // skip first active item
      else if (!skipBefore && i > 1 && i < current) {
        skipBefore = true
        return (
          <div  key={i} className="disabled item before-skip">
            ...
          </div>
        )
      }
      // skip last active item
      else if (!skipAfter && i < total  && i > current) {
        skipAfter = true
        return (
          <div  key={i} className="disabled item after-skip">
            ...
          </div>
        )
      }
    })


    return (
      <div className="ui pagination menu">
        {hasPrev &&
          <button className='ui icon button'
            onClick={()=> this.props.onPrevClick()}>
            <i className='chevron left icon'></i>
          </button>
        }

        {indices}

        {hasNext &&
          <button className='ui icon button'
            onClick={()=> this.props.onNextClick()}>
            <i className='chevron right icon'></i>
          </button>
        }
      </div>
    )
  }
}

export default Pagination;
