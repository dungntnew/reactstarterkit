export const EventFilterTypes = {
  SPECIAL: 'special',
  LATEST: 'latest',
  TREND: 'trend'
}

export const JoinEventStep = {
  BEGIN: 'BEGIN',
  SELECT_PAYMENT: 'SELECT_PAYMENT',
  ADD_CREDIT: 'ADD_CREDIT',
  ADD_CREDIT_DONE: 'ADD_CREDIT_DONE',
  DONE: 'DONE'
}

export const EventStatus = {
  OPENING: 'OPENING',
  CLOSED: 'CLOSED',
  CLOSE_FAILED: 'CLOSE_FAILED',
  PROFIT_CONFIRMING: 'PROFIT_CONFIRMING',
  PROFIT_CONFIRMED: 'PROFIT_CONFIRMED',
  PROFIT_CONFIRM_FAILED: 'PROFIT_CONFIRM_FAILED',
  CANCELLED: 'CANCELLED'
}

export const contactCategories = [{
  id: 'cat-1',
  label: 'カテゴリー1'
},
{
  id: 'cat-2',
  label: 'カテゴリー2'
},
{
  id: 'cat-3',
  label: 'カテゴリー3'
}
]

export const bankList = [{
  id: '0005',
  label: '三菱東京UFJ銀行'
},
{
  id: '0009',
  label: '三井住友銀行'
},
{
  id: '0010',
  label: 'りそな銀行'
},
{
  id: '0017',
  label: '埼玉りそな銀行'
},
{
  id: '0000',
  label: '日本銀行'
},
]

export const bankAccountTypes = [{
  id: '01',
  label: '普通'
},
{
  id: '02',
  label: '当座'
},
{
  id: '03',
  label: '貯蓄'
},
{
  id: '04',
  label: '別段'
}]


export const InvoiceStatus = {
  PROCESSING: 'PROCESSING',
  SENT: 'SENT',
  ERROR: 'ERROR'
}

export const EVENT_LIST_TITLES = {
  created: '作ったテーブル',
  joined: '参加したテーブル',
  liked: '気に入ったテーブル'
}

export const EVENT_STATUS_TITLES = {
  all: 'すべて',
  opening: '公開中',
  stopped: '停止中'
}

export const CONTEXT_MENU_ITEMS = {
  mobile: [
    {
      authRequired: true,
      title: 'テーブル管理',
      childs: [{
        title: '登録したテーブル',
        to: '/mypage/events/created/all'
      },
      {
        title: 'お気に入りテーブル',
        to: '/mypage/events/liked/all'
      },
      {
        title: '参加テーブル',
        to: '/mypage/events/joined/all'
      }
      ]
    },
    {
      authRequired: true,
      title: '売上・振込',
      childs: [{
        title: '売上の記録',
        to: '/mypage/invoice/create'
      },
      {
        title: '支払いの記録',
        to: '/mypage/invoice/list'
      },
      {
        title: '振込み履歴',
        to: '/mypage/invoice/all'
      },
      ]
    },
    {
      authRequired: true,
      title: '通知・ニュース',
      childs: [{
        title: 'ニュース一覧',
        to: '/mypage/news/list'
      },
      ]
    },
    {
      authRequired: true,
      title: 'アカウント設定',
      childs: [{
        title: 'パスワード変更',
        to: '/change-password'
      },
      {
        title: 'クレジットカード変更',
        to: '/mypage/credit-setting'
      },
       {
        title: 'お振込先銀行口座変更',
        to: '/mypage/bank-account-setting'
      },
      {
        title: 'ログアウト',
        to: '/logout'
      },
      ]
    },
    {
      title: 'その他',
      childs: [{
        title: 'YourTableについて',
        to: '/about'
      },{
        title: 'ヘールプ/FQA',
        to: '/fqa'
      },
      {
        title: 'お問い合わせ',
        to: '/contact'
      },
      {
        title: 'パスワード忘れ',
        to: '/forgot-password'
      }
      ]
    }
  ],
  pc: [
    {
      title: 'PC　メニュー 1',
      childs: [{
        title: 'Link A',
        to: '/a'
      },
      {
        title: 'Link B',
        to: '/b'
      }]
    },
    {
      title: 'PC　メニュー ２',
      childs: [{
        title: 'Link A',
        to: '/a'
      },
      {
        title: 'Link B',
        to: '/b'
      },
      {
        title: 'Link C',
        to: '/b'
      },
      ]
    },
    {
      authRequired: true,
      title: '秘密な設定3',
      childs: [{
        title: 'Link A',
        to: '/a'
      },
      {
        title: 'Link B',
        to: '/b'
      }]
    }
  ]
}
