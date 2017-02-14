import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';

import '../css/ContactMyPage.css';

import {contact} from '../flux/modules/contact'

import ContactForm from '../components/contact-forms/ContactForm';


class ContactMyPage extends Component {

    renderPageTitle() {
      return (
        <h3 className='contact-title'>
           お問い合わせ
        </h3>
      )
    }

    render() {
      const {data, userId, isSending, send} = this.props

      let content = <ContactForm
                     data={data}
                     isSending={isSending}
                     userId={userId}
                     onSubmit={send} />

      return (
        <div>
          <div className='contact-mypage'>
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

  const {contact} = state
  console.log("contact: ", contact)

  const {isSending, errorMessage, data} = contact

  return {
      isSending: isSending,
      errorMessage: errorMessage,
      userId: userId,
      data: data,
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
      send: (data) => {
        dispatch(contact(userId, data))
      }
  }))
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(ContactMyPage)
