import ApiClient from '../../helpers/client';

import {initCredit as initialState} from './initialState';

// - Actions
export const CREDITS_FETCH = 'CREDITS_FETCH'
export const CREDITS_RECEIVE = 'CREDITS_RECEIVE'
export const CREDITS_FETCH_FAIL = 'CREDITS_FETCH_FAIL'

export const CREDITS_ADD = 'CREDITS_ADD'
export const CREDITS_ADD_DONE = 'CREDITS_ADD_DONE'
export const CREDITS_ADD_FAIL = 'CREDITS_ADD_FAIL'

export const fetchCredits = (userId) => {
  return {
    type: CREDITS_FETCH,
    payload: {
      userId: userId
    }
  }
}

export const receiveCredits = (userId, credits) => {
  return {
    type: CREDITS_RECEIVE,
    payload: {
      userId: userId,
      credits: credits
    }
  }
}

export const fetchCreditsFailed = (userId, error) => {
  return {
    type: CREDITS_FETCH_FAIL,
    payload: {
      userId: userId,
      errorMessage: error.message
    },
    error: true
  }
}

export const addCredit = (userId, data) => {
  return {
    type: CREDITS_ADD,
    payload: {
      userId: userId,
      data: data
    }
  }
}


export const addCreditDone = (userId, data) => {
  return {
    type: CREDITS_ADD_DONE,
    payload: {
      userId: userId,
      data: data
    }
  }
}

// - Async Actions
function shouldFetchCredits(globalState, userId) {
  return true
}

export const fetchCreditsIfNeed = (userId) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchCredits(getState(), userId)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchCredits(userId))

    // start call api-client
    return ApiClient.getJson(`/credits`, {
      userId: userId
    })

    // dispatch data received credits
    .then(json=> {
      return dispatch(receiveCredits(userId, json.credits))
    })

    // dispatch fetch failed credits
    .catch(error => {
      dispatch(fetchCreditsFailed(userId, error))
    })
  }
}

export const asyncAddCredit = (userId, data, next) => {
  return (dispatch, getState) => {
    dispatch(addCredit(userId, data))
    return ApiClient.postJson(`/credits`, {
      userId: userId,
      data: data
    })
    .then(json=> {
      dispatch(addCreditDone(userId, data))
      if (next) next(json)
    })
    .catch(error => {
      dispatch(fetchCreditsFailed(userId, error))
    })
  }
}
// - State

// - Reducers
const creditReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDITS_ADD:
    return Object.assign({}, state, {
      newCredit: action.payload.data,
      // TODO: remove me!
      credits: {
        "new-credit": action.payload.data
      },
      saving: true,
      saved: false,
    })
    case CREDITS_ADD_DONE:
    return Object.assign({}, state, {
      saving: false,
      saved: true,
    })
    case CREDITS_ADD_FAIL:
    return Object.assign({}, state, {
      errorMessage: action.payload.errorMessage,
      saving: false,
      saved: false,
    })
    case CREDITS_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case CREDITS_RECEIVE:
    // TODO: remove me!
    const credits = action.payload.credits || state.credits
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      credits: credits
    })
    case CREDITS_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state

  }
}

export default creditReducer;
