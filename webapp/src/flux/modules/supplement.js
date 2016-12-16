import { initSupplements } from './initialState';

const supplementReducer = (state = {items: initSupplements, fetching: false}, action) => {
  return state;
}

export default supplementReducer;
