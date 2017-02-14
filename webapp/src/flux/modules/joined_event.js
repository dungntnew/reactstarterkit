import ApiClient from '../../helpers/client';

import {initJoinedEvent as initialState} from './initialState';

// - Actions
export const JOINED_EVENTS_FETCH = 'JOINED_EVENTS_FETCH'
export const JOINED_EVENTS_RECEIVE = 'JOINED_EVENTS_RECEIVE'
export const JOINED_EVENTS_FETCH_FAIL = 'JOINED_EVENTS_FETCH_FAIL'

export const fetchJoinedEvents = (filter, limit, from) => {
  return {
    type: JOINED_EVENTS_FETCH,
    payload: {
      filter: filter,
      limit: limit,
      from: from,
    }
  }
}

export const receiveJoinedEvents = (filter, limit, from, total, current, events) => {
  return {
    type: JOINED_EVENTS_RECEIVE,
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

export const fetchJoinedEventsFailed = (filter, limit, from, error) => {
  return {
    type: JOINED_EVENTS_FETCH_FAIL,
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
function shouldFetchJoinedEvents(globalState, filter) {
  const {joinedEvent} = globalState

  if (joinedEvent.isFetching) {
    return false
  }
  return true
}

export const fetchJoinedEventsIfNeed = (filter, limit, from) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchJoinedEvents(getState(), filter, limit, from)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchJoinedEvents(filter, limit, from))

    // start call api-client
    return ApiClient.getJson('/events', {
      filter: filter,
      limit: limit,
      from: from,
    })

    // dispatch data received event
    .then(json=> {
      return dispatch(receiveJoinedEvents(filter, limit, from,
        json.total, json.current, json.events))
    })

    // dispatch fetch failed event
    .catch(error => {
      dispatch(fetchJoinedEventsFailed(filter, limit, from, error))
    })
  }
}

// - State

// - Reducers
const joinedEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOINED_EVENTS_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case JOINED_EVENTS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      events: action.payload.events,
      total: action.payload.total,
      current: action.payload.current,
    })
    case JOINED_EVENTS_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state
  }
}

export default joinedEventReducer;
