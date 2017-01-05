
import _ from 'lodash'
import moment from 'moment';

const INPUT_DATE_FMT = 'YYYYMMDD'
const DISPLAY_DATE_FMT = 'LL'

const INPUT_DATETIME_FMT = 'YYYYMMDD hh:mm:ss'
const DISPLAY_DATETIME_FMT = 'LL'

function formatPrice(price) {
  if (_.isNull(price)) {
    return '-円'
  }

  if (price === '0' || price === 0) {
    return '0円'
  }

  const str = `${price}`
  const tmp = str.split('')
  const length = tmp.length
  return _.map(tmp, (k, i) => {
    const ri = length - i
    if (i > 0 && (ri) % 3 === 0) {
      return ',' + k
    }
    return k
  }).join('') + '円'
}

function formatDate(date) {
  if (_.isNull(date)) {
    return '-'
  }

  if (date instanceof moment) {
    return date.locale('ja').format(DISPLAY_DATE_FMT)
  }

  if (_.isString(date)) {
    return moment(date, INPUT_DATE_FMT).locale('ja').format(DISPLAY_DATE_FMT)
  }
  return `${date}`
}

function formatDateTime(datetime) {
  if (_.isNull(datetime)) {
    return '-'
  }

  if (datetime instanceof moment) {
    return datetime.locale('ja').format(DISPLAY_DATETIME_FMT)
  }

  if (_.isString(datetime)) {
    return moment(datetime, INPUT_DATETIME_FMT).locale('ja').format(DISPLAY_DATETIME_FMT)
  }
  return `${datetime}`
}

function formatDateAndTimeStr(dateStr, timeStr) {
    const datetime = dateStr + ' ' + timeStr
    return formatDateTime(datetime)
}

function formatAddress({zipCode, address1, address2, address3}) {
  if (zipCode) {
    return `〒${zipCode} ${address1}${address2}${address3}`
  }
  else {
    return `${address1}${address2}${address3}`
  }
}

function addressToGoogleMapsLink(data) {
  const googleMapsBaseUri = 'http://maps.google.com/maps?q='
  const formatedAddress = formatAddress(data)
  const params = encodeURIComponent(formatedAddress)
  return `${googleMapsBaseUri}${params}`
}

function googleMapIFrameLink(data) {
  const googleMapsBaseUri = 'https://www.google.com/maps/embed/v1/place'
  const key = "AIzaSyCq2Z8HcwK5XZrPNDWAv--5KXrOpodz-UU"
  const formatedAddress = formatAddress(data)
  const params = encodeURIComponent(formatedAddress)
  return `${googleMapsBaseUri}?q=${params}&key=${key}`
}

function formatListValues(values) {
  if (_.isNull(values)) {
    return '-'
  }

  return values.join(', ')
}

function formatKeyValuePairData(data) {
  const {target, targetName} = data
  const {genre, genreName} = data
  const {memberCount, joinerLimit} = data
  const {tags} = data

  const {registrationDateStart,
         registrationDateEnd} = data
  const {openDate, closeDate} = data
  const {price} = data
  const {dressCode} = data
  const {placeType} = data
  const {supplements} = data
  const {instarHashTag} = data


  const rowsData = [{
    key: '目的',
    value: targetName
  },
  {
    key: 'ジェンル',
    value: genreName
  },
  {
    key: 'タグ',
    value: formatListValues(tags)
  },
  {
    key: '申し込み期間',
    value: formatDateAndTimeStr(registrationDateStart)
           + '~' +
           formatDateAndTimeStr(registrationDateEnd)
  },{
    key: '開始',
    value: formatDateAndTimeStr(openDate)
           + '~' +
           formatDateAndTimeStr(closeDate)
  },
  {
    key: '金額',
    value: formatPrice(price)
  },
  {
    key: '参加人数',
    value: memberCount + ' / ' + joinerLimit
  },
  {
    key: 'ドレスコード',
    value: dressCode
  },
  {
    key: '会場の種類',
    value: placeType
  },
  {
    key: '補足',
    value: formatListValues(supplements)
  },
  {
    key: 'インスタグラ',
    value: instarHashTag
  }
  ]
  return rowsData
}

module.exports = {
  formatPrice,
  formatDate,
  formatDateTime,
  formatDateAndTimeStr,
  formatAddress,
  addressToGoogleMapsLink,
  googleMapIFrameLink,
  formatKeyValuePairData,
}
