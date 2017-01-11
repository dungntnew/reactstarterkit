import ApiClient from '../../helpers/client';

import {initCreatedEvent as initialState} from './initialState';

// - Actions
export const CREATED_EVENTS_FETCH = 'CREATED_EVENTS_FETCH'
export const CREATED_EVENTS_RECEIVE = 'CREATED_EVENTS_RECEIVE'
export const CREATED_EVENTS_FETCH_FAIL = 'CREATED_EVENTS_FETCH_FAIL'

export const fetchCreatedEvents = (filter, limit, from) => {
  return {
    type: CREATED_EVENTS_FETCH,
    payload: {
      filter: filter,
      limit: limit,
      from: from,
    }
  }
}

export const receiveCreatedEvents = (filter, limit, from, total, current, events) => {
  return {
    type: CREATED_EVENTS_RECEIVE,
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

export const fetchCreatedEventsFailed = (filter, limit, from, error) => {
  return {
    type: CREATED_EVENTS_FETCH_FAIL,
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
function shouldFetchCreatedEvents(globalState, filter) {
  const {createdEvent} = globalState

  if (createdEvent.isFetching) {
    return false
  }
  return true
}

export const fetchCreatedEventsIfNeed = (filter, limit, from) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchCreatedEvents(getState(), filter, limit, from)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchCreatedEvents(filter, limit, from))

    // start call api-client
    return ApiClient.getJson('/events', {
      filter: filter,
      limit: limit,
      from: from,
    })

    // dispatch data received event
    .then(json=> {
      return dispatch(receiveCreatedEvents(filter, limit, from,
        json.total, json.current, json.events))
    })

    // dispatch fetch failed event
    .catch(error => {
      dispatch(fetchCreatedEventsFailed(filter, limit, from, error))
    })
  }
}

// - State

// - Reducers
const createdEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATED_EVENTS_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case CREATED_EVENTS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      events: action.payload.events,
      total: action.payload.total,
      current: action.payload.current,
    })
    case CREATED_EVENTS_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state
  }
}

export default createdEventReducer;
