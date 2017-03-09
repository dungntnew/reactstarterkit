import React from 'react'
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {slide as Menu} from 'react-burger-menu';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';

const BurgerMenu = reduxBurgerMenu(Menu, 'primary');


import BreakPoint from '../../components/screen-utils/BreakPoint';

import {CONTEXT_MENU_ITEMS} from '../../flux/modules/constant';

const link = (pathname, title) => (<Link to={pathname}>{title}</Link>)

import _ from 'lodash';

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

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
         <BurgerMenu 
           style={styles}
           /*className="ui secondary vertical pointing menu" */
           >
           {/*{renderMenuItems({items: filteredMenuLinks(false, authenticated)})}*/}
          <div className="ui secondary vertical pointing menu">
          {renderMenuItems({items: filteredMenuLinks(true, authenticated)})}
          </div>
          </BurgerMenu>
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
        <ContextedSideBar isMP={false}/>
    )
}