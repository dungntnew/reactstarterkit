import React, {PropTypes} from 'react';

const ToogleButton = (props) => (
    <button className='ui orange button sidebar-toogle-btn' 
            onClick={() => props.toogle()}>Toggle</button>
);

ToogleButton.propTypes = {
    toogle: PropTypes.func.isRequired,
}

export default ToogleButton;