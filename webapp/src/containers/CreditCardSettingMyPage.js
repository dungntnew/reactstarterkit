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

    render() {
      const data = {}
      const isSaving = false
      const userId = "xx"
      const update = () => {}

      return (
        <div>
          <div className='creditcard-setting-mypage'>
            <h3 className='bank-account-title'>
               お支払い方法の指定
            </h3>
            <CreditCard
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

  return Object.assign({}, stateProps,
    Object.assign({}, ownProps, {
      fetch: () => {
      },
      update: (data) => {
      }
  }))
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(CreditCardSettingMyPage)
