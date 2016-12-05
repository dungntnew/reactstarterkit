import React, {PropTypes} from 'react';

import '../css/KeywordInput.css';

const KeywordInput = (props) => (
  <input className='keyword-input'
       placeholder='keyword, etc..'
       type='text'
       value={props.value}
       onChange={(e) => {
         props.onChange(e.target.value)
       }}
       onClick={props.onClick}
       />
)

KeywordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
}

export default KeywordInput
