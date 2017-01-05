import { initDressCodes } from './initialState';

const dressCodeReducer = (state = {items: initDressCodes, fetching: false}, action) => {
  return state;
}

export default dressCodeReducer;
