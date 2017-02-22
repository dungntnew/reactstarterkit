import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {action as toggleMenu} from 'redux-burger-menu';

const ToogleButton = (props) => (
    <button className='ui orange button sidebar-toogle-btn' 
            onClick={() => props.toogle()}>Toggle</button>
);

export default connect(()=>({}), (dispatch, ownProps)=>({
    toogle: ()=> {
        dispatch(toggleMenu({}, ownProps.menuName))
    }
}))(ToogleButton);