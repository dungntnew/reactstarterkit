// middleware/api.js
import fetch from 'isomorphic-fetch'
import queryString from 'query-string'

import _ from 'lodash'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

const BASE_URL = 'http://52.37.92.74/v1/'
//const BASE_URL = 'http://localhost:3000/api/'
const MAX_ITEM_PER_PAGE = 25

const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		return response.json().then(data => {
			if (data && data.errors) {
				throw new Error(data.errors.full_messages.join(','));
			}
			else {
				throw new Error(data);
			}
		});
	}
}

const authHeaders = () => {
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  const token = localStorage.getItem('access-token');
  
  return {
    client,
    uid,
    'access-token': token
  }
}

function callApi(endpoint, schema, params, httpOptions = {}, formatter) {

	let config = {}

	const {authenticated, method, query, pagging} = params

	// build HTTP Headers options
	let headers = {
		'Content-Type': 'application/json'
	}

	// apply token if authentication is required API
	if (authenticated) {
		headers = Object.assign({}, headers, authHeaders())
	}

	// build query params
	let queryParams = {}
	if (pagging) {
		const {offset, limit} = pagging
		queryParams = Object.assign({}, queryParams, {
			offset: 0,
			limit: limit || MAX_ITEM_PER_PAGE
		})
	}

	// apply query param to request
	// if request method is GET, add query param to query url
	// else add query param as request body
	const requestMethod = method || 'GET'
	let fetchOptions = Object.assign({}, { 'headers': headers }, httpOptions);


	if (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'DELETE') {
		fetchOptions = Object.assign({}, fetchOptions, {
			method: requestMethod,
			body: JSON.stringify(query)
		})
		console.log("fetchOptions: ", fetchOptions);
	}
	else if (requestMethod === 'GET') {
		fetchOptions = Object.assign({}, fetchOptions, {
			method: 'GET',
		})
		if (query) {
			queryParams = Object.assign({}, queryParams, query)
		}
	}


	const stringified = queryString.stringify(queryParams)
	const API_CALL_URL = `${BASE_URL}${endpoint}?${stringified}`
	console.log(method, ' API_CALL_URL', API_CALL_URL)
	console.log('CALL_API_OPTIONS', fetchOptions);

	return fetch(API_CALL_URL, fetchOptions)
		.then(checkStatus)
		.then((response) => response.json())
		.then(json => {
			console.log('**REST JSON**: ', json)
            if (formatter) {
				json = formatter(json)
				console.log('**FORMATED JSON**: ', json)
			}
			if (_.has(json, 'results')) {
				json = camelizeKeys(json.results)
			}
			else {
				json = camelizeKeys(json)
			}
			const rest = Object.assign({}, normalize(json, schema), {})
			console.log('** NORMALIZED JSON**: ', rest);
			return rest
		})
		.catch(err => {
			console.log(err)
			return Promise.reject(err)
		})
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  
	const callAPI = action[CALL_API]

	// So the middleware doesn't get applied to every single action
	if (typeof callAPI === 'undefined') {
		return next(action)
	}

	let { endpoint, types, schema, params, formatter} = callAPI

	// Verify input params
	if (typeof endpoint === 'function') {
		endpoint = endpoint(store.getState())
	}

	if (typeof endpoint !== 'string') {
		throw new Error('Specify a string endpoint URL.')
	}
	if (!schema) {
		throw new Error('Specify one of the exported Schemas.')
	}
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.')
	}
	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.')
	}

	// Passing the authenticated boolean back in our data
	// will let us distinguish between normal and secret resource
	const actionWith = data => {
		const finalAction = Object.assign({}, action, data)
		delete finalAction[CALL_API]
		return finalAction
	}

	const [requestType, successType, failureType] = types
	next(actionWith({ type: requestType, params: params }))

	return callApi(endpoint, schema, params, {}, formatter).then(
		response => next(actionWith({
			payload: response,
			params: params,
			type: successType
		})),
		error => next(actionWith({
			type: failureType,
			error: error.message || 'Something bad happened'
		}))
	)
}
