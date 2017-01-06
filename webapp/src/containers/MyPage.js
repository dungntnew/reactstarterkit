import React, {Component, PropTypes} from 'react'

import '../css/MyPage.css';

class MyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  componentDidMount() {
    
  }

  renderMenu() {
    return (
      <div className="ui secondary vertical pointing menu">
          <div className="item">
            <div className="header">Products</div>
            <div className="menu">
              <a className="item">Enterprise</a>
              <a className="item">Consumer</a>
            </div>
          </div>
          <div className="item">
            <div className="header">CMS Solutions</div>
            <div className="menu">
              <a className="item">Rails</a>
              <a className="item active">Python</a>
              <a className="item">PHP</a>
            </div>
          </div>
          <div className="item">
            <div className="header">Hosting</div>
            <div className="menu">
              <a className="item">Shared</a>
              <a className="item">Dedicated</a>
            </div>
          </div>
          <div className="item">
            <div className="header">Support</div>
            <div className="menu">
              <a className="item">E-mail Support</a>
              <a className="item">FAQs</a>
            </div>
          </div>
        </div>
    )
  }

  render() {
    return (
      <div className='ui sixteen wide column left aligned grid mypage'>
        <div className='left floated three wide column'>
        {this.renderMenu()}
        </div>
        <div className='left floated thirteen wide column'>
        {this.props.children}
        </div>
      </div>
    )
  }
}

export default MyPage
