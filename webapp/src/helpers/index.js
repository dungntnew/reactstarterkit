import _ from 'lodash';
import moment from 'moment'

function strToDate(str) {
  return moment(str)
}

function strToInt(str) {
  return parseInt(str, 10)
}


const EMPTY = ''
const DISPLAY_DATE_FMT = 'YYYYMMDD'
const QUERYSTR_DATE_FMT = 'YYYYMMDD'

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

function dateToQueryStr(date) {
    if (date instanceof moment) {
      return date.format(QUERYSTR_DATE_FMT)
    }
    if (!_.isEmpty(date)) {
      const dt = moment(date)
      if (dt) {
        return dt.format(QUERYSTR_DATE_FMT)
      }
      else {
        return EMPTY
      }
    }
    return EMPTY
}

function paramsToQueryObject(params) {
  const {
    startDate,
    endDate,
    keyword,
    target
  } = params

  return {
    startDate: dateToQueryStr(startDate),
    endDate: dateToQueryStr(endDate),
    keyword: normaizeKeyParam(keyword),
    target: normaizeKeyParam(target),
  }
}

function commingSoon(args) {
  console.log("require implement!, ", args);
  alert('現在準備中。3月26日オープン！');
} 

module.exports = {
  strToInt,
  normalizeArrayParam,
  normalizeSearchParams,
  paramsToQueryObject,
  displayDate,
  displayDatePair,
  dateToQueryStr,
  commingSoon,
}
