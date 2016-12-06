import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

const dummyUser = {
  avatarUrl: '/img/avatar.png',
  name: 'Nguyen Tri Dung',
  id: '1',
  url: '/user/dungntnew'
}

// that list should fetch from server
const initTargets = [{
  id: 0,
  label: 'niku',
},
{
  id: 1,
  label: 'sashimi',
},{
  id: 2,
  label: 'obento',
},{
  id: 3,
  label: 'chahan',
},
{
  id: 4,
  label: 'onigiri',
},
{
  id: 5,
  label: 'osushi',
}];


const auth = (state = {authenticated: true, user: dummyUser}, action) => {
  return state;
}

const target = (state = {items: initTargets, fetching: false}, action) => {
  return state;
}

const rootReducer = combineReducers({
  auth,
  target,
  routing
})

export default rootReducer
