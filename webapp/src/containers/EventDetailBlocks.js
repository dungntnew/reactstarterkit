import $ from 'jquery';
import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';

import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'

import '../css/EventDetailBlocks.css';

import EventTags from '../components/EventTags';
import MemberList from '../components/MemberList';

$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.modal = require('semantic-ui-modal')

class EventDetailBlocks extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    target: PropTypes.string,
    targetName: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      userAvatar: PropTypes.string.isRequired,
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
                 targetName={this.props.targetName}
                 limit={5}
      />
    )
  }

  renderJoiningMembers() {
    const {members, memberCount} = this.props

    const content = members.map((member, index)=>(
      <div className='item' key={index}>
        <div className='ui avatar tiny image'>
        <Link to={member.url}>
           <img src={member.userAvatar} alt='avatar'/>
        </Link>
        </div>
      </div>
    ))

    const memberMenu = (
      <div className='item'>
        <div className='ui avatar tiny image'>
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
           {memberMenu}
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

    /* TODO: matching props data to key-value pair HERE */
    const rowsData = [{
      key: 'Field -1',
      value: 'Data-1'
    },
    {
      key: 'Field -2',
      value: 'Data-2'
    },
    {
      key: 'Field -3',
      value: 'Data-3'
    },
    {
      key: 'Field -4',
      value: 'Data-5'
    }]

      return (
        <table className="ui padded table">
        <tbody>
        {
          rowsData.map((kv, index)=>(
            <tr key={index}>
               <td>kv.key</td>
               <td>kv.value</td>
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
      <div className='description'>
          {this.props.description}
      </div>
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
           {this.address}
        </div>
        <div className='map-content'>
          <a href={this.addressLink}>Google Mapで見る</a>

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
  const tags = ['niku', 'tabehodai', 'yoyo']
  const target = 'kekkonshiki'
  const targetName = 'kekkonshiki'
  const members = [
    {
      id: 'user-1',
      url: '/members/user-1',
      userAvatar: '/img/avatar.png',
      displayName: 'Name 1',
    },
    {
      id: 'user-2',
      url: '/members/user-2',
      userAvatar: '/img/avatar.png',
      displayName: 'Name 2',
    },
    {
      id: 'user-3',
      url: '/members/user-3',
      userAvatar: '/img/avatar.png',
      displayName: 'Name 3',
    }
  ]
  const address= '東京都世田谷区太子堂3-1-21ワイズコート402';
  const mapIframeLink = 'https://www.google.com/maps/embed/v1/place?q=Harrods,Brompton%20Rd,%20UK&zoom=17&key=AIzaSyCVQ347kx0YIDFZmK4oz2dHt0P-KX-75r4'

  const desc= 'スペインを中心に海外で9年間修行し、東京のガストロノミーの最高峰のひとつ「日本料理 龍吟」と世界的に有名なスペイン料理の「レストラン サンパウ」東京店のスーシェフを勤めた本多シェフが、2011年4月に麻布十番にオープンしたスペイン料理レストラン。'

  return {
    tags: tags,
    target: target,
    targetName: targetName,
    members: members,
    memberCount: 40,
    address: address,
    addressLink: 'http://',
    googleMapIframeLink: mapIframeLink,
    description: desc,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  removeMember: (memberId) => { console.log(memberId); }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventDetailBlocks)
