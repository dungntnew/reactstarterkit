import ApiClient from '../../helpers/client';


import {initSelectedUser as initialState} from './initialState';

// - Actions
export const USER_DETAIL_FETCH = 'USER_DETAIL_FETCH'
export const USER_DETAIL_RECEIVE = 'USER_DETAIL_RECEIVE'
export const USER_DETAIL_FETCH_FAIL = 'USER_DETAIL_FETCH_FAIL'


export const fetchUserDetail = (userId) => {
  return {
    type: USER_DETAIL_FETCH,
    payload: {
      userId: userId,
    }
  }
}

export const receiveUserDetail = (userId, data) => {
  return {
    type: USER_DETAIL_RECEIVE,
    payload: {
      userId: userId,
      data: data
    }
  }
}

export const fetchUserDetailFailed = (userId, error) => {
  return {
    type: USER_DETAIL_FETCH_FAIL,
    payload: {
      userId: userId,
      errorMessage: error.message
    },
    error: true
  }
}

// - Async Actions
function shouldFetchUserDetail(globalState, userId) {
  // always fetch new user detail
  // no-cache
  return true
}

export const fetchUserDetailIfNeed = (userId) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchUserDetail(getState(), userId)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchUserDetail(userId))

    // start call api-client
    return ApiClient.getJson(`/userdetails/${userId}`)

    // dispatch data received user
    .then(json=> {
      return dispatch(receiveUserDetail(userId, json))
    })

    // dispatch fetch failed user
    .catch(error => {
      dispatch(fetchUserDetailFailed(userId, error))
    })
  }
}

// - State

// - Reducers

const selectedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch actions
    case USER_DETAIL_FETCH:
    return Object.assign({}, state, {
        isFetching: true
    })
    case USER_DETAIL_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      data: action.payload.data
    })
    case USER_DETAIL_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state
  }
}

export default selectedUserReducer;
