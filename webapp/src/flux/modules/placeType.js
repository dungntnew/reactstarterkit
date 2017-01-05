import { initPlaceTypes } from './initialState';

const placeTypeReducer = (state = {items: initPlaceTypes, fetching: false}, action) => {
  return state;
}

export default placeTypeReducer;
