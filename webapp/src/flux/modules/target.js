import { initTargets } from './initialState';

const targetReducer = (state = {items: initTargets, fetching: false}, action) => {
  return state;
}

export default targetReducer;
