export const initTopEvent = {
  latest: {isFetching: false, errorMessage: null, events: {}},
  trend: {isFetching: false, errorMessage: null, events: {}},
  special: {isFetching: false, errorMessage: null, events: {}}
}

export const initCreateEvent = {
  event: {}
}

export const guest = {
  avatarUrl: '/img/avatar.png',
  name: 'Guest',
  id: '1',
  url: '/user/gust',
  anonymous: true,
}

export const initAuth = {
  authenticated: true,
  user: guest,
  anonymous: true
}

export const initTargets = [
 {
   id: '0',
   label: 'niku',
 },
 {
   id: '1',
   label: 'sashimi',
 },{
   id: '2',
   label: 'obento',
 },{
   id: '3',
   label: 'chahan',
 },
 {
   id: '4',
   label: 'onigiri',
 },
 {
   id: '5',
   label: 'osushi',
 },
 {
   id: '6',
   label: 'norikoshi soba',
 },
 {
   id: '7',
   label: 'osake',
 },
 {
   id: '8',
   label: 'nomi hodai',
 },
 {
   id: '9',
   label: 'kekkon shiki',
 },
 {
   id: '10',
   label: 'example1',
 },
 {
   id: '11',
   label: 'example2',
 },
 {
   id: '12',
   label: 'example3',
 }];
