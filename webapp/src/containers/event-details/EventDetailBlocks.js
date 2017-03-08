import $ from 'jquery';
import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'

import '../../css/EventDetailBlocks.css';

import EventTags from '../../components/EventTags';
import MemberList from '../../components/MemberList';

import {formatAddress,
        addressToGoogleMapsLink,
        googleMapIFrameLink,
        formatKeyValuePairData} from '../../helpers/event';

import {getEventData} from '../../flux/modules/resource';

import {commingSoon} from '../../helpers/';

$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.modal = require('semantic-ui-modal')

class EventDetailBlocks extends Component {

  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    target: PropTypes.object.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    memberCount: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    addressLink: PropTypes.string.isRequired,
    googleMapIframeLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,

  }

  showMemberList() {
    $(this.refs.fullMemberList).modal('show')
  }

  renderTags() {
    return (
      <EventTags tags={this.props.tags}
                 target={this.props.target}
                 limit={5}
      />
    )
  }

  renderJoiningMembers() {
    const {members, memberCount} = this.props

    const content = members.map((member, index)=>(
      <div className='item' key={index}>
        <div className='ui avatar tiny image'>
        <Link to={member.url} onClick={(e)=>commingSoon(e)}>
           <img src={member.avatarUrl} alt='avatar'/>
        </Link>
        </div>
      </div>
    ))

    const memberMenu = (
      <div className='item'>
        <div className='ui avatar tiny wide computer mini wide mobile image'>
          <a href='#' onClick={(e)=>{ e.preventDefault(); this.showMemberList()}}>
              <i className='ellipsis horizontal icon'></i>
           </a>
        </div>
      </div>
    )

    return(
      <div className='block member-block'>
        <div className='block-header'>参加者 <span>{memberCount}</span></div>
        <div className='ui horizontal list list-member'>
           {content}
           {memberCount > 1 && memberMenu}
        </div>
      </div>
    )
  }

  renderFullMemberList() {
    return (
      <div className='ui modal' ref='fullMemberList'>
         <MemberList members={this.props.members} onRemove={this.props.removeMember} />
      </div>
    )
  }

  renderInfoRows() {
      return (
        <table className="ui padded table">
        <tbody>
        {
          this.props.keyValuePairData.map((kv, index)=>(
            <tr key={index}>
               <td>{kv.key}</td>
               <td>{kv.value}</td>
            </tr>
          ))
        }
        </tbody>
        </table>
      )
  }

  renderTableInfo() {
    return (
      <div className='block short-desc-block'>
      <div className='block-header'>
          <div> テーブルについて </div>
      </div>
      <div className='description' 
           dangerouslySetInnerHTML={ {__html: this.props.description} } />
      <div className='table-info'>
          {this.renderInfoRows()}
      </div>
      </div>
    )
  }


  renderMaps() {
    const style = {
      border: 0
    }

    return (
      <div className='block map-block'>
        <div className='block-header'>
          <div> 会場地図</div>
        </div>
        <div className='address'>
           {this.props.address}
        </div>
        <div className='map-content'>
          <a href={this.props.addressLink}>Google Mapで見る</a>

          <div className='google-maps'>
              <iframe width="100%"
                      height="240"
                      frameBorder="0"
                      style={style}
                      src={this.props.googleMapIframeLink}>
              </iframe>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="event-detail-blocks">
      {this.renderTags()}
      {this.renderJoiningMembers()}
      {this.renderTableInfo()}
      {this.renderMaps()}
      {this.renderFullMemberList()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {isFetching, data} = getEventData(state)

  return {
    isFetching: isFetching,
    tags: data.tags,
    target: data.target,
    members: _.map(data.participators, (u)=> Object.assign({}, u, {
      id: `${u.id}`,
      url: `/members/${u.id}`,
      avatarUrl: u.avatarUrl || '/img/avatar.png',
      displayName: u.displayName || u.email || `参加者[${u.id}]`,
    })),
    memberCount: data.joinersCount,
    address: formatAddress(data),
    addressLink: addressToGoogleMapsLink(data),
    googleMapIframeLink: googleMapIFrameLink(data),
    description: data.description,
    keyValuePairData: formatKeyValuePairData(data),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeMember: (memberId) => { console.log(memberId); }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailBlocks)
