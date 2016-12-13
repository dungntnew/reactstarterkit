import fetch from 'isomorphic-fetch'

import { createAction,
         createActions,
         handleActions } from 'redux-actions';

// - Actions
export const addTodo = createAction('TODO_ADD')

export const requestTodos = createAction('TODOS_REQUEST',
                                         (query, limit) => ({query, limit}), (query, limit) => 'Query Meta' + limit)
export const receiveTodos = createAction('TODOS_RECEIVE',
(json) => ({
  items: json,
}), (json) => ({
  at: Date.now()
}))

export const requestTodosFailed = createAction('TODOS_FETCH_FAIL',
     (error, meta) => error, (error, meta) => meta)

export const fetchLatestTodos = (limit) => {
  return (dispatch, getState) => {

    // First dispatch: the app state to update before call API
    // should change to request todo BEGIN
    // instance update app state - show loading..
    dispatch(requestTodos({'latest': true}, limit))

    return fetch('/api/todos')
           .then(response => response.json())
           .then(json =>
             // we can dispatch many time
             {
               console.log("JSON: ", json)
               setTimeout(()=> {
                 return dispatch(receiveTodos(json))
               }, 3000)

             }
           )
           // handle error here
           .catch((error)=>{
             dispatch(requestTodosFailed(error, error))
           })

  }
}
function shouldFetchTodos(globalState) {
  if (globalState.todo.isFetching) {
    return false;
  }
  return true;
}

export const fetchLatestTodosIfNeed = (limit) => {
  return (dispatch, getState) => {
    // dispatch a thunk from thunk
    if (shouldFetchTodos(getState())) {
      return dispatch(fetchLatestTodos(limit))
    }
    else {
      return Promise.resolve()
    }
  }
}

// - State
const initialState = {isFetching: false, items:[], error: null}

// - Reducers
export default handleActions({

  TODO_ADD: (state, action) => (
    Object.assign({}, state, {
      items: [
        ...state.items,
        action.payload,
      ]
    })
  ),
  TODOS_REQUEST: (state, action) => (
    Object.assign({}, state, {
      isFetching: true
    })
  ),
  TODOS_RECEIVE: (state, action) => (
    Object.assign({}, state, {
      isFetching: false,
      items: [
        ...action.payload.items
      ]
    })
  ),
  TODOS_FETCH_FAIL: (state, action) => (
    Object.assign({}, state, {
      isFetching: false,
      error: 'There are somthing wrong: ' + action.error
    })
  )


  // Other reducers
  // ..
  //
}, initialState)

// - Selectors
export const getTodoState = (globalState) => globalState.todo
export const getTodos = (globalState) => globalState.todo.items
export const isFetching = (globalState) => globalState.todo.isFetching
