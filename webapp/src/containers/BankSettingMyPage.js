import _ from 'lodash';
import React, {Component, PropTypes} from 'react'

import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router';

import '../css/BankSettingMyPage.css';

import {fetchBankAccount, updateBankAccount} from '../flux/modules/bankAccount'

class BankSettingMyPage extends Component {
    constructor(props) {
      super(props)
    }

    static propTypes = {
    }

    componentDidMount(){
      this.props.fetch()
    }

    renderPageTitle() {
      return (
        <div className='bank-account-title'>
           振込先口座の指定
        </div>
      )
    }

    renderBankAccount() {

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
        content = this.renderBankAccount()
      }

      return (
        <div className='created-event-list-mypage'>
            {this.renderPageTitle()}
            {content}
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
