import ApiClient from '../../helpers/client';

import {initRelativedEvent as initialState} from './initialState';

// - Actions
export const RELATIVED_EVENTS_FETCH = 'RELATIVED_EVENTS_FETCH'
export const RELATIVED_EVENTS_RECEIVE = 'RELATIVED_EVENTS_RECEIVE'
export const RELATIVED_EVENTS_FETCH_FAIL = 'RELATIVED_EVENTS_FETCH_FAIL'

export const fetchRelativedEvents = (eventId, limit, from) => {
  return {
    type: RELATIVED_EVENTS_FETCH,
    payload: {
      eventId: eventId,
      limit: limit,
      from: from,
    }
  }
}

export const receiveRelativedEvents = (eventId, limit, from, total, current, events) => {
  return {
    type: RELATIVED_EVENTS_RECEIVE,
    payload: {
      eventId: eventId,
      limit: limit,
      from: from,
      total: total,
      current: current,
      events: events
    }
  }
}

export const fetchRelativedEventsFailed = (eventId, limit, from, error) => {
  return {
    type: RELATIVED_EVENTS_FETCH_FAIL,
    payload: {
      eventId: eventId,
      limit: limit,
      from: from,
      errorMessage: error.message
    },
    error: true
  }
}

// - Async Actions
function shouldFetchRelativedEvents(globalState, filter) {
  const {relativedEvent} = globalState

  if (relativedEvent.isFetching) {
    return false
  }
  return true
}

export const fetchRelativedEventsIfNeed = (eventId, limit, from) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchRelativedEvents(getState(), eventId, limit, from)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchRelativedEvents(eventId, limit, from))

    // start call api-client
    return ApiClient.getJson('/events', {
      eventId: eventId,
      limit: limit,
      from: from,
    })

    // dispatch data received event
    .then(json=> {
      return dispatch(receiveRelativedEvents(eventId, limit, from,
        json.total, json.current, json.events))
    })

    // dispatch fetch failed event
    .catch(error => {
      dispatch(fetchRelativedEventsFailed(eventId, limit, from, error))
    })
  }
}

// - State

// - Reducers
const relativedEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELATIVED_EVENTS_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case RELATIVED_EVENTS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      events: action.payload.events,
      total: action.payload.total,
      current: action.payload.current,
    })
    case RELATIVED_EVENTS_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state
  }
}

export default relativedEventReducer;
