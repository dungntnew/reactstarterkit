import _ from 'lodash';

export const ERROR_CLEAR = 'ERROR_CLEAR'

// clear all error relatived to resource
export const clearErrors = () => {
  return {
    type: ERROR_CLEAR
  }
}

export const errorReducer = (state=[], action)=> {
  if (_.endsWith(action.type, '_FAILURE')){
    return [...state, action.error]
  }
  else {
    switch(action.type) {
      case ERROR_CLEAR:
        return []
      default:
        return state
    }
  }
}

// - selectors 
export const getErrors = (globalState) => {
  const {resources} = globalState
  const {errors} = resources
  return errors
}