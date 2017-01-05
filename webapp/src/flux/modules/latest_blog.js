import ApiClient from '../../helpers/client';

import {initLatestBlog as initialState} from './initialState';

// - Actions
export const LATEST_BLOGS_FETCH = 'LATEST_BLOGS_FETCH'
export const LATEST_BLOGS_RECEIVE = 'LATEST_BLOGS_RECEIVE'
export const LATEST_BLOGS_FETCH_FAIL = 'LATEST_BLOGS_FETCH_FAIL'

export const fetchLatestBlogs = (limit, from=0) => {
  return {
    type: LATEST_BLOGS_FETCH,
    payload: {
      from: from,
      limit: limit
    }
  }
}

export const receiveLatestBlogs = (limit, from, blogItems) => {
  return {
    type: LATEST_BLOGS_RECEIVE,
    payload: {
      from: from,
      limit: limit,
      blogItems: blogItems
    }
  }
}

export const fetchLatestBlogsFailed = (limit, from, error) => {
  return {
    type: LATEST_BLOGS_FETCH_FAIL,
    payload: {
      from: from,
      limit: limit,
      errorMessage: error.message
    },
    error: true
  }
}

// - Async Actions
function shouldFetchLatestBlogs(globalState, limit, from) {
  const {latestBlog} = globalState

  if (latestBlog.isFetching) {
    return false
  }
  return true
}

export const fetchLatestBlogsIfNeed = (limit, from) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchLatestBlogs(getState(), limit, from)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchLatestBlogs(limit, from))

    // start call api-client
    return ApiClient.getJson('/blogs', {
      from: from,
      limit: limit
    })

    // dispatch data received blog items
    .then(json=> {
      return dispatch(receiveLatestBlogs(limit, from, json.blogItems))
    })

    // dispatch fetch failed blog items
    .catch(error => {
      dispatch(fetchLatestBlogsFailed(limit, from, error))
    })
  }
}

// - State

// - Reducers
const latestBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case LATEST_BLOGS_FETCH:
    return  Object.assign({}, state, {
        isFetching: true
      })
    case LATEST_BLOGS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      blogItems: action.payload.blogItems
    })
    case LATEST_BLOGS_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state

  }
}

export default latestBlogReducer;
