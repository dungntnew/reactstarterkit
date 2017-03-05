import fetch from 'isomorphic-fetch'
import queryString from 'query-string'

export const API_URL = 'http://localhost:3000/'

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

const saveHeaders = (response) => {
  const {headers} = response
  localStorage.setItem('client', headers.get("client"));
  localStorage.setItem('expiry', headers.get("expiry"));
  localStorage.setItem('token-type', headers.get("token-type"));
  localStorage.setItem('uid', headers.get("uid"));
  localStorage.setItem('access-token', headers.get("access-token"));
  localStorage.setItem('X-Request-Id', headers.get("X-Request-Id"));

  return response;
}

const parseJSON = (response) => {
  const json = response.json()
  return json
}

const createAuthHeader = () => {
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  const token = localStorage.getItem('access-token');
  
  return {
    client,
    uid,
    'access-token': token
  }
}

export const getJson = (endpoint, query, options = {}) => {
    const stringified = queryString.stringify(query)
    const api = `${API_URL}${endpoint}?${stringified}`
    const {authRequired} =  options
    const authHeaders = authRequired ? createAuthHeader(): {}

    const fetchOptions = Object.assign({}, {
      method: 'GET',
      headers: Object.assign({}, authHeaders, {
        'Content-Type': 'application/json'
      })
    }, options)

    //console.log(api, fetchOptions)

    return fetch(api, fetchOptions)
             .then(checkHeaders)
             .then(checkStatus)
             .then(parseJSON)
}

export const doAuth = (endpoint, params, options = {}) => {
    const stringified = JSON.stringify(params)
    const api = `${API_URL}${endpoint}`
    console.log('POST: ', api)
    console.log('POST PARAMS: ', stringified)
    
    const fetchOptions = Object.assign({}, {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json'
      },
      body: stringified
    }, options)

    //console.log(api, fetchOptions)

    return fetch(api, fetchOptions)
             .then(checkHeaders)
             .then(checkStatus)
             .then(saveHeaders)
             .then(parseJSON)
}

export const postJson = (endpoint, params, options = {}) => {
    const stringified = JSON.stringify(params)
    const api = `${API_URL}${endpoint}`
    const {authRequired} =  options
    const authHeaders = authRequired ? createAuthHeader(): {}

    console.log('POST: ', api)
    console.log('POST PARAMS: ', stringified)
    
    const fetchOptions = Object.assign({}, {
      method: 'POST',
      headers: Object.assign({}, authHeaders, {
        'Content-Type': 'application/json'
      }),
      body: stringified
    }, options)

    //console.log(api, fetchOptions)

    return fetch(api, fetchOptions)
             .then(checkHeaders)
             .then(checkStatus)
             .then(parseJSON)
}

const ApiClient = {
  doAuth,
  getJson,
  postJson,
}

export default ApiClient
