import ApiClient from '../../helpers/client';


import {initSelectedEvent as initialState} from './initialState';

// - Actions
export const EVENT_DETAIL_FETCH = 'EVENT_DETAIL_FETCH'
export const EVENT_DETAIL_RECEIVE = 'EVENT_DETAIL_RECEIVE'
export const EVENT_DETAIL_FETCH_FAIL = 'EVENT_DETAIL_FETCH_FAIL'

export const EVENT_JOIN_REQUEST = 'EVENT_JOIN_REQUEST'
export const EVENT_JOIN_FINISH = 'EVENT_JOIN_FINISH'
export const EVENT_JOIN_FAIL = 'EVENT_JOIN_FAIL'

export const joinEvent = (eventId, userId) => {
  return {
    type: EVENT_JOIN_REQUEST,
    payload: {
      eventId: eventId,
      userId: userId
    }
  }
}

export const joinedEvent = (eventId, userId, data) => {
  return {
    type: EVENT_JOIN_FINISH,
    payload: {
      eventId: eventId,
      userId: userId,
      data: data
    }
  }
}

export const joinEventFailed = (eventId, userId, error) => {
  return {
    type: EVENT_DETAIL_FETCH_FAIL,
    payload: {
      eventId: eventId,
      userId: userId,
      errorMessage: error.message
    },
    error: true
  }
}

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

export const joinToEvent = (eventId, userId) => {
  return (dispatch, getState) => {
    // dispatch start join
    dispatch(joinEvent(eventId, userId))

    // start all api-client
    return ApiClient.postJson(`/join/${eventId}`, {userId: userId})

    // dispatch data received event
    .then(json=> {
      return dispatch(joinedEvent(eventId, userId, json))
    })

    // dispatch join failed
    .catch(error => {
      dispatch(joinEventFailed(eventId, userId, error))
    })
  }
}

// - State

// - Reducers

const selectedEventReducer = (state = initialState, action) => {
  switch (action.type) {
    // join actions
    case EVENT_JOIN_REQUEST:
    return Object.assign({}, state, {
      isJoining: true
    })
    case EVENT_JOIN_FINISH:
    return Object.assign({}, state, {
      isJoining: false,
      errorMessage: '',
      data: action.payload.data
    })
    case EVENT_JOIN_FAIL:
    return Object.assign({}, state, {
      isJoining: false,
      errorMessage: action.payload.errorMessage
    })

    // fetch actions
    case EVENT_DETAIL_FETCH:
    return Object.assign({}, state, {
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
