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

    renderPageTitle() {
      return (
        <h3 className='bank-account-title'>
           振込先口座の指定
        </h3>
      )
    }

    render() {
      const {isFetching, errorMessage} = this.props
      let content

      if (isFetching) {
        content = (
          <div> Loading... </div>
        )
      }
      else if (!isFetching && errorMessage) {
        content = (
          <div> System Error: {errorMessage} </div>
        )
      }
      else {
        const {data, userId, isSaving, update} = this.props

        content = <BankAccountForm
                       data={data}
                       isSaving={isSaving}
                       userId={userId}
                       onSubmit={update} />
      }

      return (
        <div>
          <div className='bank-setting-mypage'>
            {this.renderPageTitle()}
            {content}
          </div>
          <div>
            <button onClick={
                ()=> {this.props.fetch()}}>
                refresh
            </button>
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
