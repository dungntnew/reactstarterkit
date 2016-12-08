import {
  initTargets,
} from './dummy';

export const target = (state = {items: initTargets, fetching: false}, action) => {
  return state;
}
