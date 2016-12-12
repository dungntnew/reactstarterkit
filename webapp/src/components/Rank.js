import React, {PropTypes} from 'react';
import classNames from 'classnames';

import '../css/Rank.css';

const Rank =(props) => {

  const cssClasses = classNames({
    'icon-star': this.props.selected,
    'icon-star-emtry': !this.props.selected,
    'star-item': true
  })

  const ranks=[1,2,3,4,5]

  const stars=ranks.map(val,index)=>{

    return(
      <li onClick={()=>props.onRate(val)}>
        <i className={cssClasses} />
      </li>
    )
  }

  return (
    <ul className='rank'>
      {start}
    </ul>
  )
}

export default Rank;
