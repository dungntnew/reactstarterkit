import { dummyUser } from './dummy';

export const auth = (state = {authenticated: true, user: dummyUser}, action) => {
  return state;
}
