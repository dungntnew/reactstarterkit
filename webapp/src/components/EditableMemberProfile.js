import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

import $ from 'jquery';
import classNames from 'classnames';

import CoverImage from '../components/CoverImage'
import UserAvatar from '../components/UserAvatar'

$.fn.form = require('semantic-ui-form')
$.fn.dropdown = require('semantic-ui-dropdown')

import 'semantic-ui-form/form.min.css'
import 'semantic-ui-dropdown/dropdown.min.css'

import '../css/CoverImage.css';
import '../css/EditableMemberProfile.css';

class EditableMemberProfile extends Component {

  static propTypes = {
    data: PropTypes.shape({
      coverUrl: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      createdEventCount: PropTypes.number.isRequired,
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
      editing: false,
      coverFile: null,
      coverPreviewUrl: coverUrl,
      avatarFile: null,
      avatarPreviewUrl: avatarUrl,
      displayName: displayName,
    }
  }

  componentDidMount() {
  }

  handleCoverChange(e) {
     e.preventDefault();

     let reader = new FileReader()
     let file = e.target.files[0]

     reader.onloadend = ()=> {
        this.setState({
          coverPreviewUrl: reader.result,
          coverFile: file
        })
     }
     reader.readAsDataURL(file)
  }

  handleAvatarChange(e) {
     e.preventDefault();

     let reader = new FileReader()
     let file = e.target.files[0]

     reader.onloadend = ()=> {
        this.setState({
          avatarPreviewUrl: reader.result,
          avatarFile: file
        })
     }
     reader.readAsDataURL(file)
  }

  renderForm() {
    const {isSaving} = this.props
    const {coverPreviewUrl, avatarPreviewUrl, displayName} = this.state

    const classes = classNames({
      'cover-image': true,
    })

    const style = {
      backgroundImage: `url("${coverPreviewUrl}")`,
      // border: isSaving ? '2px solid red': '2px solid blue'
    }

    const btnTitle = isSaving ? '保存' : '保存中'
    const formClassNames = classNames({
      "ui form": true,
    })

    return (
      <div className='ui text container-customize edit-form'>
        <div className={classes} style={style}>

          {/*-- Preview --*/}


          {/*-- Form -- */}
          <div className="ui segment">
            <img src={avatarPreviewUrl}
               className='ui tiny circular image'
               alt='img-avatar'/>

            <div className={formClassNames}>
              <div className="field">
                <label>ニックネーム</label>
                <input type="text"
                       placeholder=""
                       value={displayName}
                       onChange={(e)=>{
                          e.preventDefault()
                          this.setState({displayName: e.target.value})
                       }}
                       />
              </div>

              <div className="field">
                 <label>アバター</label>
                 <input
                    type='file'
                    placeholder='アバターを選んで下さい'
                    onChange={(e) => {
                    this.handleAvatarChange(e)
                 }}/>
              </div>

              <div className="field">
                 <label>壁紙</label>
                 <input
                    type='file'
                    placeholder='壁紙を選んで下さい'
                    onChange={(e) => {
                    this.handleCoverChange(e)
                 }}/>
              </div>

              <div className='btn-group'>
                <div className="ui submit btn-orange button btn-wid50"
                     onClick={(e)=> {this.saveProfile(e)}}>
                     {btnTitle}
                </div>
                <div className="ui submit button btn-wid50"
                     onClick={(e)=> {this.cancelProfile(e)}}>
                     取消
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  saveProfile(e) {
    e.preventDefault()
    const {avatarFile, coverFile, displayName} = this.state

    console.log("update avatar: ", avatarFile)
    console.log("update cover: ", coverFile)
    console.log("change display name: ", displayName)

    this.setState({editing: false})

    this.props.onSubmit({
      avatarFile: avatarFile,
      coverFile: coverFile,
      displayName: displayName
    })
  }


  renderLink() {
    const links = [

      <Link to='/hosted'className='link-item'>主催テーブル<span className="count">2</span></Link>,
      <Link to='/review'className='link-item'>レビュー<span className="count">0</span></Link>,
      <Link to='/join'className='link-item'>参加予定テーブル<span className="count">1</span></Link>,
      <Link to='/join1'className='link-item'>参加予定テーブル<span className="count">10</span></Link>
      ]

    return links.map((link, index) => (
      <li className="nav-item" key={index}>{link}</li>

    ))

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
