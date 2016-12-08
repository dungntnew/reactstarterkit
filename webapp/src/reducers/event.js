import {
  initTrendEvents,
  initSpecialEvents,
  initLatestEvents
} from './dummy';

export const topTrendEvent = (state = {items: initTrendEvents, fetching: false}, action) => {
  return state;
}

export const topSpecialEvent = (state = {items: initSpecialEvents, fetching: false}, action) => {
  return state;
}

export const topLatestEvent = (state = {items: initLatestEvents, fetching: false}, action) => {
  return state;
}
