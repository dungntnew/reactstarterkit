
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'


import '../../css/fqa/Question.css'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  static propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }))
  }

  onChange(index) {
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const {lists} = this.props
    const items = lists.map((list, index) =>(
        <div  classname='item'
              key={index}
              onClick={()=>{this.onChange(index)}}>

          <h4 className='title'>{list.title}<i className='dropdown icon'></i></h4>
          <div className={this.state.activeIndex === index ? 'content show' : 'content hide'}>
            <p>{list.text}</p>
          </div>
        </div>
      ))

    return(
      <div className='ui text container question'>
        <h2 className='text-title'>ヘルプ / FAQ</h2>
        <div class="ui accordion">
        {items}
        </div>
      </div>
    )
  }
}

export default Question
