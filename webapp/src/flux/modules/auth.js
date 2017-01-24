import ApiClient from '../../helpers/client';

import { initAuth } from './initialState';


export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_RECEIVE = 'CHANGE_PASSWORD_RECEIVE'
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'

export const changePassword = (userId, currentPassword, newPassword) => {
	return {
		type: CHANGE_PASSWORD_REQUEST,
		payload: {
			userId: userId,
			currentPassword: currentPassword,
			newPassword: newPassword
		}
	}
}

export const changePassFinish = (userId, currentPassword, newPassword) => {
	return {
		type: CHANGE_PASSWORD_RECEIVE,
		payload: {
			userId: userId,
			currentPassword: currentPassword,
			newPassword: newPassword
		}
	}
}

export const changePassFailed = (userId, error) => {
	return {
		type: CHANGE_PASSWORD_RECEIVE,
		payload: {
			userId: userId,
			errorMessage: error.message
		},
		error: true
	}
}

export const updatePassword = (userId, currentPassword, newPassword) => {
	return (dispatch) => {
	}
}

export const LOGIN_WITH_EMAIL_PASSWORD = 'LOGIN_WITH_EMAIL_PASSWORD'
export const LOGIN_WITH_EMAIL_PASSWORD_RECEIVED = 'LOGIN_WITH_EMAIL_PASSWORD_RECEIVED'
export const LOGIN_WITH_EMAIL_PASSWORD_FAIL = 'LOGIN_WITH_EMAIL_PASSWORD_FAIL'

export const loginWithEmail = (email, password) => {
	return {
		type: LOGIN_WITH_EMAIL_PASSWORD,
		payload: {
			email: email,
			password: password
		}
	}
}

export const loginWithEmailSuccess = (email, password, data) => {
	return {
		type: LOGIN_WITH_EMAIL_PASSWORD_RECEIVED,
		payload: Object.assign({}, data, {
			email, password
		})
	}
}

export const loginWithEmailFailed = (email, password, error) => {
	return {
		type: LOGIN_WITH_EMAIL_PASSWORD_FAIL,
		payload: {
			email, password,
			errorMessage: error.message
		},
		error: true
	}
}

export const asyncAuthByEmailAndPassword = (email, password) => {
	return (dispatch, getState) => {
		dispatch(loginWithEmail(email, password))
		return ApiClient.postJson('/api/authWithEmail', {
			email, password
		})
		.then(json => {
			// TODO: fix!
			localStorage.token = json.data.token
			dispatch(loginWithEmailSuccess(email, password, json.data))
		})
		.catch(error => dispatch(loginWithEmailFailed(email, password, error)))
	}
}

export const SIGNOUT = 'SIGNOUT'
export const signOut = (email) => {
	return {
		type: SIGNOUT,
		payload: {
			email
		}
	}
}

export const asyncSignout = (email) => {
	return (dispatch, getState) => {
		delete localStorage.token
		dispatch(signOut(email))
	}
}

export const loggedIn = (globalState) => {
	return !!localStorage.token
}

const authReducer = (state = initAuth, action) => {
	switch(action.type){
		case SIGNOUT:
		return Object.assign({}, state, {
			authencating: false,
			authenticated: false,
			user: null,
			anonymous: false
		})
		case LOGIN_WITH_EMAIL_PASSWORD:
		return Object.assign({}, state, {
			authencating: true,
			authenticated: false,
			user: null,
			anonymous: false
		})
		case LOGIN_WITH_EMAIL_PASSWORD_RECEIVED:
		return Object.assign({}, state, {
			authencating: false,
			authenticated: true,
			user: action.payload,
			anonymous: false
		})
		case LOGIN_WITH_EMAIL_PASSWORD_FAIL:
		return Object.assign({}, state, {
			authencating: false,
			authenticated: false,
			user: null,
			anonymous: false,
			errorMessage: action.payload.errorMessage,
		})
		default:
		  return state;
	}
}

export default authReducer;
