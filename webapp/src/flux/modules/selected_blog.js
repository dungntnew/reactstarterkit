import ApiClient from '../../helpers/client';


import {initSelectedBlog as initialState} from './initialState';

// - Actions
export const BLOG_ITEM_DETAIL_FETCH = 'BLOG_ITEM_DETAIL_FETCH'
export const BLOG_ITEM_DETAIL_RECEIVE = 'BLOG_ITEM_DETAIL_RECEIVE'
export const BLOG_ITEM_DETAIL_FETCH_FAIL = 'BLOG_ITEM_DETAIL_FETCH_FAIL'

export const fetchBlogDetail = (blogItemId) => {
  return {
    type: BLOG_ITEM_DETAIL_FETCH,
    payload: {
      blogItemId: blogItemId,
    }
  }
}

export const receiveBlogDetail = (blogItemId, data) => {
  return {
    type: BLOG_ITEM_DETAIL_RECEIVE,
    payload: {
      eventId: blogItemId,
      data: data
    }
  }
}

export const fetchBlogDetailFailed = (blogItemId, error) => {
  return {
    type: BLOG_ITEM_DETAIL_FETCH_FAIL,
    payload: {
      blogItemId: blogItemId,
      errorMessage: error.message
    },
    error: true
  }
}

// - Async Actions
function shouldFetchBlogDetail(globalState, blogItemId) {
  // always fetch new blog detail
  // no-cache
  return true
}

export const fetchBlogDetailIfNeed = (blogItemId) => {
  return (dispatch, getState) => {
    // cancel if fetching
    if (!shouldFetchBlogDetail(getState(), blogItemId)) {
      return Promise.resolve()
    }

    // dispatch start fetch
    dispatch(fetchBlogDetail(blogItemId))

    // start call api-client
    return ApiClient.getJson(`/blogdetails/${blogItemId}`)

    // dispatch data received blog
    .then(json=> {
      return dispatch(receiveBlogDetail(blogItemId, json))
    })

    // dispatch fetch failed blog
    .catch(error => {
      dispatch(fetchBlogDetailFailed(blogItemId, error))
    })
  }
}

// - Reducers

const selectedBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch actions
    case BLOG_ITEM_DETAIL_FETCH:
    return Object.assign({}, state, {
        isFetching: true
    })
    case BLOG_ITEM_DETAIL_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: '',
      data: action.payload.data
    })
    case BLOG_ITEM_DETAIL_FETCH_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      errorMessage: action.payload.errorMessage
    })
    default:
    return state
  }
}

export default selectedBlogReducer;
