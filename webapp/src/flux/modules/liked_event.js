import ApiClient from '../../helpers/client';

import {initLikedEvent as initialState} from './initialState';

// - Actions
export const LIKED_EVENTS_FETCH = 'LIKED_EVENTS_FETCH'
export const LIKED_EVENTS_RECEIVE = 'LIKED_EVENTS_RECEIVE'
export const LIKED_EVENTS_FETCH_FAIL = 'LIKED_EVENTS_FETCH_FAIL'

export const fetchLikedEvents = (filter, limit, from) => {
  return {
    type: LIKED_EVENTS_FETCH,
    payload: {
      filter: filter,
      limit: limit,
      from: from,
    }
  }
}

export const receiveLikedEvents = (filter, limit, from, total, current, events) => {
  return {
    type: LIKED_EVENTS_RECEIVE,
    payload: {
      filter: filter,
      limit: limit,
      from: from,
      total: total,
      current: current,
      events: events
    }
  }
}

export const fetchLikedEventsFailed = (filter, limit, from, error) => {
  return {
    type: LIKED_EVENTS_FETCH_FAIL,
    payload: {
      filter: filter,
      limit: limit,
      from: from,
      errorMessage: error.message
    },
    error: true
  }
}

// - Async Actions
function shouldFetchLikedEvents(globalState, filter) {
  const {likedEvent} = globalState

  if (likedEvent.isFetching) {
    return false
  }
  return true
}

export const fetchLikedEventsIfNeed = (filter, limit, from) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchLikedEvents(getState(), filter, limit, from)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchLikedEvents(filter, limit, from))

    // start call api-client
    return ApiClient.getJson('/events', {
      filter: filter,
      limit: limit,
      from: from,
    })

    // dispatch data received event
    .then(json=> {
      return dispatch(receiveLikedEvents(filter, limit, from,
        json.total, json.current, json.events))
    })

    // dispatch fetch failed event
    .catch(error => {
      dispatch(fetchLikedEventsFailed(filter, limit, from, error))
    })
  }
}

// - State

// - Reducers
const likedEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKED_EVENTS_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case LIKED_EVENTS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      events: action.payload.events,
      total: action.payload.total,
      current: action.payload.current,
    })
    case LIKED_EVENTS_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state
  }
}

export default likedEventReducer;
