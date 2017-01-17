import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';

import '../css/CreditCardSettingMyPage.css';

import CreditCard from '../components/credit-card/CreditCard'

//import {fetchCreditCard, updateCreditCard} from '../flux/modules/bankAccount'


class CreditCardSettingMyPage extends Component {

    componentDidMount(){
      this.props.fetch()
    }

    renderPageTitle() {
      return (
        <h3 className='bank-account-title'>
           お支払い方法の指定
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

        content = <CreditCard
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

  return {
    isFetching: false,
    isSaving: false,
    errorMessage: null,
    userId: userId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  //const {dispatch} = dispatchProps
  //const {userId} = stateProps

  return Object.assign({}, stateProps,
    Object.assign({}, ownProps, {
      fetch: () => {
        //dispatch(fetchBankAccount(userId))
      },
      update: (data) => {
        //dispatch(updateBankAccount(userId, data))
      }
  }))
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(CreditCardSettingMyPage)
