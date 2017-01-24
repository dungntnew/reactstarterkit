import ApiClient from '../../helpers/client';

import {initContact as initialState} from './initialState'


export const CONTACT_SEND = 'CONTACT_SEND'
export const CONTACT_SEND_FINISH = 'CONTACT_SEND_FINISH'
export const CONTACT_SEND_FAIL = 'CONTACT_SEND_FAIL'

export const sendContact = (userId, data) => {
  return {
	type: CONTACT_SEND,
	payload: {
	  userId: userId,
	  data
	}
  }
}

export const contactSent = (userId, data) => {
  return {
	type: CONTACT_SEND_FINISH,
	payload: {
	  userId: userId,
	  data: data
	}
  }
}

export const contactSendFailed = (userId, error) => {
  return {
	type: CONTACT_SEND_FAIL,
	payload: {
	  userId: userId,
	  errorMessage: error.message
	},
	error: true
  }
}

export const contact = (userId, data)=> {
  return (dispatch, getState) => {
	dispatch(sendContact(userId, data))
	return ApiClient.postJson(`/contact`, {
	  userId: userId,
	  data: data
	})
	.then(json => {
	  return dispatch(contactSent(userId, json.data))
	})
	.catch(error => {
	  return dispatch(contactSendFailed(userId, error))
	})
  }
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
	 case CONTACT_SEND:
	   return Object.assign({}, state, {
		 isSending: true,
		 data: Object.assign({}, state.data, action.payload.data)
	   })
	 case CONTACT_SEND_FINISH:
	   return Object.assign({}, state, {
		 isSending: false,
		 data: action.payload.data
	   })
	 case CONTACT_SEND_FAIL: {
	   return Object.assign({}, state, {
		 isSending: false,
		 errorMessage: action.payload.errorMessage
	   })
	 }
	default:
	  return state
  }
}

export default contactReducer;
