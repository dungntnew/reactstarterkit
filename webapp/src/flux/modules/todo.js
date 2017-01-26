// TODO write generic resource reducers

// The middleware to call the API for quotes
import { CALL_API } from '../middleware/api'
import Schemas from '../schemas'

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'

// Uses the API middlware to get a quote
export const fetchQuote = () => {
  return {
    [CALL_API]: {
      endpoint: 'categories',
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE],
      schema: Schemas.CATEGORY_ARRAY,
      params: {
        method: 'GET',
        authenticated: false,
        pagging: {
          offset: 50,
          limit: 20
        },
        query: {
          keyword: 'takazaki',
        }
      }
    }
  }
}

// Same API middlware is used to get a
// secret quote, but we set authenticated
// to true so that the auth header is sent
export const fetchSecretQuote = () => {
  return {
    [CALL_API]: {
      endpoint: 'protected/random-quote',
      authenticated: true,
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}

// The quotes reducer
function quotes(state = {
    isFetching: false,
    quote: '',
    authenticated: false
  }, action) {
  switch (action.type) {
    case QUOTE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case QUOTE_SUCCESS:
      console.log('response: ', action)
      return Object.assign({}, state, {
        isFetching: false,
        quote: action.response,
        authenticated: action.authenticated || false
      })
    case QUOTE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
    }
}

export default quotes;
