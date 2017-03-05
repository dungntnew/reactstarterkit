// middleware/api.js
import fetch from 'isomorphic-fetch'
import queryString from 'query-string'

import _ from 'lodash'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

//const BASE_URL = 'http://127.0.0.1:8000/events/api/'
const BASE_URL = 'http://localhost:3000/api/'
const MAX_ITEM_PER_PAGE = 25

const checkHeaders = (response) => {
	return response
}

const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		var error = new Error(response.statusText)
		error.response = response
		throw error
	}
}

const parseJSON = (response) => {
	const json = response.json()
	return json
}

function callApi(endpoint, schema, params, httpOptions = {}) {

	let token = localStorage.getItem('id_token') || null
	let config = {}

	const {authenticated, method, query, pagging} = params

	// build HTTP Headers options
	let headers = {
		'Content-Type': 'application/json'
	}

	// apply token if authentication is required API
	if (authenticated) {
		if (token) {
			headers = Object.assign({}, headers, {
				'Authorization': `Bearer ${token}`
			})
		}
		else {
			throw "No token saved!"
		}
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
	let fetchOptions = { 'headers': headers }


	if (requestMethod === 'POST') {
		fetchOptions = Object.assign({}, {
			method: 'POST',
			body: JSON.stringify(query)
		}, httpOptions)
		console.log("fetchOptions: ", fetchOptions);
	}
	else if (requestMethod === 'GET') {
		fetchOptions = Object.assign({}, {
			method: 'GET',
		}, httpOptions)
		if (query) {
			queryParams = Object.assign({}, queryParams, query)
		}
	}


	const stringified = queryString.stringify(queryParams)
	const API_CALL_URL = `${BASE_URL}${endpoint}?${stringified}`
	console.log('API_CALL_URL', API_CALL_URL)

	return fetch(API_CALL_URL, fetchOptions)
		.then(checkHeaders)
		.then(checkStatus)
		.then(parseJSON)
		.then(json => {
			console.log('**REST JSON**: ', json)

			if (_.has(json, 'results')) {
				json = camelizeKeys(json.results)
			}
			const rest = Object.assign({}, normalize(json, schema), {})
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

	let { endpoint, types, schema, params} = callAPI

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

	return callApi(endpoint, schema, params).then(
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
