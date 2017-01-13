import ApiClient from '../../helpers/client';

import {initBankAccount as initialState} from './initialState'

export const BANK_ACCOUNT_REQUEST = 'BANK_ACCOUNT_REQUEST'
export const BANK_ACCOUNT_RECEIVE = 'BANK_ACCOUNT_RECEIVE'
export const BANK_ACCOUNT_REQUEST_FAIL = 'BANK_ACCOUNT_REQUEST_FAIL'

export const requestAccout = (userId) => {
  return {
    type: BANK_ACCOUNT_REQUEST,
    payload: {
      userId: userId
    }
  }
}

export const accountReceived = (userId, data) => {
  return {
    type: BANK_ACCOUNT_RECEIVE,
    payload: {
      userId: userId,
      data: data
    }
  }
}

export const accountRequestFailed = (userId, error) => {
  return {
    type: BANK_ACCOUNT_REQUEST_FAIL,
    payload: {
      userId: userId,
      errorMessage: error.message
    },
    error: true
  }
}


export const BANK_ACCOUNT_UPDATE = 'BANK_ACCOUNT_UPDATE'
export const BANK_ACCOUNT_UPDATE_FINISH = 'BANK_ACCOUNT_UPDATE_FINISH'
export const BANK_ACCOUNT_UPDATE_FAIL = 'BANK_ACCOUNT_UPDATE_FAIL'

export const updateAccout = (userId, data) => {
  return {
    type: BANK_ACCOUNT_UPDATE,
    payload: {
      userId: userId,
      data
    }
  }
}

export const accountUpdated = (userId, data) => {
  return {
    type: BANK_ACCOUNT_UPDATE_FINISH,
    payload: {
      userId: userId,
      data: data
    }
  }
}

export const accountUpdateFailed = (userId, error) => {
  return {
    type: BANK_ACCOUNT_UPDATE_FAIL,
    payload: {
      userId: userId,
      errorMessage: error.message
    },
    error: true
  }
}

export const fetchBankAccount = (userId)=> {
  return (dispatch, getState) => {
    dispatch(requestAccout(userId))
    return ApiClient.getJson(`/bank-account`, {
      userId: userId
    })
    .then(json => {
      return dispatch(accountReceived(userId, json.data))
    })
    .catch(error => {
      return dispatch(accountRequestFailed(userId, error))
    })
  }
}

export const updateBankAccount = (userId, data)=> {
  return (dispatch, getState) => {
    dispatch(updateAccout(userId, data))
    return ApiClient.postJson(`/bank-account`, {
      userId: userId,
      data: data
    })
    .then(json => {
      return dispatch(accountUpdated(userId, json.data))
    })
    .catch(error => {
      return dispatch(accountUpdateFailed(userId, error))
    })
  }
}

const bankAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANK_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case BANK_ACCOUNT_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        isSaving: false,
        data: action.payload.data
      })
    case BANK_ACCOUNT_REQUEST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        isSaving: false,
        errorMessage: action.payload.errorMessage
      })
     case BANK_ACCOUNT_UPDATE:
       return Object.assign({}, state, {
         isFetching: false,
         isSaving: true,
       })
     case BANK_ACCOUNT_UPDATE_FINISH:
       return Object.assign({}, state, {
         isFetching: false,
         isSaving: false,
         data: action.payload.data
       })
     case BANK_ACCOUNT_UPDATE_FAIL: {
       return Object.assign({}, state, {
         isFetching: false,
         isSaving: false,
         errorMessage: action.payload.errorMessage
       })
     }
    default:
      return state
  }
}

export default bankAccountReducer;
