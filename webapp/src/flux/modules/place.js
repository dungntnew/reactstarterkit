import { initPrefectures } from './initialState';

const placeReducer = (state = {prefectures: initPrefectures, fetching: false}, action) => {
  return state;
}

export default placeReducer;
