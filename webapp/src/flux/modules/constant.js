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
