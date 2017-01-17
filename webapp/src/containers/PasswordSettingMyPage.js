import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';

import '../css/PasswordSettingMyPage.css';

import ChangePasswordForm from '../components/auth-forms/ChangePasswordForm';

import {updatePassword} from '../flux/modules/auth';

class PasswordSettingMyPage extends Component {

    componentDidMount(){
    }

    renderPageTitle() {
      return (
        <h3 className='setting-password-title'>
           パスワード変更
        </h3>
      )
    }

    render() {
      const {data, userId, isSaving, update} = this.props

      let content = <ChangePasswordForm
                     data={data}
                     isSaving={isSaving}
                     userId={userId}
                     onSubmit={update} />

      return (
        <div>
          <div className='password-setting-mypage'>
            {this.renderPageTitle()}
            {content}
          </div>
        </div>
      )
    }
}


const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  const {user} = auth
  const userId = user.id

  return {userId}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps
  const {userId} = stateProps

  return Object.assign({}, stateProps,
    Object.assign({}, ownProps, {
      update: (data) => {
        dispatch(updatePassword(userId, data))
      }
  }))
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(PasswordSettingMyPage)
