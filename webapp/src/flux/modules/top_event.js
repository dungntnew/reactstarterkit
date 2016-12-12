import ApiClient from '../../helpers/client';

// - Actions
export const TOPN_EVENTS_FETCH = 'TOPN_EVENTS_FETCH'
export const TOPN_EVENTS_RECEIVE = 'TOPN_EVENTS_RECEIVE'
export const TOPN_EVENTS_FETCH_FAIL = 'TOPN_EVENTS_FETCH_FAIL'

export const fetchTopNEvents = (orderBy, limit) => {
  return {
    type: TOPN_EVENTS_FETCH,
    payload: {
      orderBy: orderBy,
      limit: limit
    }
  }
}

export const receiveTopNEvents = (orderBy, limit, events) => {
  return {
    type: TOPN_EVENTS_RECEIVE,
    payload: {
      orderBy: orderBy,
      limit: limit,
      events: events
    }
  }
}

export const fetchTopNEventsFailed = (orderBy, limit, error) => {
  return {
    type: TOPN_EVENTS_FETCH_FAIL,
    payload: {
      orderBy: orderBy,
      limit: limit,
      errorMessage: error.message
    },
    error: true
  }
}

// - Async Actions
function shouldFetchTopEvents(globalState, orderBy) {
  const {topEvent} = globalState
  const block = topEvent[orderBy]

  if (block.isFetching) {
    return false
  }
  return true
}

export const fetchTopNEventsIfNeed = (orderBy, limit) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchTopEvents(getState(), orderBy)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchTopNEvents(orderBy, limit))

    // start call api-client
    return ApiClient.getJson('/events', {
      orderBy: orderBy,
      limit: limit
    })

    // dispatch data received event
    .then(json=> {
      return dispatch(receiveTopNEvents(orderBy,limit,json.events))
    })

    // dispatch fetch failed event
    .catch(error => {
      dispatch(fetchTopNEventsFailed(orderBy,limit,error))
    })
  }
}

// - State
const initialState = {
  latest: {isFetching: false, errorMessage: null, events: {}},
  trend: {isFetching: false, errorMessage: null, events: {}},
  special: {isFetching: false, errorMessage: null, events: {}}
}

// - Reducers
const events = (state = {isFetching: false, errorMessage: null, events: {}}, action) => {
  switch (action.type) {
    case TOPN_EVENTS_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case TOPN_EVENTS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      events: action.payload.events
    })
    case TOPN_EVENTS_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state

  }
}

const topEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOPN_EVENTS_FETCH:
    case TOPN_EVENTS_RECEIVE:
    case TOPN_EVENTS_FETCH_FAIL:

    return Object.assign({}, state, {
      [action.payload.orderBy]: events(state[action.payload.orderBy], action)
    })
    default:
    return state
  }
}

export default topEventReducer;
