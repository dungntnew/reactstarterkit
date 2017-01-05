import _ from 'lodash'
import moment from 'moment';

const INPUT_DATE_FMT = 'YYYYMMDD'
const DISPLAY_DATE_FMT = 'LL'

const INPUT_DATETIME_FMT = 'YYYYMMDD hh:mm:ss'
const DISPLAY_DATETIME_FMT = 'LL'

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

module.exports = {
  formatDate,
  formatDateTime,
  formatDateAndTimeStr,
}
