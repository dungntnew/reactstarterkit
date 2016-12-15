import { initGenres } from './initialState';

const genreReducer = (state = {items: initGenres, fetching: false}, action) => {
  return state;
}

export default genreReducer;
