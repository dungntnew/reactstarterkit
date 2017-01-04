import ApiClient from '../../helpers/client';


import {initSelectedEvent as initialState} from './initialState';

// - Actions
export const EVENT_DETAIL_FETCH = 'EVENT_DETAIL_FETCH'
export const EVENT_DETAIL_RECEIVE = 'EVENT_DETAIL_RECEIVE'
export const EVENT_DETAIL_FETCH_FAIL = 'EVENT_DETAIL_FETCH_FAIL'

export const fetchEventDetail = (eventId) => {
  return {
    type: EVENT_DETAIL_FETCH,
    payload: {
      eventId: eventId,
    }
  }
}

export const receiveEventDetail = (eventId, data) => {
  return {
    type: EVENT_DETAIL_RECEIVE,
    payload: {
      eventId: eventId,
      data: data
    }
  }
}

export const fetchEventDetailFailed = (eventId, error) => {
  return {
    type: EVENT_DETAIL_FETCH_FAIL,
    payload: {
      eventId: eventId,
      errorMessage: error.message
    },
    error: true
  }
}

// - Async Actions
function shouldFetchEventDetail(globalState, eventId) {
  // always fetch new event detail
  // no-cache
  return true
}

export const fetchEventDetailIfNeed = (eventId) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchEventDetail(getState(), eventId)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchEventDetail(eventId))

    // start call api-client
    return ApiClient.getJson(`/details/${eventId}`)

    // dispatch data received event
    .then(json=> {
      return dispatch(receiveEventDetail(eventId, json))
    })

    // dispatch fetch failed event
    .catch(error => {
      dispatch(fetchEventDetailFailed(eventId, error))
    })
  }
}

// - State

// - Reducers

const selectedEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_DETAIL_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case EVENT_DETAIL_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      data: action.payload.data
    })
    case EVENT_DETAIL_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state
  }
}

export default selectedEventReducer;
