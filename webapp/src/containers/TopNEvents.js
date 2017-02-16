import _ from 'lodash'
import React, {
  Component,
  PropTypes
} from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router';

import {FetchableEventList} from '../containers/event/FetchableEventList'

import '../css/TopNEvents.css';


class TopNEvents extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    linkTitle: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired
  }

  render() {
    const {title, filter, linkTitle, limit} = this.props
    const link = `events/?${filter}=true`
    return (
      <div className='top-n-events'>
        <div className='block-events-header'>
          <div className='block-events-title'>{title} </div>
          <div className='block-events-link'>
            <Link to={link}>{linkTitle}</Link>
            <i className="angle right icon"></i>
          </div>
        </div>
        <FetchableEventList 
          query={{[filter]: true}}
          pagging={{limit: limit}}
          pathname={'/events'}
          listClassName='ui link three stackable cards block-events-content'
        />
      </div>
    )
  }
}

export default TopNEvents;
