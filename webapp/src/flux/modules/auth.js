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

const authReducer = (state = initAuth, action) => {
  return state;
}


export default authReducer;
