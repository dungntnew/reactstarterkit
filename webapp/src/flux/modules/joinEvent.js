//import ApiClient from '../../helpers/client';


import {initJoinEvent as initialState} from './initialState';
import {JoinEventStep} from './constant';

export const JOIN_EVENT_CHANGE_STEP = 'JOIN_EVENT_CHANGE_STEP'

export const changeJoinStep = (step) => {
  return {
    type: JOIN_EVENT_CHANGE_STEP,
    payload: {
      step
    }
  }
}

export const JOIN_EVENT_PAYMENT_BEGIN = 'PAYMENT_BEGIN'
export const JOIN_EVENT_PAYMENT_RECEIVE = 'JOIN_EVENT_PAYMENT_RECEIVE'
export const JOIN_EVENT_PAYMENT_FAIL = 'JOIN_EVENT_PAYMENT_FAIL'

export const payment = (eventId, userId, credit) => {
    return {
      type: JOIN_EVENT_PAYMENT_BEGIN,
      payload: {}
    }
}

export const payment_receive = (eventId, userId, credit) => {
    return {
      type: JOIN_EVENT_PAYMENT_RECEIVE,
      payload: {}
    }
}

export const payment_failed = (eventId, userId, credit, error) => {
    return {
      type: JOIN_EVENT_PAYMENT_FAIL,
      payload: {}
    }
}

export const execPayment = (eventId, userId, credit, next) => {
  return (getState, dispatch) => {
    dispatch(payment(userId, eventId, credit))
    dispatch(payment_receive(userId, eventId, credit))
  }
}

const joinEventReducer = (state = initialState, action) => {
  console.log("CATCH ACTION: ", action)
  switch (action.type) {
    case JOIN_EVENT_CHANGE_STEP:
      return Object.assign({}, state, {
        step: action.payload.step
      })
    case JOIN_EVENT_PAYMENT_RECEIVE:
      return Object.assign({}, state, {
        step: JoinEventStep.DONE,
      })
    // TODO fix me!
    case JOIN_EVENT_PAYMENT_FAIL:
      return Object.assign({}, state, {
        step: JoinEventStep.DONE,
      })
    default:
    return state

  }
}

export default joinEventReducer
