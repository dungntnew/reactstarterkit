import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

import $ from 'jquery';
import classNames from 'classnames';

import CoverImage from '../components/CoverImage'
import UserAvatar from '../components/UserAvatar'

import AvatarEditor from 'react-avatar-editor'

$.fn.form = require('semantic-ui-form')
$.fn.dropdown = require('semantic-ui-dropdown')
$.fn.transition = require('semantic-ui-transition')
$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.modal = require('semantic-ui-modal')

import 'semantic-ui-form/form.min.css'
import 'semantic-ui-dropdown/dropdown.min.css'
import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'

import '../css/CoverImage.css';
import '../css/EditableMemberProfile.css';

import InputRange from 'react-input-range';
import 'react-input-range/dist/react-input-range.css';

import {isSupport, canvasToDataUrl, localFileToDataUrl} from '../helpers/canvas'


class EditableMemberProfile extends Component {

  static propTypes = {
    data: PropTypes.shape({
      coverUrl: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      createdEventCount: PropTypes.number.isRequired,
      joinedEventCount: PropTypes.number.isRequired,
      reviewedEventCount: PropTypes.number.isRequired,
      isSelf: PropTypes.bool.isRequired
    }).isRequired,
    isSaving: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const {data} = props
    const {avatarUrl, coverUrl, displayName} = data


    this.state = {
      editing: true,

      selectedAvatarDataUrl: avatarUrl,
      selectedCoverDataUrl: coverUrl,

      avatarFileLoading: false,
      loadedAvatarFileDataUrl: null,
      selectedAvatarFile: null,

      coverFileLoading: false,
      loadedCoverFileDataUrl: null,
      selectedCoverFile: null,

      avatarScalePercent: 150,
      coverScalePercent: 120,
      editingCover: false,
      displayName: displayName,
    }
  }

  componentDidMount() {
  }


  openAvatarFileDialog(e) {
    const {avatarFileUpload} = this.refs
    avatarFileUpload.click()
  }

  handleAvatarSelectedLocalFile(e) {
     let file = e.target.files[0]
     const {avatarFileUpload} = this.refs

     this.setState({
      selectedAvatarFile: file,
      avatarFileLoading: true,
     })

     localFileToDataUrl(file, (url)=>{
        setTimeout(()=>{
           avatarFileUpload.value = ""
           this.setState({
             avatarFileLoading: false,
             loadedAvatarFileDataUrl: url
           })
        }, 1000)
     })
     $(this.refs.avatarEditorModal).modal('show')
  }

  openCoverFileDialog(e) {
    const {coverFileUpload} = this.refs
    coverFileUpload.click()
  }

  handleCoverSelectedLocalFile(e) {
     let file = e.target.files[0]
     const {coverFileUpload} = this.refs

     this.setState({
      selectedCoverFile: file,
      coverFileLoading: true,
      editingCover: true,
     })

     localFileToDataUrl(file, (url)=>{
        setTimeout(()=>{
           this.setState({
             coverFileLoading: false,
             loadedCoverFileDataUrl: url
           })
        }, 1000)
     })
  }

  saveUserAvatar () {
    const canvas = this.avatarEditor.getImage()
    const canvasScaled = this.avatarEditor.getImageScaledToCanvas()
    const url = canvasToDataUrl(canvasScaled)
    this.setState({
      selectedAvatarDataUrl: url,
    })
    console.log("okkkk avar")
    //this.props.onSubmit(url)
  }

  saveCoverImage () {
    const canvas = this.coverEditor.getImage()
    const canvasScaled = this.coverEditor.getImageScaledToCanvas()
    const url = canvasToDataUrl(canvasScaled)
    this.setState({
      selectedCoverDataUrl: url,
      editingCover: false,
    })
    console.log("okkkk cover")
    //this.props.onSubmit(url)
  }

  renderAvatarEditor(file) {

    const {avatarFileLoading, loadedAvatarFileDataUrl} = this.state
    const avatarEditorStyle = {
      width: 320,
      height: 320,
    }

    const content = avatarFileLoading ? (
      <div className="ui segment" style={{height: 320}}>
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">Loading</div>
        </div>
      </div>
    ):
    (
        <div className='content' style={{textAlign: 'center'}}>
          <AvatarEditor
                  style={avatarEditorStyle}
                  image={loadedAvatarFileDataUrl}
                  width={400}
                  height={400}
                  border={50}
                  color={[255, 255, 255, 0.6]}
                  scale={(this.state.avatarScalePercent * 1.0)/100}
                  ref={(editor)=>{this.avatarEditor=editor}}
                />

          <div className='rangeSlider'>
          <InputRange
              maxValue={250}
              minValue={25}
              value={this.state.avatarScalePercent}
              onChange={(c, v)=>{
                this.setState({avatarScalePercent: v})
              }}
          />
          </div>
          </div>
    )



    const saveBtnCls = classNames({
      'ui approve orange button': true,
      'disabled': avatarFileLoading
    })

    return (
      <div className='ui modal' ref='avatarEditorModal'>
        <div className="header">
          Position and resize your Photo
        </div>

        {content}

        <div className="actions">
            <div className="ui cancel button">Cancel</div>
            <div className={saveBtnCls}
              onClick={(e)=>{this.saveUserAvatar()}}>Apply</div>
        </div>
      </div>
    )
  }

  renderCoverEditor(file) {


    const {coverFileLoading, loadedCoverFileDataUrl} = this.state
    const avatarEditorStyle = {
      width: 320,
      height: 320,
    }
    const saveBtnCls = classNames({
      'ui approve orange button': true,
      'disabled': coverFileLoading
    })

    const content = coverFileLoading ? (
      <div className="ui segment" style={{height: 320}}>
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">Loading</div>
        </div>
      </div>
    ):
    (
        <div className='content'>
          <AvatarEditor
                  style={coverEditorStyle}
                  image={loadedCoverFileDataUrl}
                  width={1500}
                  height={500}
                  border={1}
                  color={[255, 0, 0, 0.9]}
                  scale={(this.state.coverScalePercent * 1.0)/100}
                  ref={(editor)=>{this.coverEditor=editor}}
                />

          <InputRange
              maxValue={250}
              minValue={25}
              value={this.state.coverScalePercent}
              onChange={(c, v)=>{
                this.setState({coverScalePercent: v})
              }}
          />
          </div>
    )

    const coverEditorStyle = {
      width: '100%',
      height: 'auto',
    }

    return (
      <div className='cover-image-editing-wrapper'>
        {content}

        <div className="actions">
            <div className="ui cancel button" onClick={
              (e) => {this.setState({editingCover: false})}
            }>Cancel</div>
            <div className={saveBtnCls}
              onClick={(e)=>{this.saveCoverImage()}}>Apply</div>
        </div>

      </div>
    )
  }

  renderAvatar() {

    const {selectedAvatarDataUrl} = this.state
    const avatarUrl = selectedAvatarDataUrl
                    || this.props.avatarUrl
                    || this.props.defaultAvatarUrl

    return (
        <div className="user-avatar-selecting" onClick={(e)=>{
          this.openAvatarFileDialog()
        }}>
          <a className="overlay">Change</a>
          <a className="change-link">Change</a>
          <img className='ui circular image' src={avatarUrl}/>
          <input
            ref="avatarFileUpload"
            type="file"
            style={{"display" : "none"}}
            onChange={(e)=>{this.handleAvatarSelectedLocalFile(e)}}/>
        </div>
    )
  }

  renderFormFields() {
    const {displayName} = this.state
    return (
      <div className='center-fields'>
       <input className="displayNameField"
                 type="text"
                 placeholder=""
                 value={displayName}
                 onChange={(e)=>{
                    e.preventDefault()
                    this.setState({displayName: e.target.value})
                 }}
                 />
      </div>
    )
  }

  renderCoverImage() {
    const {selectedCoverDataUrl} = this.state
    const coverUrl = selectedCoverDataUrl
                    || this.props.coverUrl
                    || this.props.defaultCoverUrl
    return (
      <div className='cover-image-wrapper'>
        <img className='ui image cover-image' src={coverUrl} />
        <input
          ref="coverFileUpload"
          type="file"
          style={{"display" : "none"}}
          onChange={(e)=>{
            this.handleCoverSelectedLocalFile(e)
          }}/>
      </div>
    )
  }

  renderChangeCoverButton() {
    return (
      <button className='ui orange button change-cover-btn'
              onClick={(e)=>{this.openCoverFileDialog(e)}}
      >Change Cover </button>
    )
  }

  renderActionButtons() {
    return (
      <div className="ui container">
        <div className="ui basic segment">
          <div className="ui secondary menu">
              <div className="right menu">
                <div className="ui button" onClick={
                  (e)=>{this.discard(e)}
                }>Cancel</div>
                <div className="ui primary button" onClick={
                  (e)=> {this.saveProfile(e)}
                }>Save Profile</div>
              </div>
          </div>
        </div>
      </div>
    )
  }

  renderForm() {
    const editContent = this.state.editingCover ?

    this.renderCoverEditor()
    :
    (
          <div className='form-wrapper'>
            {this.renderCoverImage()}
            <div className='form-top-layer'>
              <div className='ui text container-customize'>
                  {this.renderAvatar()}
                  {this.renderFormFields()}
              </div>
              {this.renderChangeCoverButton()}
            </div>
          </div>
    )

    return (
      <div className='edit-form'>
        {editContent}
        <div className='ui deliver'/>
        {this.renderAvatarEditor()}

        {!this.state.editingCover
          &&
          this.renderActionButtons()
        }
      </div>
    )
  }

  discard(e) {
    e.preventDefault()
    this.setState({editing: false})
  }

  saveProfile(e) {
    e.preventDefault()

    const {displayName} = this.state
    console.log("change display name: ", displayName)
    this.setState({editing: false})
  }


  renderLink() {
    const {data} = this.props
    const {url, createdEventCount, joinedEventCount, reviewedEventCount} = data

    const links = [
      <Link to={`${url}/created`} activeClassName='active'
                               className='link-item'>主催テーブル
                                 <span className="count">{createdEventCount}</span></Link>,
      <Link to={`${url}/reviewed`} activeClassName='active'
                         className='link-item'>レビュー
                               <span className="count">{reviewedEventCount}</span></Link>,
      <Link to={`${url}/joined`} activeClassName='active'
                       className='link-item'>参加予定テーブル
                               <span className="count">{joinedEventCount}</span></Link>,
      ]

    return links.map((link, index) => (
      <li className="nav-item" key={index}>{link}</li>

    ))
  }

  renderEditButton() {
    return (
       <button className='ui orange button' onClick={(e)=>{
        this.setState({editing: true})
       }}>Edit Profile</button>
    )
  }

  renderContent() {
    const {data} = this.props
    const {isSelf} = data

    return (
      <CoverImage backgroundUrl={data.coverUrl}>
        <UserAvatar {...data} editable={isSelf} onEdit={()=>{
          this.setState({editing: true})
        }}/>
        <ul className='menu-sub'>
          {this.renderLink()}
          {this.renderEditButton()}
        </ul>
      </CoverImage>
    )
  }

  render() {
    const {editing} = this.state
    const content = editing ? this.renderForm(): this.renderContent()

    return (
      <div className='editable-member-profile'>
        {content}
      </div>
    )
  }
}

export default EditableMemberProfile;
