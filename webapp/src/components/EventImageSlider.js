import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

import '../css/EventImageSlider.css';

class EventImageSlider extends Component {

  constructor(props) {
    super(props)

    const {startIndex} = props
    console.log('start index: ', startIndex)

    this.state = {
      activeIndex: startIndex
    }
  }

  static defaultProps = {
    startIndex: 0
  }

  static propTypes = {
    startIndex: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }

  onNext() {
    const {images } = this.props
    let {activeIndex} = this.state

    activeIndex +=1

    if (activeIndex >= images.length - 1) {
      this.setState({activeIndex: 0})
    }
    else {
      this.setState({activeIndex: activeIndex})
    }
  }

  onPrev() {
    const {images } = this.props
    let {activeIndex} = this.state

    activeIndex -=1

    if (activeIndex < 0) {
      this.setState({activeIndex: images.length - 1})
    }
    else {
      this.setState({activeIndex: activeIndex})
    }
  }

  render(){
    const {images } = this.props
    const {activeIndex} = this.state

    const activeUrl = images[activeIndex]

    const thumbnails = images.map((url, index)=>(
      <img key={index}

           className={
             classNames({
             'ui item small image': true,
             'active': index === activeIndex
           })}

           onClick={()=>{
             this.setState({activeIndex: index})
           }}

           src={url}
      />
    ))

    return (
        <div className="event-image-slider">

          <div className='ui segment basic'>

            <div
              onClick={()=>{this.onPrev()}}
              className='ui left floated icon left-icon'>
              <i className="chevron left icon big"></i>
            </div>

            <div
              onClick={()=>{this.onNext()}}
              className='ui right floated icon right-icon'>
              <i className="chevron right icon big"></i>
            </div>

            <img className='ui centered large image'
                   src={activeUrl}
                   alt='full event pic'
              />

          </div>


          <div className=''>
            <div>写真キャプション</div>
            <div className='ui horizontal selection list'>
               {thumbnails}
            </div>
          </div>
        </div>
      )
    }
}

export default EventImageSlider
