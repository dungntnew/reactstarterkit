import fetch from 'isomorphic-fetch'
import queryString from 'query-string'

export const API_URL = 'http://localhost:3000/'
export const AUTH_API_URL = 'http://52.37.92.74/'

const checkHeaders = (response) => {
  return response
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return response.json().then(data => {
      throw new Error(data.errors.full_messages.join(','));
    });
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
  const api = `${AUTH_API_URL}${endpoint}?${stringified}`
  const {authRequired} = options
  const authHeaders = authRequired ? createAuthHeader() : {}

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
  const api = `${AUTH_API_URL}${endpoint}`
  console.log('POST: ', api)
  console.log('POST PARAMS: ', stringified)

  const fetchOptions = Object.assign({}, {
    method: 'POST',
    headers: {
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
  const api = `${AUTH_API_URL}${endpoint}`
  const {authRequired} = options
  const authHeaders = authRequired ? createAuthHeader() : {}

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


const VARITRANS_VTDIRECT_API = '/vtdirect/v2/tokens'
const VARITRANS_VTDIRECT_KEY = '283ed8ec-b46d-4b50-b73e-0b3c89bf94ca'

export const getCreditToken = (query) => {
  
  const queryData = Object.assign({}, query, {
    client_key: VARITRANS_VTDIRECT_KEY,
  })
  const stringified = queryString.stringify(queryData)
  const url = `${VARITRANS_VTDIRECT_API}?${stringified}`

  return fetch(url, {
        method: 'GET',
        headers: {
          'mode': 'no-cors',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then((response) => {
        return response.json();
      });
}


const ApiClient = {
  doAuth,
  getJson,
  postJson,
  getCreditToken,
}

export default ApiClient
