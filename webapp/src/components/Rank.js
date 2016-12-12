import React, {PropTypes, Component} from 'react';


const Rank =(props) => {

  const cssClasses = classNames({
    'icon-star': this.props.selected,
    'icon-star-emtry': !this.props.selected,
    'star-item': true
  })

  const ranks=[1,2,3,4,5]

  const stars=ranks.map(val,index)=>{
    const className=val>props.rank ? 'icon-star':'icon-star-emtry';
    return(
      <li onClick={()=>props.onRate(val)}>
        <i className={className} />
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
