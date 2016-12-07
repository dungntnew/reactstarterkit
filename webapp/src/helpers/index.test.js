import {
  strToInt,
  normalizeArrayParam,
  normalizeSearchParams,
  displayDate,
  displayDatePair,
  paramsToQueryObject,
} from './index'

import moment from 'moment'

test('strToInt', () => {
  expect(strToInt('1')).toBe(1)
})
test('normalizeArrayParam with str', () => {
  expect(normalizeArrayParam('1')).toBe('1')
})
test('normalizeArrayParam with int', () => {
  expect(normalizeArrayParam(1)).toBe('1')
})
test('normalizeArrayParam with empty', () => {
  expect(normalizeArrayParam('')).toBe('')
})
test('normalizeArrayParam with null', () => {
  expect(normalizeArrayParam(null)).toBe('')
})
test('normalizeArrayParam with array', () => {
  expect(normalizeArrayParam([1, 2])).toBe('1,2')
})
test('normalizeArrayParam with array str', () => {
  expect(normalizeArrayParam(['1', '2'])).toBe('1,2')
})
test('normalizeArrayParam with  str', () => {
  expect(normalizeArrayParam(['1,2'])).toBe('1,2')
})

test('normialize search params empty', ()=> {
  const query = {}
  const ok = {
    startDate: '',
    endDate: '',
    keyword: '',
    target: '',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('normialize search params with startDate good', ()=> {
  const query = {
    startDate: '20161201'
  }
  const ok = {
    startDate: moment('20161201'),
    endDate: '',
    keyword: '',
    target: '',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('normialize search params with startDate not good', ()=> {
  const query = {
    startDate: null
  }
  const ok = {
    startDate: '',
    endDate: '',
    keyword: '',
    target: '',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('normialize search params with keyword not good', ()=> {
  const query = {
    keyword: null
  }
  const ok = {
    startDate: '',
    endDate: '',
    keyword: '',
    target: '',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('normialize search params with keyword not good', ()=> {
  const query = {
    keyword: 111
  }
  const ok = {
    startDate: '',
    endDate: '',
    keyword: '111',
    target: '',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('normialize search params with target str', ()=> {
  const query = {
    target: '1221'
  }
  const ok = {
    startDate: '',
    endDate: '',
    keyword: '',
    target: '1221',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('normialize search params with target arr', ()=> {
  const query = {
    target: [1,2]
  }
  const ok = {
    startDate: '',
    endDate: '',
    keyword: '',
    target: '1,2',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('normialize search params with target int', ()=> {
  const query = {
    target: 2
  }
  const ok = {
    startDate: '',
    endDate: '',
    keyword: '',
    target: '2',
  }

  const ret = normalizeSearchParams(query)
  expect(ret).toEqual(ok)
})

test('displayDate empty', ()=> {
  expect(displayDate('')).toBe('')
})
test('displayDate ok', ()=> {
  expect(displayDate(moment('20161224'))).toBe('20161224')
})
test('displayDate str', ()=> {
  expect(displayDate('20161224')).toBe('20161224')
})
test('displayDatePair', ()=> {
  expect(displayDatePair('20161224', '20161225', '~', '時間'))
        .toBe('20161224~20161225')
})
test('displayDatePair date', ()=> {
  expect(displayDatePair(moment('20161224'), '20161225', '~', '時間'))
        .toBe('20161224~20161225')
})
test('displayDatePair one right', ()=> {
  expect(displayDatePair('', '20161225', '~', '時間'))
        .toBe('~20161225')
})
test('displayDatePair one left', ()=> {
  expect(displayDatePair('20161224', '', '~', '時間'))
        .toBe('20161224~')
})
test('displayDatePair miss', ()=> {
  expect(displayDatePair('', '', '~', '時間'))
        .toBe('時間')
})
test('paramsToQueryObject', ()=> {
  expect(paramsToQueryObject({
    startDate: moment('20161224')
  }))
  .toEqual({
    startDate: '20161224',
    endDate: '',
    keyword: '',
    target: ''
  })
})
