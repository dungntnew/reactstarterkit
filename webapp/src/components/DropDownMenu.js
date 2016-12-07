import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import '../css/DropDownMenu.css';


class DropDownMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    const subMenuClasses = classNames({
      'dropdown-menu-content': true,
      'active': this.state.active
    })

    const {links} = this.props

    const menuItems = links.map((link, index) => (
      <li className="dropdown-item" key={index}>{link}</li>
    ))

    return (
      <div className='dropdown-menu'
           onMouseEnter={()=> this.setState({active: true})}
      >
        <div
          className={subMenuClasses}
          onMouseLeave={()=> this.setState({active: false})}
        >
          <ul>
           {menuItems}
          </ul>
        </div>

      </div>
    )
  }
}

export default DropDownMenu
