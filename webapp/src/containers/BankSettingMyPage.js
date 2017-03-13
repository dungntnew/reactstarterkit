import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';

import '../css/BankSettingMyPage.css';

import {fetchBankAccount, updateBankAccount} from '../flux/modules/bankAccount'

import BankAccountForm from '../components/bank-forms/BankAccountForm';



class BankSettingMyPage extends Component {

    componentDidMount(){
      this.props.fetch()
    }

    render() {
      const {data, userId, isSaving, update} = this.props
      if (!data) return null;

      return (
        <div>
          <div className='bank-setting-mypage'>
            <h3 className='bank-account-title'>
           　　　　振込先口座の指定
       　　　 </h3>
            <BankAccountForm
                       data={data}
                       isSaving={isSaving}
                       userId={userId}
                       onSubmit={update} />
          </div>
        </div>
      )
    }
}


const mapStateToProps = (state, ownProps) => {
  const {auth} = state
  const {user} = auth

  const userId = user.id

  const {bankAccount} = state
  const {isFetching, isSaving, errorMessage, data} = bankAccount

  if (isFetching) {
    return {
      isFetching: true,
    }
  }
  else {
    return {
      isFetching: false,
      isSaving: isSaving,
      errorMessage: errorMessage,
      userId: userId,
      data: data,
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps
  const {userId} = stateProps

  return Object.assign({}, stateProps,
    Object.assign({}, ownProps, {
      fetch: () => {
        dispatch(fetchBankAccount(userId))
      },
      update: (data) => {
        dispatch(updateBankAccount(userId, data))
      }
  }))
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(BankSettingMyPage)
