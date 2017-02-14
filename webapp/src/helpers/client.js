import fetch from 'isomorphic-fetch'
import queryString from 'query-string'

export const API_URL = 'http://52.37.92.74/api'

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

export const getJson = (endpoint, query, options) => {
    const stringified = queryString.stringify(query)
    const api = `${API_URL}${endpoint}?${stringified}`

    const fetchOptions = Object.assign({}, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }, options)

    //console.log(api, fetchOptions)

    return fetch(api, fetchOptions)
             .then(checkHeaders)
             .then(checkStatus)
             .then(parseJSON)
}

export const postJson = (endpoint, params, options) => {
    const stringified = JSON.stringify(params)
    const api = `${API_URL}${endpoint}`

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
             .then(parseJSON)
}

const ApiClient = {
  getJson,
  postJson,
}

export default ApiClient
