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
export const LOGIN_WITH_EMAIL_PASSWORD_FAILURE = 'LOGIN_WITH_EMAIL_PASSWORD_FAILURE'

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
		type: LOGIN_WITH_EMAIL_PASSWORD_FAILURE,
		payload: {
			email, password,
			error: error.message,
			errorMessage: error.message
		},
		error: true
	}
}

const mapAuthData = (json) => {
	const {user} = json
	const {user_profile} = user
	return {
		name: user_profile.display_name || user.email,
		id: user.id.toString(),
		uid: user.uid,
		email: user.email,
		accountBlance: user_profile.account_blance,
		createdEventCount: user_profile.created_events_count,
		rating: user_profile.rating,
		avatarUrl: user_profile.avatar_url || '/img/avatar.png',
		url: `/members/${user.id}`,
		anonymous: false,
	}
}

export const asyncAuthByEmailAndPassword = (email, password) => {
	return (dispatch, getState) => {
		dispatch(loginWithEmail(email, password))
		return ApiClient.doAuth('/v1/auth/sign_in', {
			email, password
		})
		.then(json => {
			const signedUser = mapAuthData(json);
			localStorage.setItem('signedUser', JSON.stringify(signedUser));
			dispatch(loginWithEmailSuccess(email, password, signedUser))
		})
		.catch(error => dispatch(loginWithEmailFailed(email, password, error)))
	}
}

export const REGISTER_WITH_EMAIL_PASSWORD = 'REGISTER_WITH_EMAIL_PASSWORD'
export const REGISTER_WITH_EMAIL_PASSWORD_RECEIVED = 'REGISTER_WITH_EMAIL_PASSWORD_RECEIVED'
export const REGISTER_WITH_EMAIL_PASSWORD_FAILURE = 'REGISTER_WITH_EMAIL_PASSWORD_FAILURE'

export const registerWithEmail = (data) => {
	return {
		type: REGISTER_WITH_EMAIL_PASSWORD,
		payload: data
	}
}

export const registerWithEmailSuccess = (data) => {
	return {
		type: REGISTER_WITH_EMAIL_PASSWORD_RECEIVED,
		payload: data
	}
}

export const registerWithEmailFailed = (error) => {
	return {
		type: REGISTER_WITH_EMAIL_PASSWORD_FAILURE,
		payload: {
			error: error,
			errorMessage: error.message,
		},
		error: true
	}
}

export const syncRegisterByEmailAndPassword = (data) => {
	return (dispatch, getState) => {
		dispatch(registerWithEmail(data))
		return ApiClient.postJson('/v1/auth/', data)
		.then((json) => {
			// TODO: !
			dispatch(registerWithEmailSuccess(json.data))
		})
		.catch(error => dispatch(registerWithEmailFailed(error)))
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
		case LOGIN_WITH_EMAIL_PASSWORD_FAILURE:
		return Object.assign({}, state, {
			authencating: false,
			authenticated: false,
			user: null,
			anonymous: false,
			errorMessage: action.payload.errorMessage,
		})
		case REGISTER_WITH_EMAIL_PASSWORD:
		return Object.assign({}, state, {
			registering: true,
			registered: false,
			user: action.payload,
		})
		case REGISTER_WITH_EMAIL_PASSWORD_RECEIVED:
		return Object.assign({}, state, {
			registering: false,
			registered: true,
			user: action.payload,
		})
		case REGISTER_WITH_EMAIL_PASSWORD_FAILURE:
		return Object.assign({}, state, {
			registering: false,
			registered: false,
			errorMessage: action.payload.errorMessage,
		})
		default:
		  return state;
	}
}

export default authReducer;
