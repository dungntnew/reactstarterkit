import _ from 'lodash';
import moment from 'moment'

function strToDate(str) {
  return moment(str)
}

function strToInt(str) {
  return parseInt(str)
}

/*
  input: query object
  output: param object with shape:
  {
     startDate
     endDate
     keyword
     target
  }
  if any key is incorrect, value should be Empty string
*/
const EMPTY = ''
const DISPLAY_DATE_FMT = 'YYYYMMDD'

function normaizeDateParam(param) {
  if (!_.isString(param) || _.isEmpty(param)){
    return EMPTY
  } else {
    return strToDate(param)
  }
}

function normaizeKeyParam(param) {
  return _.toString(param)
}

function normalizeArrayParam(param) {
  if (_.isArray(param)) {
    return param.join(',')
  }
  return _.toString(param)
}

function normalizeSearchParams(query) {
  if (!query) return {}

  let {
    startDate,
    endDate,
    keyword,
    target
  } = query

  startDate = normaizeDateParam(startDate)
  endDate = normaizeDateParam(endDate)
  target = normaizeKeyParam(target)
  keyword = normalizeArrayParam(keyword)

  return {
    startDate,
    endDate,
    target,
    keyword
  }
}

/*
   input: moment date or date str or empty str
   output: str or empty
*/

function displayDate(date) {
    if (date instanceof moment) {
      return date.format(DISPLAY_DATE_FMT)
    }
    if (!_.isEmpty(date)) {
      const dt = moment(date)
      if (dt) {
        return dt.format(DISPLAY_DATE_FMT)
      }
      else {
        return EMPTY
      }
    }
    return EMPTY
}

function displayDatePair(date1, date2, sepText, emptyText) {
  const str1 = displayDate(date1)
  const str2 = displayDate(date2)
  if (_.isEmpty(str1) && _.isEmpty(str2)) {
    return emptyText
  }
  else {
    return `${str1}${sepText}${str2}`
  }
}

module.exports = {
  strToInt,
  normalizeArrayParam,
  normalizeSearchParams,
  displayDate,
  displayDatePair
}
