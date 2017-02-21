import React from 'react'
import {Link} from 'react-router';
import {connect} from 'react-redux';

import BreakPoint from '../../components/screen-utils/BreakPoint';

import {CONTEXT_MENU_ITEMS} from '../../flux/modules/constant';

const link = (pathname, title) => (<Link to={pathname}>{title}</Link>)

import _ from 'lodash';

const renderMenuItems = (config) => {
  return _.map(config.items, (item, index) => (
    <div className='item' key={index}>
      <div className='header'>{item.title}</div>
      {item.childs && 
        <div className='menu'>
            {_.map(item.childs, (child, key) =>(
           <Link 
                key={key} 
                className="item" 
                activeClassName="active" 
                to={child.to}>{child.title}</Link>
           ))}
        </div>
        }
     
    </div>
  ))
}

const filteredMenuLinks = (isPC=true, authenticated=false) => {
  const linkItems = isPC ? CONTEXT_MENU_ITEMS.pc
                         : CONTEXT_MENU_ITEMS.mobile;

  const filtered = _.filter(linkItems, (item) => {
      return authenticated || !item.authRequired
  })
  return filtered;
}


const ContextSideBar = (props) => {
    const {authenticated, isMP} = props
    return (
      <div>
       <BreakPoint name='phone'>
         <div className="ui secondary vertical pointing menu">
           {renderMenuItems({items: filteredMenuLinks(false, authenticated)})}
          </div>
        </BreakPoint>
        
        <BreakPoint name='desktop'>
        {isMP && (
          <div className="ui secondary vertical pointing menu">
          {renderMenuItems({items: filteredMenuLinks(true, authenticated)})}
          </div>
          )}
         </BreakPoint>
       </div>
    )
}

const ContextedSideBar =  connect(
  (state, ownProps)=>{
    const {auth} = state
    const {authenticated, user} = auth
    
    return {
      authenticated,
      user,
    }
  }, 
(dispatch, ownProps)=>({

}))(ContextSideBar);

export const SideBar = (props) => {
    return (
        <ContextedSideBar isMP={false}/>
    )
}

export const MPSideBar = (props) => {
    return (
        <ContextedSideBar isMP={true}/>
    )
}