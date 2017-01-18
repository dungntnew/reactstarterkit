import {JoinEventStep} from './constant'

export const initTopEvent = {
  latest: {isFetching: false, errorMessage: null, events: {}},
  trend: {isFetching: false, errorMessage: null, events: {}},
  special: {isFetching: false, errorMessage: null, events: {}}
}

export const initCreateEvent = {
  event: {}
}

export const initSelectedEvent = {isFetching:true, errorMessage: null, data:{}}

export const initCreatedEvent = {isFetching:false,
                                 errorMessage: null,
                                 events: {},
                                 total: 0,
                                 current: 0}

export const initLikedEvent = {isFetching:false,
                                 errorMessage: null,
                                 events: {},
                                 total: 0,
                                 current: 0}

export const initJoinedEvent = {isFetching:false,
                                 errorMessage: null,
                                 events: {},
                                 total: 0,
                                 current: 0}

export const initRelativedEvent = {isFetching:false,
                                 errorMessage: null,
                                 events: {},
                                 total: 0,
                                 current: 0}

export const initLatestBlog = {
  isFetching: true, errorMessage: null, data: {}
}

export const initSelectedBlog = {isFetching:true, errorMessage: null, data:{}}

export const initCredit = {
                           isFetching: false,
                           errorMessage: null,
                           credits: {},
                           saving: false,
                           saved: false,
                           newCredit: {
                             method: 'クレジットカード',
                             number: 'xxx',
                             securityCode: 'aa',
                             exprYear: 'dd',
                             exprMonth: 'dd'
                           }}


export const initJoinEvent = {
  step: JoinEventStep.BEGIN
}

export const initBankAccount = {isFetching: false,
                                errorMessage: null,
                                isSaving: false,
                                data: {}}


export const initContact = {errorMessage: null,
                           isSending: false,
                           data: {}}

export const initLatestNews = {
  isFetching: false,
  errorMessage: null,
  newsItems: {
    "news-1": {"title": "YT開発開始しました", "lastUpdate": "2016-10-25", "text": ""},
    "news-2": {"title": "YT開発開始しました", "lastUpdate": "2016-10-25", "text": ""},
    "news-3": {"title": "YT開発開始しました", "lastUpdate": "2016-10-25", "text": ""},
    "news-4": {"title": "YT開発開始しました", "lastUpdate": "2016-10-25", "text": ""},
    "news-5": {"title": "YT開発開始しました", "lastUpdate": "2016-10-25", "text": ""},
    "news-6": {"title": "YT開発開始しました", "lastUpdate": "2016-10-25", "text": ""},
  },
  total: 5,
  current: 1
}

export const guest = {
  avatarUrl: '/img/avatar.png',
  name: 'Guest',
  id: 'user-1',
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

 export const initGenres = [
  {
    id: '0',
    label: 'gener1',
  },
  {
    id: '1',
    label: 'gener2',
  },{
    id: '2',
    label: 'gener3',
  },{
    id: '3',
    label: 'gener4',
  },
  {
    id: '4',
    label: 'gener5',
  },
  {
    id: '5',
    label: 'gener6',
  }
];

export const initSupplements = [
  {
    id: '0',
    label: 'テーブル椅子',
  },
  {
    id: '1',
    label: '駐車場',
  },{
    id: '2',
    label: 'WiFi',
  },
  {
    id: '3',
    label: 'ロッカー',
  },
  {
    id: '4',
    label: 'バリアフリー',
  },
  {
    id: '5',
    label: 'ペット可',
  },
  {
    id: '6',
    label: '子連れ可',
  },
  {
    id: '7',
    label: '喫煙可',
  },
  {
    id: '8',
    label: '飲酒可',
  },
  {
    id: '9',
    label: 'トイレ',
  }
]

export const initDressCodes = [
  {
    id: '0',
    label: 'コード１',
  },
  {
    id: '1',
    label: 'コード２',
  }
]

export const initPlaceTypes = [
  {
    id: '0',
    label: 'イベントスペース',
  },
  {
    id: '1',
    label: '結婚式場',
  },
  {
    id: '2',
    label: 'オフィススペース',
  },
  {
    id: '3',
    label: 'カフェ',
  },
  {
    id: '4',
    label: 'ホール',
  },
  {
    id: '5',
    label: '会議室',
  },
  {
    id: '6',
    label: 'スタジオ',
  },
  {
    id: '7',
    label: 'レストラン',
  },
  {
    id: '8',
    label: 'バー',
  },
  {
    id: '9',
    label: 'スポーツ施設',
  },
  {
    id: '10',
    label: 'ホテル',
  },
  {
    id: '11',
    label: '住宅',
  },
  {
    id: '12',
    label: '倉庫',
  },
  {
    id: '13',
    label: 'ワイナリー・蔵'
  },
  {
    id: '14',
    label: 'ギャラリー'
  },
  {
    id: '15',
    label: '映画館'
  },
  {
    id: '16',
    label: 'その他'
  }
]

export const initPrefectures = [
  {
    id: '0',
    label: '東京都',
  },
  {
    id: '1',
    label: '神奈川県',
  }
]
